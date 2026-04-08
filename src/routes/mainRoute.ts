import { Router } from "express";
import { authRouter } from "./auth.ts";
import { postsRouter } from "./postsRoutes.ts";
import { commentRoutes } from "./commentRoutes.ts";
import { likesRouter } from "./likeRoutes.ts";
const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/posts", postsRouter);
rootRouter.use("/comments", commentRoutes);
rootRouter.use("/likes", likesRouter);

export default rootRouter;
