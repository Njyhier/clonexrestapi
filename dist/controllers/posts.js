"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.readUserPosts = exports.readPostById = exports.readPosts = void 0;
exports.createPost = createPost;
const prisma_1 = require("./prisma");
async function createPost(req, res) {
    const { caption, mediaUrl, userId } = req.body;
    // const {userId}= req.params
    try {
        const post = await prisma_1.prisma.post.create({
            data: {
                userId,
                caption,
                mediaUrl,
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
    try {
        const posts = await prisma_1.prisma.post.findMany({
            include: {
                user: true,
                comments: true,
                likes: true,
            },
        });
        return res
            .status(200)
            .json({ message: "Posts retrieved successfully", payload: posts });
    }
    catch (error) {
        console.log("Error", error);
    }
};
exports.readPosts = readPosts;
const readPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma_1.prisma.post.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                comments: {
                    take: 10,
                    orderBy: { created_at: "desc" },
                },
                likes: true,
            },
        });
        return res.status(200).json({
            message: "Post retrieved",
            payload: post,
        });
    }
    catch (error) {
        console.log("Error", error);
    }
};
exports.readPostById = readPostById;
const readUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await prisma_1.prisma.post.findMany({
            where: { userId },
            include: {
                user: true,
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
        await prisma_1.prisma.post.delete({
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
