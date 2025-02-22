import express from "express";
import { productController } from "./product.controller";
import { auth } from "../../Middlewares/auth";
import adminMiddleware from "../../Middlewares/isAdmin";

export const productRouter = express.Router();
const controller = productController();

productRouter.post("/create", auth, adminMiddleware, controller.productCreate);
productRouter.post("/get", controller.getProduct);
productRouter.post("/getProductByCategory", controller.getProductByCategory);
productRouter.post(
  "/getProductByCategoryAndSubCategory",
  controller.getProductByCategoryAndSubcategory
);
productRouter.post("/getProductDetails", controller.getProductDetails);

productRouter.put(
  "/productEdit",
  auth,
  adminMiddleware,
  controller.productEdit
);
productRouter.delete(
  "/deleteProduct",
  auth,
  adminMiddleware,
  controller.deleteProduct
);
productRouter.post("/searchProduct", controller.searchProduct);
