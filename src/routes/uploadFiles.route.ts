import express from "express";
import { uploadProfileImage } from "../controllers/files.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { configureMulter } from "../utils/helper";
const fileRoute = express.Router();

const upload = configureMulter({
  fileSizeLimit: 1 * 1024 * 1024,
  allowedMimeTypes: ["image/jpeg", "image/png"],
});

fileRoute.post(
  "/file",
  verifyToken,
  upload.single("Image"),
  uploadProfileImage
);

export default fileRoute;
