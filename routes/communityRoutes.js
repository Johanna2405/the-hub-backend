import { Router } from "express";
import {
  getCommunities,
  createCommunity,
  updateCommunity,
  getMyCommunities,
  deleteCommunity,
  getCommunityById,
  joinCommunity,
} from "../controllers/communityController.js";

import auth from "../middleware/auth.js";
import { requireAdmin } from "../middleware/checkCommunityRole.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Communities
 *   description: Community management and membership
 */

/**
 * @swagger
 * /communities:
 *   get:
 *     summary: Get all communities
 *     tags: [Communities]
 *     responses:
 *       200:
 *         description: A list of communities
 *       500:
 *         description: Server error
 */
router.get("/", getCommunities);

/**
 * @swagger
 * /communities/my:
 *   get:
 *     summary: Get communities the user belongs to
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user’s communities
 *       401:
 *         description: Unauthorized
 */
router.get("/my", auth, getMyCommunities);

/**
 * @swagger
 * /communities:
 *   post:
 *     summary: Create a new community
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       201:
 *         description: Community created successfully
 *       400:
 *         description: Missing name
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", auth, createCommunity);

/**
 * @swagger
 * /communities/{id}/join:
 *   post:
 *     summary: Join an existing community
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Joined successfully
 *       400:
 *         description: Already a member
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/:id/join", auth, joinCommunity);

/**
 * @swagger
 * /communities/{id}:
 *   get:
 *     summary: Get a specific community by ID
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Community found
 *       404:
 *         description: Community not found
 *       500:
 *         description: Server error
 */
router.get("/:id", auth, getCommunityById);

/**
 * @swagger
 * /communities/{id}:
 *   put:
 *     summary: Update a community (admin only)
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *     responses:
 *       200:
 *         description: Community updated
 *       403:
 *         description: Admin rights required
 *       404:
 *         description: Community not found
 *       500:
 *         description: Server error
 */
router.put("/:id", auth, requireAdmin, updateCommunity);

/**
 * @swagger
 * /communities/{id}:
 *   delete:
 *     summary: Delete a community (admin only)
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Community deleted
 *       403:
 *         description: Admin rights required
 *       404:
 *         description: Community not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth, requireAdmin, deleteCommunity);

export default router;
