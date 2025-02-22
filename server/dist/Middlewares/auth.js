"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helper_1 = require("../DAL/Config/helper");
const user_entity_1 = require("../DAL/Entities/user.entity");
const AppError_1 = __importDefault(require("../Utility/AppError"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || ((_c = (_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1]);
        if (!token) {
            return next(new AppError_1.default("Invalid token", 401));
        }
        const decode = jsonwebtoken_1.default.verify(token, helper_1.helper.secret_key_access);
        if (!decode) {
            return next(new AppError_1.default("Invalid token", 401));
        }
        const existUser = yield user_entity_1.User.findOne({ where: { id: +decode.sub } });
        if (!existUser) {
            return next(new AppError_1.default("User not found", 404));
        }
        req.user = existUser;
        next();
    }
    catch (error) {
        console.error("Error during authentication:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
exports.auth = auth;
//# sourceMappingURL=auth.js.map