import { v2 as cloudinary } from "cloudinary";
import multer, { StorageEngine } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { helper } from "./helper";

cloudinary.config({
  cloud_name: helper.cloudinary_name,
  api_key: helper.cloudinary_key,
  api_secret: helper.cloudinary_secret,
});

const storage: StorageEngine = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: () => ({
    folder: "uploads",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  }),
});

export const upload = multer({ storage: storage });
