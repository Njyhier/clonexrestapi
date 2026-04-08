import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./clonex.db",
});

export const prisma = new PrismaClient({ adapter, log: ["query"] });
