"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../Utility/AppError"));
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === "ADMIN") {
        return next();
    }
    return next(new AppError_1.default("Admins only.", 403));
};
exports.default = adminMiddleware;
//# sourceMappingURL=isAdmin.js.map