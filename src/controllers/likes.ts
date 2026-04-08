import { error } from "node:console";
import { prisma } from "./prisma.ts";
import type { Request, Response } from "express";
import { Params } from "../types.ts";

export const createLike = async (req: Request, res: Response) => {
  try {
    const { postId, userId } = req.body;
    const like = await prisma.like.create({
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
    const likes = await prisma.like.findMany({
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
    await prisma.like.delete({
      where: { id },
    });
    return res.status(200).json({
      message: "Like removed",
    });
  } catch (error: any) {
    console.log("Error", error);
  }
};
