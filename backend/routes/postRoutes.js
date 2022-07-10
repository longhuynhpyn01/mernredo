import express from "express";
import {
  getAllPosts,
  postCreatePost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", isAuth, getAllPosts);
router.post("/create-post", isAuth, postCreatePost);
router.put("/update-post/:postId", isAuth, updatePost);
router.delete("/delete-post/:postId", isAuth, deletePost);

export default router;
