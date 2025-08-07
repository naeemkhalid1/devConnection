import { Request, Response, NextFunction } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../types/authReques";
import {
  ForbiddenError,
  UnAuthorizedError,
} from "../utils/customErros/customErrors";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthorizedError("UnAuthorized User");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = JWT.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;

    (req as AuthRequest).userId = decoded.userId;

    next();
  } catch (err) {
    throw new ForbiddenError("Forbidden,Invalid token");
  }
};
