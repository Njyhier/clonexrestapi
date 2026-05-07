import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const db_url = process.env.DATABASE_URL;
if (!process.env.DATABASE_URL && process.env.NODE_ENV !== "production") {
  console.warn("DATABASE_URL not set (skipping strict validation)");
}
const adapter = new PrismaPg({
  connectionString: db_url,
});

export const prisma = new PrismaClient({ adapter, log: ["query"] });
