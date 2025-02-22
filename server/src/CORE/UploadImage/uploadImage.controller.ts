import { NextFunction, Request, Response } from "express";
import AppError from "../../Utility/AppError";

const uploadImageController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    res.status(200).json({
      file: file,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError("server xetasi", 500));
  }
};

export default uploadImageController;
