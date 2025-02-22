"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../Utility/AppError"));
const uploadImageController = (req, res, next) => {
    try {
        const file = req.file;
        res.status(200).json({
            file: file,
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        return next(new AppError_1.default("server xetasi", 500));
    }
};
exports.default = uploadImageController;
//# sourceMappingURL=uploadImage.controller.js.map