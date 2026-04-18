import express from "express";
import type { Express } from "express";
import rootRouter from "./routes/mainRoute";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const PORT = process.env.PORT;

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use("/", rootRouter);

app.listen(PORT, () => {
  console.log("App Working");
});
