// /backend/middleware/upload.js

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogs", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
  },
});

// Optional file filter
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only JPEG, PNG, or WEBP images are allowed"), false);
};

// Multer setup with limits preserved
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024 * 1024,   // 1 GB
    fieldSize: 2 * 1024 * 1024 * 1024,  // 2 GB for non-file fields
    files: 1,                           // Allow only 1 file
  },
});

export default upload;
