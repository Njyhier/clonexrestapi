import { Router } from "express";
import { readPostComments } from "../controllers/comment";
import {
  createPost,
  readPosts,
  readPostById,
  readUserPosts,
  deletePost,
} from "../controllers/posts";
import { readPostLikes } from "../controllers/likes";
export const postsRouter: Router = Router();
postsRouter.post("/users/:userId/createposts", createPost);
postsRouter.get("/readposts", readPosts);
postsRouter.get("/:id", readPostById);
postsRouter.get("/userposts/:userId", readUserPosts);
postsRouter.delete("/:id", deletePost);
postsRouter.get("/:postId/comments", readPostComments);
postsRouter.get("/:postId/likes", readPostLikes);
