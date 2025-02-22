"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const subcategory_controller_1 = require("./subcategory.controller");
const auth_1 = require("../../Middlewares/auth");
const isAdmin_1 = __importDefault(require("../../Middlewares/isAdmin"));
exports.subCategoryRouter = express_1.default.Router();
const controller = (0, subcategory_controller_1.subCategoryController)();
exports.subCategoryRouter.post("/create", auth_1.auth, isAdmin_1.default, controller.createSubCategory);
exports.subCategoryRouter.get("/get", controller.getSubCategory);
exports.subCategoryRouter.put("/edit", auth_1.auth, isAdmin_1.default, controller.editSubCategory);
// subCategoryRouter.put("/edit", controller.editSubCategory);
exports.subCategoryRouter.delete("/delete", auth_1.auth, isAdmin_1.default, controller.deleteSubCategory);
//# sourceMappingURL=subcategory.router.js.map