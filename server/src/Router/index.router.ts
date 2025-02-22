import express from "express";
import { userRouter } from "../CORE/User/user.router";
import { productRouter } from "../CORE/Product/product.router";
import { categoryRouter } from "../CORE/Category/category.router";
import { uploadRouter } from "../CORE/UploadImage/uploadImage.router";
import { subCategoryRouter } from "../CORE/SubCategory/subcategory.router";
import { cartRouter } from "../CORE/Cart/cart.router";
import { addressRouter } from "../CORE/Adress/adress.router";
import { orderRouter } from "../CORE/Order/order.router";
export const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/file", uploadRouter);
mainRouter.use("/subCategory", subCategoryRouter);
mainRouter.use("/cart", cartRouter);
mainRouter.use("/address", addressRouter);
mainRouter.use("/order", orderRouter);
