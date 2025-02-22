import { NextFunction, Request, Response } from "express";
import AppError from "../../Utility/AppError";
import { Category } from "../../DAL/Entities/category.entity";
import { validate } from "class-validator";

const categoryCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return next(new AppError("name and image are required", 400));
    }
    const category = new Category();
    category.name = name;
    category.image = image;

    const handleError = await validate(category);

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

    await category.save();

    res.status(201).json({ message: "category elave edildi", success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    next(new AppError("Internal server error", 500));
  }
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.find({
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
  } catch (error) {
    console.error("Error updating user:", error);
    next(new AppError("Internal server error", 500));
  }
};
const categoryEdit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

    const { categoryId, name, image } = req.body;

    const updateData: Partial<Category> = {};
    if (name) updateData.name = name;
    if (image) updateData.image = image;

    const result = await Category.update({ id: +categoryId }, updateData);

    if (result.affected === 0) {
      return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);
    next(new AppError("Internal server error", 500));
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return next(new AppError("categoryId invalid", 400));
    }
    const category = await Category.findOne({ where: { id: +categoryId } });
    if (!category) {
      return next(new AppError("category not found", 404));
    }

    await category.remove();
    
    res.status(200).json({ message: "category deleted", success: true });
  } catch (error) {
    console.error("Error updating category:", error);
    next(new AppError("Internal server error", 500));
  }
};

export const categoryController = () => {
  return { categoryCreate, getCategory, categoryEdit, deleteCategory };
};
