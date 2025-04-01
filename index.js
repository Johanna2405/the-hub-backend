import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import { connectDB } from "./db/index.js";

//importing routes
import messageRoutes from "./routes/messageRoutes.js";
import listRoutes from "./routes/listRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.get("/api/", (req, res) => {
  res.send("API is running...");
});

//routes
app.use("/api/messages", messageRoutes);
app.use("/api/lists", listRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT} ->  http://localhost:${PORT}/`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
  });
};

startServer();
