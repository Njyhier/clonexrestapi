import { prisma } from "./prisma";
export const createLike = async (req, res) => {
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
    }
    catch (error) {
        console.log("Error", error);
    }
};
export const readPostLikes = async (req, res) => {
    try {
        const { postId } = req.params;
        const likes = await prisma.like.findMany({
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
export const unlikePost = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.like.delete({
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
