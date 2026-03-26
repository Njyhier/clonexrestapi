import express from "express";
import type { Express } from "express";
import { PORT } from "./secrets.ts";
import rootRouter from "./routes/mainRoute.ts";

const app: Express = express();
app.use(express.json());
app.use("/", rootRouter);

app.listen(PORT, () => {
  console.log("App Working");
});
