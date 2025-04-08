import { sequelize } from "../db/index.js";
import models from "../models/index.js";
const { Message } = models;

export default function setupSocket(io) {
  const onlineUsers = {};

  io.on("connection", (socket) => {
    // console.log(`User connected: ${socket.id}`);

    socket.on("user_connected", (user) => {
      onlineUsers[user.id] = socket.id;
      console.log("Online users:", Object.keys(onlineUsers));

      io.emit("update_online_users", Object.keys(onlineUsers));
    });

    socket.on("send_message", async (data) => {
      const message = await Message.create({
        user_id: data.user_id,
        content: data.content,
      });

      const fullMessage = {
        ...message.dataValues,
        User: data.user,
      };

      io.emit("receive_message", fullMessage);
    });

    socket.on("user_typing", (data) => {
      socket.broadcast.emit("display_typing", {
        userId: data.user_id,
        username: data.username,
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      const disconnectedUserId = Object.keys(onlineUsers).find(
        (id) => onlineUsers[id] === socket.id
      );
      if (disconnectedUserId) {
        delete onlineUsers[disconnectedUserId];
      }

      io.emit("update_online_users", Object.keys(onlineUsers));
    });
  });
}
