"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const helper_1 = require("./helper");
cloudinary_1.v2.config({
    cloud_name: helper_1.helper.cloudinary_name,
    api_key: helper_1.helper.cloudinary_key,
    api_secret: helper_1.helper.cloudinary_secret,
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: () => ({
        folder: "uploads",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
    }),
});
exports.upload = (0, multer_1.default)({ storage: storage });
//# sourceMappingURL=cloudinary.js.map