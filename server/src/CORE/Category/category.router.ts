import express from "express";
import { categoryController } from "./category.controller";
import { auth } from "../../Middlewares/auth";
import adminMiddleware from "../../Middlewares/isAdmin";

export const categoryRouter = express.Router();
const controller = categoryController();

categoryRouter.post(
  "/create",
  auth,
  adminMiddleware,
  controller.categoryCreate
);
categoryRouter.get(
  "/getCategory",

  controller.getCategory
);

categoryRouter.put(
  "/editCategory",
  auth,
  adminMiddleware,
  controller.categoryEdit
);
categoryRouter.delete(
  "/deleteCategory",
  auth,
  adminMiddleware,
  controller.deleteCategory
);
