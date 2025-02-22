import express from "express";
import { addressController } from "./adress.controller";
import { auth } from "../../Middlewares/auth";
export const addressRouter = express.Router();
const controller = addressController();

addressRouter.post("/create", auth, controller.createAddress);
addressRouter.get("/get", auth, controller.getAddress);
addressRouter.put("/update", auth, controller.updateAddress);
addressRouter.delete("/delete", auth, controller.deleteAddress);
