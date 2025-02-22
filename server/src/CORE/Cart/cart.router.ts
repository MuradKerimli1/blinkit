import express from "express";
import { cartController } from "./cart.controller";
import { auth } from "../../Middlewares/auth";
export const cartRouter = express.Router();
const controller = cartController();

cartRouter.post("/addCardItem", auth, controller.addCardItemController);
cartRouter.get("/getCards", auth, controller.getCartController);
cartRouter.put("/updateCart", auth, controller.updateCartItemQuantityController);
cartRouter.delete("/deleteCart", auth, controller.deleteCartItemController);
