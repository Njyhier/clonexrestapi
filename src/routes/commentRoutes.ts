import { Router } from "express";
import { createComment, deleteComment } from "../controllers/comment";

export const commentRoutes: Router = Router();
commentRoutes.post("/createcomment/:postId/:userId", createComment);
commentRoutes.delete("/:id", deleteComment);
