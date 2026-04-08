import { Router } from "express";
import { readPostComments } from "../controllers/comment.ts";
import {
  createPost,
  readPosts,
  readPostById,
  readUserPosts,
  deletePost,
} from "../controllers/posts.ts";
import { readPostLikes } from "../controllers/likes.ts";
export const postsRouter: Router = Router();
postsRouter.post("/createposts", createPost);
postsRouter.get("/readposts", readPosts);
postsRouter.get("/:id", readPostById);
postsRouter.get("/userposts/:userId", readUserPosts);
postsRouter.delete("/:id", deletePost);
postsRouter.get("/:postId/comments", readPostComments);
postsRouter.get("/:postId/likes", readPostLikes);
