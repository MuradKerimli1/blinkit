import { NextFunction, Request, Response } from "express";
import AppError from "../../Utility/AppError";
import { validate } from "class-validator";
import { SubCategory } from "../../DAL/Entities/subCategory.entity";
import { Category } from "../../DAL/Entities/category.entity";

const createSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, image, categoryId } = req.body;
    if (!name || !image || !categoryId) {
      return next(new AppError("invalid parametrs", 400));
    }

    // find category
    const category = await Category.findOne({ where: { id: +categoryId } });
    if (!category) {
      return next(new AppError("category not found", 404));
    }

    const newSubCategory = new SubCategory();
    newSubCategory.name = name;
    newSubCategory.image = image;
    newSubCategory.category = category;

    const handleError = await validate(newSubCategory);

    if (handleError.length > 0) {
      return next(
        new AppError(
          handleError
            .map((item) => {
              const constraints = item.constraints || {};
              return Object.values(constraints).join(", ");
            })
            .join("\n"),
          400
        )
      );
    }

    await newSubCategory.save();
    res
      .status(201)
      .json({ message: "subcategory elave edildi", success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    next(new AppError("Internal server error", 500));
  }
};

const getSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subCategory = await SubCategory.find({
      relations: {
        category: true,
      },
    });
    res.status(200).json({
      message: "subcategoires fetch sucessfuly",
      success: true,
      data: subCategory,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    next(new AppError("Internal server error", 500));
  }
};
const editSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subCategoryid, name, image, categoryId } = req.body;

    if (!subCategoryid) {
      return next(
        new AppError("Invalid parameters: subCategoryid is required", 400)
      );
    }

    const existSubCategory = await SubCategory.findOne({
      where: { id: +subCategoryid },
    });
    if (!existSubCategory) {
      return next(new AppError("Subcategory not found", 404));
    }

    if (categoryId) {
      const category = await Category.findOne({
        where: { id: +categoryId },
      });

      if (!category) {
        return next(new AppError("Category not found", 404));
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

    const handleError = await validate(existSubCategory);

    if (handleError.length > 0) {
      return next(
        new AppError(
          handleError
            .map((item) => {
              const constraints = item.constraints || {};
              return Object.values(constraints).join(", ");
            })
            .join("\n"),
          400
        )
      );
    }

    await existSubCategory.save();

    res.status(200).json({ message: "Subcategory updated", success: true });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    next(new AppError("Internal server error", 500));
  }
};
const deleteSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subCategoryid } = req.body;
    console.log(subCategoryid, "salam");
    if (!subCategoryid) {
      return next(
        new AppError("Invalid parameters: subCategoryid is required", 400)
      );
    }
    const existSubCategory = await SubCategory.findOne({
      where: { id: +subCategoryid },
    });
    if (!existSubCategory) {
      return next(new AppError("Subcategory not found", 404));
    }

    await existSubCategory.remove();
    res.status(200).json({ message: "Subcategory deleted", success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    next(new AppError("Internal server error", 500));
  }
};
export const subCategoryController = () => {
  return {
    createSubCategory,
    getSubCategory,
    editSubCategory,
    deleteSubCategory,
  };
};

