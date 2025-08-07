import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

import { AuthRequest, MulterRequest } from "../types/authReques";
import {
  NotFoundError,
  UnAuthorizedError,
} from "../utils/customErros/customErrors";

import { generateToken } from "../utils/jwt";

interface Payload {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: any = await User.findOne({ email });

    if (!user) throw new UnAuthorizedError("Inavalid Email or Password");

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      throw new UnAuthorizedError("Inavalid Email or Password");

    const token = generateToken(user._id);

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    throw new UnAuthorizedError("Invalid Email or Password try again");
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
  // next: NextFunction
) => {
  const { name, email } = req.query;
  const query: any = {};
  if (name) query.name = name;
  if (email) query.email = email;

  try {
    const response = await User.find(query, { name: 1, email: 1 });
    return res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ message: "Failed while Getting Data", error });
  }
};
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  console.log(req.body, req.file);
  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    console.log("creating user?");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const accessToken = generateToken(user.id);

    res.status(201).json({ user, accessToken });
  } catch (error) {
    res.status(500).json({ message: "Registration Failed", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const {
    userId,
    body: { name, email, password, role },
  } = req as AuthRequest;
  let payload: Payload = {};
  if (name) payload.name = name;
  if (email) payload.email = email;
  if (role) payload.role = role;
  if (password) {
    payload.password = await bcrypt.hash(password, 10);
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: payload },
      { new: true }
    );
    console.log("updated User:", user);

    res.status(200).json({ message: "successfully changed", data: user });
  } catch (err) {
    res.status(500).json({ message: "changes not saved", err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("deleted id:", id);
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    if (!deletedUser)
      res.status(404).json({
        message: "User Not Found,Already deleted ",
      });
    res.status(200).json({ message: "User SuccessFully Deleted" });
  } catch (err) {
    res.status(500).json({ message: "User Not Deleted" });
  }
};
