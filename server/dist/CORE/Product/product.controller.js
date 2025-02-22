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
exports.productController = void 0;
const AppError_1 = __importDefault(require("../../Utility/AppError"));
const product_entity_1 = require("../../DAL/Entities/product.entity");
const class_validator_1 = require("class-validator");
const category_entity_1 = require("../../DAL/Entities/category.entity");
const typeorm_1 = require("typeorm");
const subCategory_entity_1 = require("../../DAL/Entities/subCategory.entity");
const productCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existCategories = yield category_entity_1.Category.findBy({
            id: (0, typeorm_1.In)(req.body.category),
        });
        if (!existCategories) {
            return next(new AppError_1.default("Category not found", 404));
        }
        const existSubCategories = yield subCategory_entity_1.SubCategory.findBy({
            id: (0, typeorm_1.In)(req.body.subCategory),
        });
        if (!existSubCategories) {
            return next(new AppError_1.default("SubCategory not found", 404));
        }
        const newProduct = new product_entity_1.Product();
        newProduct.name = req.body.name;
        newProduct.price = +req.body.price;
        newProduct.stock = +req.body.stock;
        newProduct.unit = req.body.unit;
        newProduct.discount = +req.body.discount;
        newProduct.description = req.body.description;
        newProduct.image = req.body.image;
        newProduct.category = existCategories;
        newProduct.subCategory = existSubCategories;
        const validator = yield (0, class_validator_1.validate)(newProduct);
        if (validator.length > 0) {
            return next(new AppError_1.default("Validation error", 400));
        }
        yield newProduct.save();
        res.status(201).json({ message: "Product created", success: true });
    }
    catch (error) {
        console.error("Error during productCreate:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { page, limit, search } = req.body;
        page = Number(page) || 1;
        limit = Number(limit) || 10;
        const skip = (page - 1) * limit;
        const whereCondition = search ? { name: (0, typeorm_1.ILike)(`%${search}%`) } : {};
        const totalCount = yield product_entity_1.Product.count({ where: whereCondition });
        const product = yield product_entity_1.Product.find({
            where: whereCondition,
            relations: {
                category: true,
                subCategory: true,
            },
            skip,
            take: limit,
        });
        const totalPage = Math.ceil(totalCount / limit);
        res.status(200).json({
            data: product,
            totalCount,
            totalPage,
            currentPage: page,
            success: true,
        });
    }
    catch (error) {
        console.log("Error during getProduct:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const getProductByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, limit } = req.body;
        const products = yield product_entity_1.Product.find({
            where: {
                category: {
                    id: +categoryId,
                },
            },
            take: limit ? +limit : undefined,
        });
        res.status(200).json({
            success: true,
            data: products,
        });
    }
    catch (error) {
        console.log("Error during getProduct:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const getProductByCategoryAndSubcategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { categoryId, subCategoryId, limit, page } = req.body;
        if (!categoryId || !subCategoryId) {
            return next(new AppError_1.default("Invalid parameters: categoryId and subCategoryId are required", 400));
        }
        limit = Number(limit) || 10;
        page = Number(page) || 1;
        const skip = (page - 1) * limit;
        const category = yield category_entity_1.Category.findOne({
            where: { id: Number(categoryId) },
        });
        const subCategory = yield subCategory_entity_1.SubCategory.findOne({
            where: { id: Number(subCategoryId) },
        });
        if (!category || !subCategory) {
            return next(new AppError_1.default(!category ? "Category not found" : "SubCategory not found", 404));
        }
        const [products, totalCount] = yield Promise.all([
            product_entity_1.Product.find({
                where: {
                    category: { id: Number(categoryId) },
                    subCategory: { id: Number(subCategoryId) },
                },
                skip,
                take: limit,
            }),
            product_entity_1.Product.count({
                where: {
                    category: { id: Number(categoryId) },
                    subCategory: { id: Number(subCategoryId) },
                },
            }),
        ]);
        if (!products.length) {
            return next(new AppError_1.default("No products found for the given category and subcategory", 404));
        }
        res.status(200).json({
            success: true,
            data: products,
            page,
            limit,
            totalCount,
        });
    }
    catch (error) {
        console.error("Error in getProductByCategoryAndSubcategory:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const getProductDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.body;
        if (!productId) {
            return next(new AppError_1.default("Invalid category ID", 400));
        }
        const product = yield product_entity_1.Product.findOne({
            where: { id: +productId },
        });
        if (!product) {
            return next(new AppError_1.default("not found", 404));
        }
        res.status(200).json({ success: true, product });
    }
    catch (error) {
        console.error("Error in getProductByCategory:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const productEdit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.body;
        const { name, image, price, stock, unit, discount, description, category, subCategory, } = req.body.uploadProductData;
        if (!productId)
            return next(new AppError_1.default("Invalid parameter", 400));
        // Mövcud məhsulu yoxla
        const existProduct = yield product_entity_1.Product.findOne({ where: { id: +productId } });
        if (!existProduct)
            return next(new AppError_1.default("Product not found", 404));
        // Kateqoriya və alt kateqoriyanı tap
        const findCategory = category
            ? yield category_entity_1.Category.findBy({ id: (0, typeorm_1.In)(category) })
            : null;
        if (category && !findCategory)
            return next(new AppError_1.default("Category not found", 404));
        const findSubCategory = subCategory
            ? yield subCategory_entity_1.SubCategory.findBy({ id: (0, typeorm_1.In)(subCategory) })
            : null;
        if (subCategory && !findSubCategory)
            return next(new AppError_1.default("SubCategory not found", 404));
        // Məhsulu yenilə
        Object.assign(existProduct, {
            name: name || existProduct.name,
            price: price ? +price : existProduct.price,
            stock: stock ? +stock : existProduct.stock,
            unit: unit || existProduct.unit,
            discount: discount ? +discount : existProduct.discount,
            description: description || existProduct.description,
            image: image || existProduct.image,
            category: findCategory || existProduct.category,
            subCategory: findSubCategory || existProduct.subCategory,
        });
        yield existProduct.save();
        res
            .status(200)
            .json({ success: true, message: "Product updated successfully" });
    }
    catch (error) {
        console.error("Error in productEdit:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.body;
        if (!productId)
            return next(new AppError_1.default("Invalid parameter", 400));
        const product = yield product_entity_1.Product.findOne({ where: { id: +productId } });
        if (!product)
            return next(new AppError_1.default("Product not found", 404));
        yield product.remove();
        res
            .status(200)
            .json({ success: true, message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error in deleteProduct:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const searchProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { search, limit, page } = req.body;
        limit = parseInt(limit, 10) || 12;
        page = parseInt(page, 10) || 1;
        const skip = (page - 1) * limit;
        const whereCondition = search ? { name: (0, typeorm_1.ILike)(`%${search}%`) } : {};
        const [products, totalCount] = yield Promise.all([
            product_entity_1.Product.find({
                where: whereCondition,
                skip,
                take: limit,
            }),
            product_entity_1.Product.count({
                where: whereCondition,
            }),
        ]);
        res.status(200).json({
            success: true,
            data: products || [],
            page,
            limit,
            totalCount: totalCount || 0,
            totalPage: Math.max(1, Math.ceil((totalCount || 0) / limit)),
        });
    }
    catch (error) {
        console.error("Error in searchProduct:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const productController = () => {
    return {
        productCreate,
        getProduct,
        getProductByCategory,
        getProductByCategoryAndSubcategory,
        getProductDetails,
        productEdit,
        searchProduct,
        deleteProduct,
    };
};
exports.productController = productController;
//# sourceMappingURL=product.controller.js.map