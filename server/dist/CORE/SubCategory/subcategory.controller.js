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
exports.subCategoryController = void 0;
const AppError_1 = __importDefault(require("../../Utility/AppError"));
const class_validator_1 = require("class-validator");
const subCategory_entity_1 = require("../../DAL/Entities/subCategory.entity");
const category_entity_1 = require("../../DAL/Entities/category.entity");
const createSubCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image, categoryId } = req.body;
        if (!name || !image || !categoryId) {
            return next(new AppError_1.default("invalid parametrs", 400));
        }
        // find category
        const category = yield category_entity_1.Category.findOne({ where: { id: +categoryId } });
        if (!category) {
            return next(new AppError_1.default("category not found", 404));
        }
        const newSubCategory = new subCategory_entity_1.SubCategory();
        newSubCategory.name = name;
        newSubCategory.image = image;
        newSubCategory.category = category;
        const handleError = yield (0, class_validator_1.validate)(newSubCategory);
        if (handleError.length > 0) {
            return next(new AppError_1.default(handleError
                .map((item) => {
                const constraints = item.constraints || {};
                return Object.values(constraints).join(", ");
            })
                .join("\n"), 400));
        }
        yield newSubCategory.save();
        res
            .status(201)
            .json({ message: "subcategory elave edildi", success: true });
    }
    catch (error) {
        console.error("Error updating user:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const getSubCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategory = yield subCategory_entity_1.SubCategory.find({
            relations: {
                category: true,
            },
        });
        res.status(200).json({
            message: "subcategoires fetch sucessfuly",
            success: true,
            data: subCategory,
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const editSubCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subCategoryid, name, image, categoryId } = req.body;
        if (!subCategoryid) {
            return next(new AppError_1.default("Invalid parameters: subCategoryid is required", 400));
        }
        const existSubCategory = yield subCategory_entity_1.SubCategory.findOne({
            where: { id: +subCategoryid },
        });
        if (!existSubCategory) {
            return next(new AppError_1.default("Subcategory not found", 404));
        }
        if (categoryId) {
            const category = yield category_entity_1.Category.findOne({
                where: { id: +categoryId },
            });
            if (!category) {
                return next(new AppError_1.default("Category not found", 404));
            }
        }
        if (name) {
            existSubCategory.name = name;
        }
        if (image) {
            existSubCategory.image = image;
        }
        if (categoryId) {
            existSubCategory.category = categoryId;
        }
        const handleError = yield (0, class_validator_1.validate)(existSubCategory);
        if (handleError.length > 0) {
            return next(new AppError_1.default(handleError
                .map((item) => {
                const constraints = item.constraints || {};
                return Object.values(constraints).join(", ");
            })
                .join("\n"), 400));
        }
        yield existSubCategory.save();
        res.status(200).json({ message: "Subcategory updated", success: true });
    }
    catch (error) {
        console.error("Error updating subcategory:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const deleteSubCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subCategoryid } = req.body;
        console.log(subCategoryid, "salam");
        if (!subCategoryid) {
            return next(new AppError_1.default("Invalid parameters: subCategoryid is required", 400));
        }
        const existSubCategory = yield subCategory_entity_1.SubCategory.findOne({
            where: { id: +subCategoryid },
        });
        if (!existSubCategory) {
            return next(new AppError_1.default("Subcategory not found", 404));
        }
        yield existSubCategory.remove();
        res.status(200).json({ message: "Subcategory deleted", success: true });
    }
    catch (error) {
        console.error("Error updating user:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const subCategoryController = () => {
    return {
        createSubCategory,
        getSubCategory,
        editSubCategory,
        deleteSubCategory,
    };
};
exports.subCategoryController = subCategoryController;
//# sourceMappingURL=subcategory.controller.js.map