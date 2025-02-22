import { NextFunction, Request, Response } from "express";
import AppError from "../../Utility/AppError";
import { Product } from "../../DAL/Entities/product.entity";
import { validate } from "class-validator";
import { Category } from "../../DAL/Entities/category.entity";
import { ILike, In } from "typeorm";
import { SubCategory } from "../../DAL/Entities/subCategory.entity";

const productCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existCategories = await Category.findBy({
      id: In(req.body.category),
    });
    if (!existCategories) {
      return next(new AppError("Category not found", 404));
    }

    const existSubCategories = await SubCategory.findBy({
      id: In(req.body.subCategory),
    });
    if (!existSubCategories) {
      return next(new AppError("SubCategory not found", 404));
    }

    const newProduct = new Product();
    newProduct.name = req.body.name;
    newProduct.price = +req.body.price;
    newProduct.stock = +req.body.stock;
    newProduct.unit = req.body.unit;
    newProduct.discount = +req.body.discount;
    newProduct.description = req.body.description;
    newProduct.image = req.body.image;
    newProduct.category = existCategories;
    newProduct.subCategory = existSubCategories;

    const validator = await validate(newProduct);
    if (validator.length > 0) {
      return next(new AppError("Validation error", 400));
    }

    await newProduct.save();
    res.status(201).json({ message: "Product created", success: true });
  } catch (error) {
    console.error("Error during productCreate:", error);
    next(new AppError("Internal server error", 500));
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { page, limit, search } = req.body;

    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const skip: number = (page - 1) * limit;

    const whereCondition = search ? { name: ILike(`%${search}%`) } : {};

    const totalCount = await Product.count({ where: whereCondition });

    const product = await Product.find({
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
  } catch (error) {
    console.log("Error during getProduct:", error);
    next(new AppError("Internal server error", 500));
  }
};

const getProductByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId, limit } = req.body;

    const products = await Product.find({
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
  } catch (error) {
    console.log("Error during getProduct:", error);
    next(new AppError("Internal server error", 500));
  }
};

const getProductByCategoryAndSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { categoryId, subCategoryId, limit, page } = req.body;

    if (!categoryId || !subCategoryId) {
      return next(
        new AppError(
          "Invalid parameters: categoryId and subCategoryId are required",
          400
        )
      );
    }

    limit = Number(limit) || 10;
    page = Number(page) || 1;
    const skip = (page - 1) * limit;

    const category = await Category.findOne({
      where: { id: Number(categoryId) },
    });
    const subCategory = await SubCategory.findOne({
      where: { id: Number(subCategoryId) },
    });

    if (!category || !subCategory) {
      return next(
        new AppError(
          !category ? "Category not found" : "SubCategory not found",
          404
        )
      );
    }

    const [products, totalCount] = await Promise.all([
      Product.find({
        where: {
          category: { id: Number(categoryId) },
          subCategory: { id: Number(subCategoryId) },
        },
        skip,
        take: limit,
      }),
      Product.count({
        where: {
          category: { id: Number(categoryId) },
          subCategory: { id: Number(subCategoryId) },
        },
      }),
    ]);

    if (!products.length) {
      return next(
        new AppError(
          "No products found for the given category and subcategory",
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      data: products,
      page,
      limit,
      totalCount,
    });
  } catch (error) {
    console.error("Error in getProductByCategoryAndSubcategory:", error);
    next(new AppError("Internal server error", 500));
  }
};

const getProductDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return next(new AppError("Invalid category ID", 400));
    }

    const product = await Product.findOne({
      where: { id: +productId },
    });

    if (!product) {
      return next(new AppError("not found", 404));
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error in getProductByCategory:", error);
    next(new AppError("Internal server error", 500));
  }
};

const productEdit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.body;
    const {
      name,
      image,
      price,
      stock,
      unit,
      discount,
      description,
      category,
      subCategory,
    } = req.body.uploadProductData;

    if (!productId) return next(new AppError("Invalid parameter", 400));

    // Mövcud məhsulu yoxla
    const existProduct = await Product.findOne({ where: { id: +productId } });
    if (!existProduct) return next(new AppError("Product not found", 404));

    // Kateqoriya və alt kateqoriyanı tap
    const findCategory = category
      ? await Category.findBy({ id: In(category) })
      : null;
    if (category && !findCategory)
      return next(new AppError("Category not found", 404));

    const findSubCategory = subCategory
      ? await SubCategory.findBy({ id: In(subCategory) })
      : null;
    if (subCategory && !findSubCategory)
      return next(new AppError("SubCategory not found", 404));

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

    await existProduct.save();
    res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("Error in productEdit:", error);
    next(new AppError("Internal server error", 500));
  }
};
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.body;
    if (!productId) return next(new AppError("Invalid parameter", 400));

    const product = await Product.findOne({ where: { id: +productId } });
    if (!product) return next(new AppError("Product not found", 404));

    await product.remove();
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    next(new AppError("Internal server error", 500));
  }
};

const searchProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { search, limit, page } = req.body;

    limit = parseInt(limit, 10) || 12;
    page = parseInt(page, 10) || 1;
    const skip = (page - 1) * limit;

    const whereCondition = search ? { name: ILike(`%${search}%`) } : {};

    const [products, totalCount] = await Promise.all([
      Product.find({
        where: whereCondition,
        skip,
        take: limit,
      }),
      Product.count({
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
  } catch (error) {
    console.error("Error in searchProduct:", error);
    next(new AppError("Internal server error", 500));
  }
};



export const productController = () => {
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
