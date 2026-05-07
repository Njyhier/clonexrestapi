"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.readUserPosts = exports.readPostById = exports.readPosts = void 0;
exports.createPost = createPost;
const prisma_1 = require("./prisma");
async function createPost(req, res) {
    const { userId } = req.params;
    const { caption, mediaUrl = "" } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "Missing user id!" });
    }
    try {
        const post = await prisma_1.prisma.cXPost.create({
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
    }
    catch (error) {
        console.log("Error", error);
    }
}
const readPosts = async (req, res) => {
    console.log("fetching posts");
    try {
        const posts = await prisma_1.prisma.cXPost.findMany({
            include: {
                cxUser: true,
                cxComments: true,
                cxLikes: true,
            },
        });
        return res
            .status(200)
            .json({ message: "Posts retrieved successfully", payload: posts });
    }
    catch (error) {
        console.log("Error", error);
        return res
            .status(500)
            .json({ message: "Failed to fetch posts", error: error?.message });
    }
};
exports.readPosts = readPosts;
const readPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma_1.prisma.cXPost.findUnique({
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
    }
    catch (error) {
        console.log("Error", error);
        return res
            .status(500)
            .json({ message: "Failed to fetch post", error: error?.message });
    }
};
exports.readPostById = readPostById;
const readUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await prisma_1.prisma.cXPost.findMany({
            where: { cxuserid: userId },
            include: {
                cxUser: true,
            },
        });
        return res.status(200).json({
            message: "Retrieved post",
            payload: posts,
        });
    }
    catch (error) {
        console.log("Error", error);
    }
};
exports.readUserPosts = readUserPosts;
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.cXPost.delete({
            where: { id },
        });
        return res.send({
            message: "Post deleted successfully",
        });
    }
    catch (error) {
        console.error("Error", error);
    }
};
exports.deletePost = deletePost;
