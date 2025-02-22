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
exports.categoryController = void 0;
const AppError_1 = __importDefault(require("../../Utility/AppError"));
const category_entity_1 = require("../../DAL/Entities/category.entity");
const class_validator_1 = require("class-validator");
const categoryCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            return next(new AppError_1.default("name and image are required", 400));
        }
        const category = new category_entity_1.Category();
        category.name = name;
        category.image = image;
        const handleError = yield (0, class_validator_1.validate)(category);
        if (handleError.length > 0) {
            return next(new AppError_1.default(handleError
                .map((item) => {
                const constraints = item.constraints || {};
                return Object.values(constraints).join(", ");
            })
                .join("\n"), 400));
        }
        yield category.save();
        res.status(201).json({ message: "category elave edildi", success: true });
    }
    catch (error) {
        console.error("Error updating user:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_entity_1.Category.find({
            order: {
                created_at: "ASC",
            },
            relations: {
                subCategories: true,
            },
        });
        res.status(200).json({
            category,
            success: true,
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const categoryEdit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { categoryId, name, image } = req.body;
        const updateData = {};
        if (name)
            updateData.name = name;
        if (image)
            updateData.image = image;
        const result = yield category_entity_1.Category.update({ id: +categoryId }, updateData);
        if (result.affected === 0) {
            return next(new AppError_1.default("Category not found", 404));
        }
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
        });
    }
    catch (error) {
        console.error("Error updating category:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.body;
        if (!categoryId) {
            return next(new AppError_1.default("categoryId invalid", 400));
        }
        const category = yield category_entity_1.Category.findOne({ where: { id: +categoryId } });
        if (!category) {
            return next(new AppError_1.default("category not found", 404));
        }
        yield category.remove();
        res.status(200).json({ message: "category deleted", success: true });
    }
    catch (error) {
        console.error("Error updating category:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const categoryController = () => {
    return { categoryCreate, getCategory, categoryEdit, deleteCategory };
};
exports.categoryController = categoryController;
//# sourceMappingURL=category.controller.js.map