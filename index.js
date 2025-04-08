import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import { connectDB } from "./db/index.js";

//importing routes
import messageRoutes from "./routes/messageRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import eventAttendeeRoutes from "./routes/eventAttendeeRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import communityEventRoutes from "./routes/communityEventRoutes.js";
import communityEventAttendeeRoutes from "./routes/communityEventAttendeeRoutes.js";
import communityPostRoutes from "./routes/communityPostRoutes.js";
import communityListRoutes from "./routes/communityListRoutes.js";
import communityListItemRoutes from "./routes/communityListItemRoutes.js";
import communityMessageRoutes from "./routes/communityMessageRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.get("/api/", (req, res) => {
  res.send("API is running...");
});

//routes
app.use("/api/login", registerRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/eventattendees", eventAttendeeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/communities", communityRoutes);

// Community specific routes
app.use("/api/communities/:communityId/events", communityEventRoutes);
app.use(
  "/api/communities/:communityId/events/:eventId/attendees",
  communityEventAttendeeRoutes
);
app.use("/api/communities/:communityId/posts", communityPostRoutes);
app.use("/api/communities/:communityId/lists", communityListRoutes);
app.use(
  "/api/communities/:communityId/lists/:listId/items",
  communityListItemRoutes
);
app.use("/api/communities/:communityId/messages", communityMessageRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT} ->  http://localhost:${PORT}/`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
  });
};

startServer();
