import { NextFunction, Request, Response } from "express";
import AppError from "../../Utility/AppError";
import { CartProduct } from "../../DAL/Entities/cartProduct.entity";
import { Product } from "../../DAL/Entities/product.entity";
import { User } from "../../DAL/Entities/user.entity";

const addCardItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user?.id) {
      return next(new AppError("Unauthorized access", 401));
    }

    const existUser = await User.findOne({ where: { id: user.id } });
    if (!existUser) {
      return next(new AppError("User not found", 404));
    }

    const { productId } = req.body;
    if (!productId || isNaN(Number(productId))) {
      return next(new AppError("Invalid product ID", 400));
    }

    const existProduct = await Product.findOne({
      where: { id: Number(productId) },
    });
    if (!existProduct) {
      return next(new AppError("Product not found", 404));
    }

    const existCart = await CartProduct.findOne({
      where: {
        user: { id: existUser.id },
        product: { id: existProduct.id },
      },
    });

    if (existCart) {
      existCart.quantity += 1;
      await existCart.save();
      res.status(200).json({
        message: "Product quantity updated in cart",
        success: true,
        cartItem: existCart,
      });
      return;
    }

    const newCartItem = new CartProduct();
    newCartItem.product = existProduct;
    newCartItem.quantity = 1;
    newCartItem.user = existUser;

    await newCartItem.save();
    res.status(201).json({
      message: "Product added to cart",
      success: true,
      cartItem: newCartItem,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    next(new AppError("Internal server error", 500));
  }
};

const getCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const carts = await CartProduct.find({
      where: {
        user: { id: user?.id },
      },
      relations: {
        product: true,
      },
    });

    res.status(200).json({
      success: true,
      data: carts,
    });
  } catch (error) {
    console.error("Error getting cart items:", error);
    next(new AppError("Internal server error", 500));
  }
};

const updateCartItemQuantityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  try {
    const user = req.user;
    if (!user?.id) {
      return next(new AppError("Unauthorized access", 401));
    }

    const { productId, quantity } = req.body;

    if (
      !productId ||
      isNaN(Number(productId)) ||
      !quantity ||
      isNaN(Number(quantity))
    ) {
      return next(new AppError("Invalid product ID or quantity", 400));
    }

    const existUser = await User.findOne({ where: { id: user.id } });
    if (!existUser) {
      return next(new AppError("User not found", 404));
    }

    const existProduct = await Product.findOne({
      where: { id: Number(productId) },
    });
    if (!existProduct) {
      return next(new AppError("Product not found", 404));
    }

    const existCart = await CartProduct.findOne({
      where: {
        user: { id: existUser.id },
        product: { id: existProduct.id },
      },
    });

    if (!existCart) {
      return next(new AppError("Product not found in cart", 404));
    }

    existCart.quantity = quantity;
    await existCart.save();

    res.status(200).json({
      message: "Product quantity updated",
      success: true,
      cartItem: existCart,
    });
  } catch (error) {
    console.error("Error updating item quantity:", error);
    next(new AppError("Internal server error", 500));
  }
};

const deleteCartItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user?.id) {
      return next(new AppError("Unauthorized access", 401));
    }

    const { productId } = req.body;

    if (!productId || isNaN(Number(productId))) {
      return next(new AppError("Invalid product ID", 400));
    }

    const existUser = await User.findOne({ where: { id: user.id } });
    if (!existUser) {
      return next(new AppError("User not found", 404));
    }

    const existProduct = await Product.findOne({
      where: { id: Number(productId) },
    });
    if (!existProduct) {
      return next(new AppError("Product not found", 404));
    }

    const existCart = await CartProduct.findOne({
      where: {
        user: { id: existUser.id },
        product: { id: existProduct.id },
      },
    });

    if (!existCart) {
      return next(new AppError("Product not found in cart", 404));
    }

    await existCart.remove();

    res.status(200).json({
      message: "Product removed from cart",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    next(new AppError("Internal server error", 500));
  }
};

export const cartController = () => {
  return {
    addCardItemController,
    getCartController,
    updateCartItemQuantityController,
    deleteCartItemController,
  };
};
