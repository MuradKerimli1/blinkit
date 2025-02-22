import express from "express";
import { auth } from "../../Middlewares/auth";
import uploadImageController from "./uploadImage.controller";
import { upload } from "../../DAL/Config/cloudinary";
export const uploadRouter = express.Router();

uploadRouter.post("/upload", auth, upload.single("image"), uploadImageController);
