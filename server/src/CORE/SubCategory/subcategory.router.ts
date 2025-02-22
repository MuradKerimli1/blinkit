import express from "express";
import { subCategoryController } from "./subcategory.controller";
import { auth } from "../../Middlewares/auth";
import adminMiddleware from "../../Middlewares/isAdmin";
export const subCategoryRouter = express.Router();
const controller = subCategoryController();

subCategoryRouter.post(
  "/create",
  auth,
  adminMiddleware,
  controller.createSubCategory
);
subCategoryRouter.get("/get", controller.getSubCategory);
subCategoryRouter.put(
  "/edit",
  auth,
  adminMiddleware,
  controller.editSubCategory
);
// subCategoryRouter.put("/edit", controller.editSubCategory);

subCategoryRouter.delete(
  "/delete",
  auth,
  adminMiddleware,
  controller.deleteSubCategory
);
