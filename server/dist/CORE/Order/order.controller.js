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
exports.orderController = void 0;
const AppError_1 = __importDefault(require("../../Utility/AppError"));
const product_entity_1 = require("../../DAL/Entities/product.entity");
const typeorm_1 = require("typeorm");
const adress_entity_1 = require("../../DAL/Entities/adress.entity");
const order_entity_1 = require("../../DAL/Entities/order.entity");
const uuid_1 = require("uuid");
const cartProduct_entity_1 = require("../../DAL/Entities/cartProduct.entity");
const cashOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { list_items, addressId, subTotalAmt, totalAmt } = req.body;
        const user = req.user;
        if (!user) {
            return next(new AppError_1.default("User not found", 404));
        }
        if (!addressId) {
            return next(new AppError_1.default("Address are valuable", 400));
        }
        const existProducts = yield product_entity_1.Product.findBy({
            id: (0, typeorm_1.In)(list_items.map((item) => item.product.id)),
        });
        if (!existProducts.length) {
            return next(new AppError_1.default("Products not found", 404));
        }
        const existAddress = yield adress_entity_1.Addreses.findOne({
            where: {
                user: { id: user.id },
                id: +addressId,
            },
        });
        if (!existAddress) {
            return next(new AppError_1.default("Address not found", 404));
        }
        const newOrder = new order_entity_1.Order();
        newOrder.user = user;
        newOrder.orderId = (0, uuid_1.v4)();
        newOrder.product = existProducts;
        newOrder.delivery_address = existAddress;
        newOrder.totalAmt = totalAmt;
        newOrder.subTotalAmt = subTotalAmt;
        newOrder.payment_status = "Cash on delivery";
        yield newOrder.save();
        yield cartProduct_entity_1.CartProduct.delete({ user: user });
        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: newOrder,
        });
    }
    catch (error) {
        console.error("Error processing order:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const getOrderDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new AppError_1.default("User not found", 404));
        }
        const orders = yield order_entity_1.Order.find({
            where: {
                user: {
                    id: user === null || user === void 0 ? void 0 : user.id,
                },
            },
            relations: {
                product: true,
            },
        });
        res.status(200).json({ success: true, data: orders });
    }
    catch (error) {
        console.error("Error processing order:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const orderController = () => {
    return { cashOrder, getOrderDetails };
};
exports.orderController = orderController;
//# sourceMappingURL=order.controller.js.map