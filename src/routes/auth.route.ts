import express from "express";
import {
  login,
  register,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { requireRole } from "../middlewares/requireRole";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/users", verifyToken, getAllUsers);
authRouter.post("/register", register);
authRouter.put("/update", verifyToken, updateUser);
authRouter.delete("/delete/:id", verifyToken, requireRole("admin"), deleteUser);

export default authRouter;
