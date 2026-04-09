import express from "express";
import rootRouter from "./routes/mainRoute.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", rootRouter);
app.listen(PORT, () => {
  console.log("App Working");
});
