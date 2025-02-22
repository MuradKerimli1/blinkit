"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = require("../../Middlewares/auth");
const isAdmin_1 = __importDefault(require("../../Middlewares/isAdmin"));
exports.productRouter = express_1.default.Router();
const controller = (0, product_controller_1.productController)();
exports.productRouter.post("/create", auth_1.auth, isAdmin_1.default, controller.productCreate);
exports.productRouter.post("/get", controller.getProduct);
exports.productRouter.post("/getProductByCategory", controller.getProductByCategory);
exports.productRouter.post("/getProductByCategoryAndSubCategory", controller.getProductByCategoryAndSubcategory);
exports.productRouter.post("/getProductDetails", controller.getProductDetails);
exports.productRouter.put("/productEdit", auth_1.auth, isAdmin_1.default, controller.productEdit);
exports.productRouter.delete("/deleteProduct", auth_1.auth, isAdmin_1.default, controller.deleteProduct);
exports.productRouter.post("/searchProduct", controller.searchProduct);
//# sourceMappingURL=product.router.js.map