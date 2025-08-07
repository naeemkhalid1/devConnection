import express from "express";
import { createPost } from "../controllers/posts.controller";

const postsRouter = express.Router();
postsRouter.post("/create/post", createPost);

export default postsRouter;
