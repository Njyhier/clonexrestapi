import express from "express";
import type { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes/mainRoute";
import cors from "cors";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use("/", rootRouter);

app.listen(PORT, () => {
  console.log("App Working");
});
