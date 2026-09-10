"use strict";
// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import dotenv from "dotenv";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// dotenv.config({ path: ".env" });
// const db_url = process.env.DATABASE_URL;
// if (!process.env.DATABASE_URL && process.env.NODE_ENV !== "production") {
//   console.warn("DATABASE_URL not set (skipping strict validation)");
// }
// const adapter = new PrismaPg({
//   connectionString: db_url,
// });
// export const prisma = new PrismaClient({ adapter, log: ["query"] });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const db_url = process.env.DATABASE_URL;
if (!process.env.DATABASE_URL && process.env.NODE_ENV !== "production") {
    console.warn("DATABASE_URL not set (skipping strict validation)");
}
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: db_url,
    ssl: { rejectUnauthorized: false },
});
exports.prisma = new client_1.PrismaClient({ adapter, log: ["query"] });
