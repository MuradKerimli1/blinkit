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
exports.refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helper_1 = require("../Config/helper");
const user_entity_1 = require("../Entities/user.entity");
const refreshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        sub: userId,
    };
    const token = jsonwebtoken_1.default.sign(payload, helper_1.helper.secret_key_refresh, { expiresIn: "7d" });
    yield user_entity_1.User.update({ id: userId }, { refresh_token: token });
    return token;
});
exports.refreshToken = refreshToken;
//# sourceMappingURL=refreshToken.js.map