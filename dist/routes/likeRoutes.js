"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likesRouter = void 0;
const express_1 = require("express");
const likes_1 = require("../controllers/likes");
exports.likesRouter = (0, express_1.Router)();
exports.likesRouter.post("/createlike", likes_1.createLike);
exports.likesRouter.delete("/:id", likes_1.unlikePost);
