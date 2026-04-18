import { prisma } from "./prisma";
import type { Request, Response } from "express";
import { Params } from "../types";

export const createComment = async (req: Request<Params>, res: Response) => {
  try {
    const { postId, userId } = req.params;
    const { text } = req.body;
    if (!postId || !userId) {
      return res.status(400).json({ error: "Missing postId or userId" });
    }
    const comment = await prisma.cXComment.create({
      data: {
        postId,
        userId,
        text,
      },
    });
    return res.status(201).json({
      message: "Comment created",
      payload: comment,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const readPostComments = async (req: Request<Params>, res: Response) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.cXComment.findMany({
      where: { postId },
    });
    return res.status(200).json({
      message: "Comments Retrieved Successfully",
      payload: comments,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    await prisma.cXComment.delete({
      where: { id },
    });
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error: any) {
    console.log("Error", error);
  }
};
