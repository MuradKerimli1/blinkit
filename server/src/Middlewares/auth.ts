import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { helper } from "../DAL/Config/helper";
import { User } from "../DAL/Entities/user.entity";
import AppError from "../Utility/AppError";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return next(new AppError("Invalid token", 401));
    }

    const decode = jwt.verify(token, helper.secret_key_access) as {
      sub: string;
    };
    if (!decode) {
      return next(new AppError("Invalid token", 401));
    }

    const existUser = await User.findOne({ where: { id: +decode.sub } });

    if (!existUser) {
      return next(new AppError("User not found", 404));
    }

    req.user = existUser;

    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    next(new AppError("Internal server error", 500));
  }
};
