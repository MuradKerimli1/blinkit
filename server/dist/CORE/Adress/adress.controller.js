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
exports.addressController = void 0;
const AppError_1 = __importDefault(require("../../Utility/AppError"));
const adress_entity_1 = require("../../DAL/Entities/adress.entity");
const user_entity_1 = require("../../DAL/Entities/user.entity");
const createAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const user = req.user;
        const { address_line, city, state, pincode, country, mobile } = req.body;
        const existUser = yield user_entity_1.User.findOne({ where: { id: user === null || user === void 0 ? void 0 : user.id } });
        if (!existUser) {
            return next(new AppError_1.default("user not found", 404));
        }
        const newAddress = new adress_entity_1.Addreses();
        newAddress.address_line = address_line;
        newAddress.city = city;
        newAddress.state = state;
        newAddress.pincode = pincode;
        newAddress.country = country;
        newAddress.mobile = mobile;
        newAddress.user = existUser;
        yield newAddress.save();
        res.status(200).json({ message: "address elave edildi", success: true });
    }
    catch (error) {
        console.error("Error updating category:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const getAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new AppError_1.default("User not authenticated", 401));
        }
        // "await" əlavə edildi
        const existAddress = yield adress_entity_1.Addreses.find({
            where: { user: { id: user.id } },
        });
        res.status(200).json({
            data: existAddress,
            success: true,
            message: "List of addresses",
        });
    }
    catch (error) {
        console.error("Error fetching address:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const updateAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new AppError_1.default("User not authenticated", 401));
        }
        const { id, address_line, city, mobile, state, country, pincode } = req.body;
        // exist addreess
        const existAddress = yield adress_entity_1.Addreses.findOne({
            where: {
                id: +id,
                user: {
                    id: user === null || user === void 0 ? void 0 : user.id,
                },
            },
        });
        if (!existAddress) {
            return next(new AppError_1.default("address not found", 404));
        }
        Object.assign(existAddress, {
            address_line: address_line !== null && address_line !== void 0 ? address_line : existAddress.address_line,
            city: city !== null && city !== void 0 ? city : existAddress.city,
            mobile: mobile !== null && mobile !== void 0 ? mobile : existAddress.mobile,
            state: state !== null && state !== void 0 ? state : existAddress.state,
            country: country !== null && country !== void 0 ? country : existAddress.country,
            pincode: pincode !== null && pincode !== void 0 ? pincode : existAddress.pincode,
        });
        yield existAddress.save();
        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address: existAddress,
        });
    }
    catch (error) {
        console.error("Error fetching address:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const deleteAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new AppError_1.default("User not authenticated", 401));
        }
        const { id } = req.body;
        if (!id) {
            return next(new AppError_1.default("Address ID is required", 400));
        }
        const existAddress = yield adress_entity_1.Addreses.findOne({
            where: {
                id: +id,
                user: {
                    id: user.id,
                },
            },
        });
        if (!existAddress) {
            return next(new AppError_1.default("Address not found", 404));
        }
        yield existAddress.remove();
        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting address:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const addressController = () => {
    return { createAddress, getAddress, updateAddress, deleteAddress };
};
exports.addressController = addressController;
//# sourceMappingURL=adress.controller.js.map