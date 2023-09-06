import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "../controllers/ProductController.js";
import { verifyUser } from "../middleware/AuthUser.js";
import {
  errorMulter,
  handleErrorUpload,
  upload,
} from "../middleware/ImageValidate.js";

const router = express.Router();

const routeProduct = (app) => {
  router.get("/", getProduct);
  router.get("/:id", getProductById);
  router.post("/", upload.single("image"), errorMulter, createProduct);
  router.delete("/:id", deleteProduct);
  router.patch(
    "/:id",
    upload.single("image"),
    errorMulter,
    handleErrorUpload,
    updateProduct
  );

  app.use("/product", verifyUser, router);
};

export { routeProduct };
