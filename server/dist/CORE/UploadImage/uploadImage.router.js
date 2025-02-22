"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../Middlewares/auth");
const uploadImage_controller_1 = __importDefault(require("./uploadImage.controller"));
const cloudinary_1 = require("../../DAL/Config/cloudinary");
exports.uploadRouter = express_1.default.Router();
exports.uploadRouter.post("/upload", auth_1.auth, cloudinary_1.upload.single("image"), uploadImage_controller_1.default);
//# sourceMappingURL=uploadImage.router.js.map