import express, { Request, Response } from "express";
import databaseConnection from "./config/db";
import authRouter from "./routes/auth.route";
import fileRoute from "./routes/uploadFiles.route";
import postsRouter from "./routes/posts.route";
import AppGlobalError from "./middlewares/appError";
import { verifyToken } from "./middlewares/verifyToken";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

databaseConnection();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/upload", fileRoute);

app.use(AppGlobalError);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
