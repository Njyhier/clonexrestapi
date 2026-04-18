import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import dotenv from "dotenv";
import { dot } from "node:test/reporters";

dotenv.config({ path: ".env" });

const db_url = process.env.DATABASE_URL;

const adapter = new PrismaBetterSqlite3({
  url: db_url || "file:./clonex.db",
});

export const prisma = new PrismaClient({ adapter, log: ["query"] });
