import { prisma } from "./prisma";
import type { Request, Response } from "express";
import { Params } from "../types";

export const createLike = async (req: Request<Params>, res: Response) => {
  try {
    const { postId, userId } = req.params;
    if (!userId || !postId) {
      return res.status(400).json({ message: "Missing post or user id" });
    }
    const like = await prisma.cXLike.create({
      data: {
        postId,
        userId,
      },
    });
    return res.status(201).json({
      message: "Like created successfuly",
      payload: like,
    });
  } catch (error: any) {
    console.log("Error", error);
  }
};

export const readPostLikes = async (req: Request<Params>, res: Response) => {
  try {
    const { postId } = req.params;
    const likes = await prisma.cXLike.findMany({
      where: { postId },
    });
    return res.status(200).json({
      message: "Likes retrieved",
      payload: likes,
    });
  } catch (error: any) {
    console.log("Error", error);
  }
};

export const unlikePost = async (req: Request<Params>, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.cXLike.delete({
      where: { id },
    });
    return res.status(200).json({
      message: "Like removed",
    });
  } catch (error: any) {
    console.log("Error", error);
  }
};
