import { Router } from "express";
import { createLike, unlikePost } from "../controllers/likes.ts";

export const likesRouter: Router = Router();

likesRouter.post("/createlike", createLike);
likesRouter.delete("/:id", unlikePost);
