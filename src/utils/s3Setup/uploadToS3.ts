import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Config } from "./s3ClientSetup";
import { v4 as uuid } from "uuid";
import path from "path";

export const uploadToS3 = async (
  file: Express.Multer.File
): Promise<string> => {
  const fileExtension = path.extname(file.originalname);
  const key = `uploads/${uuid()}${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    // ACL: "public-read",
  });
  try {
    const urll = await s3Config.send(command);
    console.log("issues successfully resolved:", urll);
  } catch (err) {
    console.log("errrr:", err);
  }

  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
