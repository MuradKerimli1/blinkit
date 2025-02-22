"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_1 = require("../../Middlewares/auth");
const isAdmin_1 = __importDefault(require("../../Middlewares/isAdmin"));
exports.categoryRouter = express_1.default.Router();
const controller = (0, category_controller_1.categoryController)();
exports.categoryRouter.post("/create", auth_1.auth, isAdmin_1.default, controller.categoryCreate);
exports.categoryRouter.get("/getCategory", controller.getCategory);
exports.categoryRouter.put("/editCategory", auth_1.auth, isAdmin_1.default, controller.categoryEdit);
exports.categoryRouter.delete("/deleteCategory", auth_1.auth, isAdmin_1.default, controller.deleteCategory);
//# sourceMappingURL=category.router.js.map