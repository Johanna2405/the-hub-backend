import { Router } from "express";
import { getMessageById } from "../controllers/messageController.js";
const messageRoutes = Router();

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Get a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the message to retrieve
 *     responses:
 *       200:
 *         description: The message data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 text:
 *                   type: string
 *                   example: "Hello world"
 *       404:
 *         description: Message not found
 */
messageRoutes.get("/messages/:id", getMessageById);

export default messageRoutes;
