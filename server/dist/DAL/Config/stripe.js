"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const helper_1 = require("./helper");
const stripe = new stripe_1.default(helper_1.helper.stripe_secret_key);
exports.default = stripe;
//# sourceMappingURL=stripe.js.map