"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const adapter_better_sqlite3_1 = require("@prisma/adapter-better-sqlite3");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const db_url = process.env.DATABASE_URL;
const adapter = new adapter_better_sqlite3_1.PrismaBetterSqlite3({
    url: db_url || "file:./clonex.db",
});
exports.prisma = new client_1.PrismaClient({ adapter, log: ["query"] });
