import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/authReques";
import {
  ForbiddenError,
  UnAuthorizedError,
} from "../utils/customErros/customErrors";
import User from "../models/user.model";

export const requireRole = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req as AuthRequest;

    if (!userId) throw new UnAuthorizedError("UnAuthorized User");

    const user: any = await User.findById(userId);
    if (!roles.includes(user.role))
      throw new ForbiddenError(
        "you dnt have permession to perform this action"
      );
    next();
  };
};
