import { NextFunction, Request, Response } from "express";
import AppError from "../../Utility/AppError";
import { Product } from "../../DAL/Entities/product.entity";
import { In } from "typeorm";
import { Addreses } from "../../DAL/Entities/adress.entity";
import { Order } from "../../DAL/Entities/order.entity";
import { v4 as uuidv4 } from "uuid";
import { CartProduct } from "../../DAL/Entities/cartProduct.entity";

const cashOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { list_items, addressId, subTotalAmt, totalAmt } = req.body;

    const user = req.user;

    if (!user) {
      return next(new AppError("User not found", 404));
    }
    if (!addressId) {
      return next(new AppError("Address are valuable", 400));
    }

    const existProducts = await Product.findBy({
      id: In(list_items.map((item: any) => item.product.id)),
    });

    if (!existProducts.length) {
      return next(new AppError("Products not found", 404));
    }

    const existAddress = await Addreses.findOne({
      where: {
        user: { id: user.id },
        id: +addressId,
      },
    });

    if (!existAddress) {
      return next(new AppError("Address not found", 404));
    }

    const newOrder = new Order();
    newOrder.user = user;
    newOrder.orderId = uuidv4();
    newOrder.product = existProducts;
    newOrder.delivery_address = existAddress;
    newOrder.totalAmt = totalAmt;
    newOrder.subTotalAmt = subTotalAmt;
    newOrder.payment_status = "Cash on delivery";

    await newOrder.save();

    await CartProduct.delete({ user: user });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    next(new AppError("Internal server error", 500));
  }
};

const getOrderDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const orders = await Order.find({
      where: {
        user: {
          id: user?.id,
        },
      },
      relations: {
        product: true,
      },
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error processing order:", error);
    next(new AppError("Internal server error", 500));
  }
};

export const orderController = () => {
  return { cashOrder, getOrderDetails };
};
