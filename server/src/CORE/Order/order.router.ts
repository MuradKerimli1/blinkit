import express from "express";
import { orderController } from "./order.controller";
import { auth } from "../../Middlewares/auth";
export const orderRouter = express.Router();
const controller = orderController();
orderRouter.post("/cash-order", auth, controller.cashOrder);
orderRouter.get("/orderList", auth, controller.getOrderDetails);
