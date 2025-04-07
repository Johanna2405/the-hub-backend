import { Router } from "express";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/", auth, createComment); // POST /api/comments
router.get("/:postId", getCommentsByPost); // GET /api/comments/:postId
router.put("/:id", auth, updateComment); // Update
router.delete("/:id", auth, deleteComment); // Delete

export default router;
