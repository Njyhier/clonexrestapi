import { Router } from "express";
import { createLike, unlikePost } from "../controllers/likes";

export const likesRouter: Router = Router();

likesRouter.post("/createlike/:postId/:userId", createLike);
likesRouter.delete("/:id", unlikePost);
