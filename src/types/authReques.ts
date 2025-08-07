import { Request } from "express";
import { Multer } from "multer";

export interface AuthRequest extends Request {
  userId: string;
}

export interface MulterRequest extends Multer {
  file: Express.Multer.File;
}
