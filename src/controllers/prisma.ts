import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const db_url = process.env.DATABASE_URL;
if (!db_url) {
  throw new Error("DATABASE_URL is not defined");
}
const adapter = new PrismaPg({
  connectionString: db_url,
});

export const prisma = new PrismaClient({ adapter, log: ["query"] });
