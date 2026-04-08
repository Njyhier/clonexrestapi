import { prisma } from "./prisma";
import type { Request, Response } from "express";

export const createFollow = async (req: Request, res: Response) => {
  try {
    const { followerId, followingId } = req.params;
    const follow = await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
    return res.status(201).json({
      message: "Following successful",
      payload: follow,
    });
  } catch (error: any) {
    console.log("Error", error);
  }
};

export const unfollow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.follow.delete({
      where: id,
    });
    return res.status(200).json({
      message: "Unfollow successful",
    });
  } catch (error: any) {
    console.log("Error", error);
  }
};

export const readFollowers = async (req: Request, res: Response) => {};

export const readFollowing = async (req: Request, res: Response) => {};
