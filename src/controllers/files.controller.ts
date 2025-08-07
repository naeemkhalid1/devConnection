import { Request, Response, NextFunction } from "express";
import { uploadToS3 } from "../utils/s3Setup/uploadToS3";
import { BadRequest } from "../utils/customErros/customErrors";
import { AuthRequest } from "../types/authReques";
import User from "../models/user.model";
import { sendEmail } from "../utils/mails/senEmil";
export const uploadProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw new BadRequest("NO image Uplaoded");
    }
    const imageurl = await uploadToS3(req.file);
    const { userId } = req as AuthRequest;

    const updatedUser: any = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { profileImg: imageurl } },
      { new: true }
    );
    try {
      await sendEmail(updatedUser.email, updatedUser.name);
    } catch (err) {
      console.log("werrewerer:", err);
    }

    return res.status(200).json({
      message: "Image uploaded successfully",
      user: {
        _id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        profileImg: updatedUser.profileImg,
      },
    });
  } catch (error) {
    next(error);
  }
};
