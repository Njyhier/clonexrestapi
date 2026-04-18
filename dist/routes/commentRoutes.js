"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = require("express");
const comment_1 = require("../controllers/comment");
exports.commentRoutes = (0, express_1.Router)();
exports.commentRoutes.post("/createcomment/:postId/:userId", comment_1.createComment);
exports.commentRoutes.delete("/:id", comment_1.deleteComment);
