"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../CORE/User/user.router");
const product_router_1 = require("../CORE/Product/product.router");
const category_router_1 = require("../CORE/Category/category.router");
const uploadImage_router_1 = require("../CORE/UploadImage/uploadImage.router");
const subcategory_router_1 = require("../CORE/SubCategory/subcategory.router");
const cart_router_1 = require("../CORE/Cart/cart.router");
const adress_router_1 = require("../CORE/Adress/adress.router");
const order_router_1 = require("../CORE/Order/order.router");
exports.mainRouter = express_1.default.Router();
exports.mainRouter.use("/user", user_router_1.userRouter);
exports.mainRouter.use("/product", product_router_1.productRouter);
exports.mainRouter.use("/category", category_router_1.categoryRouter);
exports.mainRouter.use("/file", uploadImage_router_1.uploadRouter);
exports.mainRouter.use("/subCategory", subcategory_router_1.subCategoryRouter);
exports.mainRouter.use("/cart", cart_router_1.cartRouter);
exports.mainRouter.use("/address", adress_router_1.addressRouter);
exports.mainRouter.use("/order", order_router_1.orderRouter);
//# sourceMappingURL=index.router.js.map