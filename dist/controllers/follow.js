"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFollowing = exports.readFollowers = exports.unfollow = exports.createFollow = void 0;
const createFollow = async (req, res) => {
    //   try {
    //     const { followerId, followingId } = req.params;
    //     if (!followerId || !followingId) {
    //       return res.status(400).json({ error: "Invalid input" });
    //     }
    //     const follow = await prisma.follow.create({
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
exports.createFollow = createFollow;
const unfollow = async (req, res) => {
    //   try {
    //     const { id } = req.params;
    //     if (!id || Array.isArray(id)) {
    //       return res.status(400).json({ error: "Invalid id" });
    //     }
    //     await prisma.follow.delete({
    //       where: id,
    //     });
    //     return res.status(200).json({
    //       message: "Unfollow successful",
    //     });
    //   } catch (error: any) {
    //     console.log("Error", error);
    //   }
};
exports.unfollow = unfollow;
const readFollowers = async (req, res) => { };
exports.readFollowers = readFollowers;
const readFollowing = async (req, res) => { };
exports.readFollowing = readFollowing;
