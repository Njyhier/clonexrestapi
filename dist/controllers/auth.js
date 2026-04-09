"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.signup = exports.login = void 0;
const prisma_1 = require("./prisma");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const login = async (req, res) => {
    try {
        const { password, username } = req.body;
        const user = await prisma_1.prisma.user.findFirst({
            where: { username },
        });
        if (!user) {
            throw Error("Invalid username or password");
        }
        if (!(0, bcrypt_1.compareSync)(password, user?.passwordHash ?? "")) {
            throw Error("Invalid username or password");
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user?.id,
        }, secrets_1.SECRET_KEY);
        return res.status(200).json({
            message: "Login successfull",
            payload: { user, token },
        });
    }
    catch (error) {
        console.log("Error", error);
    }
};
exports.login = login;
const signup = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const user = await prisma_1.prisma.user.create({
            data: {
                username,
                email,
                passwordHash: (0, bcrypt_1.hashSync)(password, 10),
            },
        });
        return res.status(201).json({
            message: "SignUp successful",
            payload: user,
        });
    }
    catch (error) {
        console.error(error);
        if (error.code === "P2002") {
            return res
                .status(400)
                .json({ message: "email or username already exists" });
        }
    }
    return res.status(500).json({ message: "Internal server error" });
};
exports.signup = signup;
const getCurrentUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization ?? "";
        if (!token) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }
        const payload = jsonwebtoken_1.default.verify(token, secrets_1.SECRET_KEY);
        const user = await prisma_1.prisma.user.findFirst({
            where: { id: payload?.userId },
        });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        return res.json({ user });
    }
    catch (error) {
        console.log("Error", error);
    }
};
exports.getCurrentUser = getCurrentUser;
