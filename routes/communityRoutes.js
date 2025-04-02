import { Router } from "express";
import {
  getCommunities,
  createCommunity,
} from "../controllers/communityController.js";

const communityRoutes = Router();

/**
 * @swagger
 * /communities:
 *   get:
 *     summary: Get all communities
 *     tags: [Communities]
 *     responses:
 *       200:
 *         description: A list of communities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Tech Enthusiasts
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-03-15T12:00:00Z
 *       500:
 *         description: Server error
 */
communityRoutes.get("/communities", getCommunities);

/**
 * @swagger
 * /communities:
 *   post:
 *     summary: Create a new community
 *     tags: [Communities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Community
 *     responses:
 *       201:
 *         description: Community created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 name:
 *                   type: string
 *                   example: New Community
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-03-27T11:00:00Z
 *       400:
 *         description: Missing name field
 *       500:
 *         description: Server error
 */
communityRoutes.post("/", createCommunity);

export default communityRoutes;
