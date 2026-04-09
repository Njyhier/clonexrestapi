import type { Response, Request, NextFunction } from "express";
import { prisma } from "./prisma";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const SECRET_KEY = process.env.SECRET_KEY!;
export const login = async (req: Request, res: Response) => {
  try {
    const { password, username } = req.body;
    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      throw Error("Invalid username or password");
    }

    if (!compareSync(password, user?.passwordHash ?? "")) {
      throw Error("Invalid username or password");
      return;
    }
    const token = jwt.sign(
      {
        userId: user?.id,
      },
      SECRET_KEY,
    );
    return res.status(200).json({
      message: "Login successfull",
      payload: { user, token },
    });
  } catch (error: any) {
    console.log("Error", error);
  }
};

export const signup = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: hashSync(password, 10),
      },
    });
    return res.status(201).json({
      message: "SignUp successful",
      payload: user,
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ message: "email or username already exists" });
    }
  }
  return res.status(500).json({ message: "Internal server error" });
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization ?? "";
    if (!token) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
    const payload: { userId: string } = jwt.verify(token, SECRET_KEY) as any;
    const user = await prisma.user.findFirst({
      where: { id: payload?.userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    return res.json({ user });
  } catch (error: any) {
    console.log("Error", error);
  }
};
