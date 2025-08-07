import multer, { FileFilterCallback } from "multer";

interface MulterOptions {
  fileSizeLimit?: number; // in bytes
  allowedMimeTypes?: string[];
}

export const configureMulter = (options: MulterOptions = {}) => {
  const { fileSizeLimit, allowedMimeTypes } = options;

  // File filter (if types provided)
  const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (!allowedMimeTypes || allowedMimeTypes.length === 0)
      return cb(null, true); // no filter, allow all

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  };

  // Build limits object only if fileSizeLimit is provided
  const limits = fileSizeLimit ? { fileSize: fileSizeLimit } : undefined;

  return multer({
    storage: multer.memoryStorage(), // or diskStorage
    fileFilter,
    limits,
  });
};
