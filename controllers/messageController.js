import models from "../models/index.js";
const { Message, User } = models;

export const getMessageById = async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await Message.findByPk(messageId, {
      include: {
        model: User,
        attributes: ["id", "username", "profile_picture"],
      },
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
