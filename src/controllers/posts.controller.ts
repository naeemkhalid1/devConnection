import { Request, Response } from "express";
import Posts from "../models/posts.model";
import { IPosts } from "../models/posts.model";

export const createPost = async (req: Request, res: Response) => {
  const { user, media, content } = req.body;

  console.log("userrrr:", user, content);
};
