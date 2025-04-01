import express from "express";
import {
  getLists,
  getListById,
  createList,
  updateList,
} from "../controllers/listController.js";

const listRoutes = express.Router();

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Get all lists with user and list item data
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: A list of all lists including user and list items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 401
 *                   title:
 *                     type: string
 *                     example: "Groceries"
 *                   category:
 *                     type: string
 *                     example: "Shopping"
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   privacy:
 *                     type: string
 *                     example: "Private"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                   list_items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         list_id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Red Apples (2kg)"
 *                         is_completed:
 *                           type: boolean
 *                           example: false
 *       500:
 *         description: Failed to fetch lists
 */
listRoutes.get("/", getLists);
/**
 * @swagger
 * /lists/{id}:
 *   get:
 *     summary: Get a specific list by ID with its items
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the list to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single list with list items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 401
 *                 title:
 *                   type: string
 *                   example: "Groceries"
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 category:
 *                   type: string
 *                   example: "Shopping"
 *                 private:
 *                   type: string
 *                   example: "Private"
 *                 list_items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       list_id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Red Apples (2kg)"
 *                       is_completed:
 *                         type: boolean
 *                         example: false
 *       404:
 *         description: List not found
 *       500:
 *         description: Failed to fetch list
 */
listRoutes.get("/:id", getListById);
/**
 * @swagger
 * /lists:
 *   post:
 *     summary: Create a new list
 *     tags: [Lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - title
 *               - category
 *               - privacy
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Week Plan"
 *               category:
 *                 type: string
 *                 example: "To Do"
 *               privacy:
 *                 type: string
 *                 example: "Private"
 *     responses:
 *       201:
 *         description: List created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 403
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Week Plan"
 *                 category:
 *                   type: string
 *                   example: "To Do"
 *                 privacy:
 *                   type: string
 *                   example: "Private"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error creating list
 */
listRoutes.post("/", createList);
/**
 * @swagger
 * /lists/{id}:
 *   put:
 *     summary: Update an existing list (not part of MVP)
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the list to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Week Plan"
 *               category:
 *                 type: string
 *                 example: "To Do"
 *               privacy:
 *                 type: string
 *                 example: "Private"
 *     responses:
 *       200:
 *         description: List updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 403
 *                 title:
 *                   type: string
 *                   example: "Week Plan"
 *                 category:
 *                   type: string
 *                   example: "To Do"
 *                 privacy:
 *                   type: string
 *                   example: "Private"
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-27T10:40:00Z"
 *       400:
 *         description: No fields provided for update
 *       404:
 *         description: List not found
 *       500:
 *         description: Failed to update list
 */
listRoutes.put("/:id", updateList);

export default listRoutes;
