"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../Middlewares/auth");
const cloudinary_1 = require("../../DAL/Config/cloudinary");
exports.userRouter = express_1.default.Router();
const controller = (0, user_controller_1.userController)();
exports.userRouter.post("/register", controller.registerUser);
exports.userRouter.post("/login", controller.loginUser);
exports.userRouter.post("/verify-email", controller.verifyEmail);
exports.userRouter.get("/logout", auth_1.auth, controller.logout);
exports.userRouter.put("/upload-avatar", auth_1.auth, cloudinary_1.upload.single("avatar"), controller.uploadAvatar);
exports.userRouter.put("/update-user-details", auth_1.auth, controller.updateUserDetails);
exports.userRouter.put("/forgot-password", controller.forgotPassword);
exports.userRouter.put("/verify-forgot-password-otp", controller.verifyForgotPassword);
exports.userRouter.put("/reset-password", controller.resetPassword);
exports.userRouter.post("/refresh-token", controller.refreshTokenController);
exports.userRouter.get("/user-details", auth_1.auth, controller.getUserDetails);
//# sourceMappingURL=user.router.js.map