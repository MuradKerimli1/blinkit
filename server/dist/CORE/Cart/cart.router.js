"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const auth_1 = require("../../Middlewares/auth");
exports.cartRouter = express_1.default.Router();
const controller = (0, cart_controller_1.cartController)();
exports.cartRouter.post("/addCardItem", auth_1.auth, controller.addCardItemController);
exports.cartRouter.get("/getCards", auth_1.auth, controller.getCartController);
exports.cartRouter.put("/updateCart", auth_1.auth, controller.updateCartItemQuantityController);
exports.cartRouter.delete("/deleteCart", auth_1.auth, controller.deleteCartItemController);
//# sourceMappingURL=cart.router.js.map