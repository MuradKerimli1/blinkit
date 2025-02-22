"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = __importDefault(require("express"));
const adress_controller_1 = require("./adress.controller");
const auth_1 = require("../../Middlewares/auth");
exports.addressRouter = express_1.default.Router();
const controller = (0, adress_controller_1.addressController)();
exports.addressRouter.post("/create", auth_1.auth, controller.createAddress);
exports.addressRouter.get("/get", auth_1.auth, controller.getAddress);
exports.addressRouter.put("/update", auth_1.auth, controller.updateAddress);
exports.addressRouter.delete("/delete", auth_1.auth, controller.deleteAddress);
//# sourceMappingURL=adress.router.js.map