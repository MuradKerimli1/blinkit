import express from "express";
import { userController } from "./user.controller";
import { auth } from "../../Middlewares/auth";
import { upload } from "../../DAL/Config/cloudinary";
export const userRouter = express.Router();
const controller = userController();

userRouter.post("/register", controller.registerUser);
userRouter.post("/login", controller.loginUser);
userRouter.post("/verify-email", controller.verifyEmail);
userRouter.get("/logout", auth, controller.logout);

userRouter.put(
  "/upload-avatar",
  auth,
  upload.single("avatar"),
  controller.uploadAvatar
);
userRouter.put("/update-user-details", auth, controller.updateUserDetails);
userRouter.put("/forgot-password", controller.forgotPassword);
userRouter.put("/verify-forgot-password-otp", controller.verifyForgotPassword);
userRouter.put("/reset-password", controller.resetPassword);
userRouter.post("/refresh-token", controller.refreshTokenController);
userRouter.get("/user-details", auth, controller.getUserDetails);
