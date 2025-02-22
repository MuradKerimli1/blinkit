import { NextFunction, Request, Response } from "express";
import AppError from "../../Utility/AppError";
import { Addreses } from "../../DAL/Entities/adress.entity";
import { User } from "../../DAL/Entities/user.entity";
import { Order } from "../../DAL/Entities/order.entity";

const createAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

    const user = req.user;

    const { address_line, city, state, pincode, country, mobile } = req.body;

    const existUser = await User.findOne({ where: { id: user?.id } });
    if (!existUser) {
      return next(new AppError("user not found", 404));
    }

    const newAddress = new Addreses();
    newAddress.address_line = address_line;
    newAddress.city = city;
    newAddress.state = state;
    newAddress.pincode = pincode;
    newAddress.country = country;
    newAddress.mobile = mobile;
    newAddress.user = existUser;

    await newAddress.save();
    res.status(200).json({ message: "address elave edildi", success: true });
  } catch (error) {
    console.error("Error updating category:", error);
    next(new AppError("Internal server error", 500));
  }
};
const getAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new AppError("User not authenticated", 401));
    }

    // "await" əlavə edildi
    const existAddress = await Addreses.find({
      where: { user: { id: user.id } },
    });

    res.status(200).json({
      data: existAddress,
      success: true,
      message: "List of addresses",
    });
  } catch (error) {
    console.error("Error fetching address:", error);
    next(new AppError("Internal server error", 500));
  }
};
const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new AppError("User not authenticated", 401));
    }
    const { id, address_line, city, mobile, state, country, pincode } =
      req.body;

    // exist addreess
    const existAddress = await Addreses.findOne({
      where: {
        id: +id,
        user: {
          id: user?.id,
        },
      },
    });
    if (!existAddress) {
      return next(new AppError("address not found", 404));
    }

    Object.assign(existAddress, {
      address_line: address_line ?? existAddress.address_line,
      city: city ?? existAddress.city,
      mobile: mobile ?? existAddress.mobile,
      state: state ?? existAddress.state,
      country: country ?? existAddress.country,
      pincode: pincode ?? existAddress.pincode,
    });
    await existAddress.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address: existAddress,
    });
  } catch (error) {
    console.error("Error fetching address:", error);
    next(new AppError("Internal server error", 500));
  }
};
const deleteAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

    const user = req.user;

    // Kullanıcı doğrulaması
    if (!user) {
      return next(new AppError("User not authenticated", 401));
    }

    const { id } = req.body;

    // Adres ID kontrolü
    if (!id) {
      return next(new AppError("Address ID is required", 400));
    }

    // Kullanıcıya ait adresi bul
    const existAddress = await Addreses.findOne({
      where: {
        id: +id,
        user: {
          id: user.id,
        },
      },
    });

    if (!existAddress) {
      return next(new AppError("Address not found", 404));
    }

    // Order tablosundaki tüm referansları güncelle
    await Order.update(
      { delivery_address: id }, 
      { delivery_address: null }  
    );

    // Adresi sil
    await existAddress.remove();

    // Başarı yanıtı
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    next(new AppError("Internal server error", 500));
  }
};


export const addressController = () => {
  return { createAddress, getAddress, updateAddress, deleteAddress };
};
