"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const db_url = process.env.DATABASE_URL;
if (!db_url) {
    throw new Error("DATABASE_URL is not defined");
}
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: db_url,
});
exports.prisma = new client_1.PrismaClient({ adapter, log: ["query"] });
