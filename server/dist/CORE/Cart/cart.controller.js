"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const AppError_1 = __importDefault(require("../../Utility/AppError"));
const cartProduct_entity_1 = require("../../DAL/Entities/cartProduct.entity");
const product_entity_1 = require("../../DAL/Entities/product.entity");
const user_entity_1 = require("../../DAL/Entities/user.entity");
const addCardItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            return next(new AppError_1.default("Unauthorized access", 401));
        }
        const existUser = yield user_entity_1.User.findOne({ where: { id: user.id } });
        if (!existUser) {
            return next(new AppError_1.default("User not found", 404));
        }
        const { productId } = req.body;
        if (!productId || isNaN(Number(productId))) {
            return next(new AppError_1.default("Invalid product ID", 400));
        }
        const existProduct = yield product_entity_1.Product.findOne({
            where: { id: Number(productId) },
        });
        if (!existProduct) {
            return next(new AppError_1.default("Product not found", 404));
        }
        const existCart = yield cartProduct_entity_1.CartProduct.findOne({
            where: {
                user: { id: existUser.id },
                product: { id: existProduct.id },
            },
        });
        if (existCart) {
            existCart.quantity += 1;
            yield existCart.save();
            res.status(200).json({
                message: "Product quantity updated in cart",
                success: true,
                cartItem: existCart,
            });
            return;
        }
        const newCartItem = new cartProduct_entity_1.CartProduct();
        newCartItem.product = existProduct;
        newCartItem.quantity = 1;
        newCartItem.user = existUser;
        yield newCartItem.save();
        res.status(201).json({
            message: "Product added to cart",
            success: true,
            cartItem: newCartItem,
        });
    }
    catch (error) {
        console.error("Error adding item to cart:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const getCartController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const carts = yield cartProduct_entity_1.CartProduct.find({
            where: {
                user: { id: user === null || user === void 0 ? void 0 : user.id },
            },
            relations: {
                product: true,
            },
        });
        res.status(200).json({
            success: true,
            data: carts,
        });
    }
    catch (error) {
        console.error("Error getting cart items:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const updateCartItemQuantityController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            return next(new AppError_1.default("Unauthorized access", 401));
        }
        const { productId, quantity } = req.body;
        if (!productId ||
            isNaN(Number(productId)) ||
            !quantity ||
            isNaN(Number(quantity))) {
            return next(new AppError_1.default("Invalid product ID or quantity", 400));
        }
        const existUser = yield user_entity_1.User.findOne({ where: { id: user.id } });
        if (!existUser) {
            return next(new AppError_1.default("User not found", 404));
        }
        const existProduct = yield product_entity_1.Product.findOne({
            where: { id: Number(productId) },
        });
        if (!existProduct) {
            return next(new AppError_1.default("Product not found", 404));
        }
        const existCart = yield cartProduct_entity_1.CartProduct.findOne({
            where: {
                user: { id: existUser.id },
                product: { id: existProduct.id },
            },
        });
        if (!existCart) {
            return next(new AppError_1.default("Product not found in cart", 404));
        }
        existCart.quantity = quantity;
        yield existCart.save();
        res.status(200).json({
            message: "Product quantity updated",
            success: true,
            cartItem: existCart,
        });
    }
    catch (error) {
        console.error("Error updating item quantity:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const deleteCartItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            return next(new AppError_1.default("Unauthorized access", 401));
        }
        const { productId } = req.body;
        if (!productId || isNaN(Number(productId))) {
            return next(new AppError_1.default("Invalid product ID", 400));
        }
        const existUser = yield user_entity_1.User.findOne({ where: { id: user.id } });
        if (!existUser) {
            return next(new AppError_1.default("User not found", 404));
        }
        const existProduct = yield product_entity_1.Product.findOne({
            where: { id: Number(productId) },
        });
        if (!existProduct) {
            return next(new AppError_1.default("Product not found", 404));
        }
        const existCart = yield cartProduct_entity_1.CartProduct.findOne({
            where: {
                user: { id: existUser.id },
                product: { id: existProduct.id },
            },
        });
        if (!existCart) {
            return next(new AppError_1.default("Product not found in cart", 404));
        }
        yield existCart.remove();
        res.status(200).json({
            message: "Product removed from cart",
            success: true,
        });
    }
    catch (error) {
        console.error("Error deleting item from cart:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const cartController = () => {
    return {
        addCardItemController,
        getCartController,
        updateCartItemQuantityController,
        deleteCartItemController,
    };
};
exports.cartController = cartController;
//# sourceMappingURL=cart.controller.js.map