import { prisma } from "./prisma";
import type { Response, Request } from "express";
import { Params, Query } from "../types";

export async function createPost(
  req: Request<Params, {}, { caption: string; mediaUrl: string }, Query>,
  res: Response,
) {
  const { userId } = req.params;
  const { caption, mediaUrl = "" } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "Missing user id!" });
  }

  try {
    const post = await prisma.cXPost.create({
      data: {
        cxuserid: userId,
        caption,
        mediaurl: mediaUrl,
      },
    });
    return res.status(201).json({
      message: "Post created ",
      payload: post,
    });
  } catch (error: any) {
    console.log("Error", error);
  }
}

export const readPosts = async (req: Request, res: Response) => {
  console.log("fetching posts");

  try {
    const skip = Math.max(Number(req.query.skip) || 0, 0);
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 50);

    const posts = await prisma.cXPost.findMany({
      skip,
      take: limit,

      include: {
        cxUser: true,
        cxComments: true,
        cxLikes: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      message: "Posts retrieved successfully",
      payload: posts,
      pagination: {
        skip,
        limit,
        returned: posts.length,
        hasMore: posts.length === limit,
      },
    });
  } catch (error: any) {
    console.log("Error", error);

    return res.status(500).json({
      message: "Failed to fetch posts",
      error: error?.message,
    });
  }
};

export const readPostById = async (req: Request<Params>, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.cXPost.findUnique({
      where: { id },
      include: {
        cxUser: {
          select: {
            id: true,
            cxusername: true,
          },
        },
        cxComments: {
          take: 10,
          orderBy: { created_at: "desc" },
        },

        cxLikes: true,
      },
    });
    return res.status(200).json({
      message: "Post retrieved",
      payload: post,
    });
  } catch (error: any) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch post", error: error?.message });
  }
};

export const readUserPosts = async (req: Request<Params>, res: Response) => {
  try {
    const { userId } = req.params;

    const posts = await prisma.cXPost.findMany({
      where: { cxuserid: userId },
      include: {
        cxUser: true,
      },
    });
    return res.status(200).json({
      message: "Retrieved post",
      payload: posts,
    });
  } catch (error: any) {
    console.log("Error", error);
  }
};

export const deletePost = async (req: Request<Params>, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.cXPost.delete({
      where: { id },
    });
    return res.send({
      message: "Post deleted successfully",
    });
  } catch (error: any) {
    console.error("Error", error);
  }
};
