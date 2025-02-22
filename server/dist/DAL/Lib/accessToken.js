"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenanSet = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helper_1 = require("../Config/helper");
const createTokenanSet = (userId) => {
    const payload = {
        sub: userId,
    };
    const token = jsonwebtoken_1.default.sign(payload, helper_1.helper.secret_key_access, {
        expiresIn: "5h",
    });
    return token;
};
exports.createTokenanSet = createTokenanSet;
//# sourceMappingURL=accessToken.js.map