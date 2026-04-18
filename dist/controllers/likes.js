"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikePost = exports.readPostLikes = exports.createLike = void 0;
const prisma_1 = require("./prisma");
const createLike = async (req, res) => {
    try {
        const { postId, userId } = req.params;
        if (!userId || !postId) {
            return res.status(400).json({ message: "Missing post or user id" });
        }
        const like = await prisma_1.prisma.like.create({
            data: {
                postId,
                userId,
            },
        });
        return res.status(201).json({
            message: "Like created successfuly",
            payload: like,
        });
    }
    catch (error) {
        console.log("Error", error);
    }
};
exports.createLike = createLike;
const readPostLikes = async (req, res) => {
    try {
        const { postId } = req.params;
        const likes = await prisma_1.prisma.like.findMany({
            where: { postId },
        });
        return res.status(200).json({
            message: "Likes retrieved",
            payload: likes,
        });
    }
    catch (error) {
        console.log("Error", error);
    }
};
exports.readPostLikes = readPostLikes;
const unlikePost = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.like.delete({
            where: { id },
        });
        return res.status(200).json({
            message: "Like removed",
        });
    }
    catch (error) {
        console.log("Error", error);
    }
};
exports.unlikePost = unlikePost;
