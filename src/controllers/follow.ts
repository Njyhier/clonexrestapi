import { Params } from "../types";
import type { Request, Response } from "express";

export const createFollow = async (req: Request<Params>, res: Response) => {
  //   try {
  //     const { followerId, followingId } = req.params;
  //     if (!followerId || !followingId) {
  //       return res.status(400).json({ error: "Invalid input" });
  //     }
  //     const follow = await prisma.cXFollow.create({
  //       data: {
  //         followerId,
  //         followingId,
  //       },
  //     });
  //     return res.status(201).json({
  //       message: "Following successful",
  //       payload: follow,
  //     });
  //   } catch (error: any) {
  //     console.log("Error", error);
  //   }
};

export const unfollow = async (req: Request, res: Response) => {
  //   try {
  //     const { id } = req.params;
  //     if (!id || Array.isArray(id)) {
  //       return res.status(400).json({ error: "Invalid id" });
  //     }
  //     await prisma.cXFollow.delete({
  //       where: id,
  //     });
  //     return res.status(200).json({
  //       message: "Unfollow successful",
  //     });
  //   } catch (error: any) {
  //     console.log("Error", error);
  //   }
};

export const readFollowers = async (req: Request, res: Response) => {};

export const readFollowing = async (req: Request, res: Response) => {};
