"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = require("../../Middlewares/auth");
exports.orderRouter = express_1.default.Router();
const controller = (0, order_controller_1.orderController)();
exports.orderRouter.post("/cash-order", auth_1.auth, controller.cashOrder);
exports.orderRouter.get("/orderList", auth_1.auth, controller.getOrderDetails);
//# sourceMappingURL=order.router.js.map