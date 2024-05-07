import express from "express";
import formidable from 'express-formidable'
const router = express.Router()

//controllers
import { addProduct, updateProductDetails, removeProduct, fetchProducts, fetchProductsById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts } from "../controllers/productController.js"

import { authenticate, authorizedAdmin } from "../middlewares/authMiddleware.js"
import checkId from "../middlewares/checkId.js";

router.route("/").get(fetchProducts).post(authenticate, authorizedAdmin, formidable(), addProduct)
router.route("/allproducts").get(fetchAllProducts)
router.route("/:id/reviews").post(authenticate, authorizedAdmin, addProductReview)
router.get("/top", fetchTopProducts)
router.get("/new", fetchNewProducts)
router.route("/:id").put(authenticate, authorizedAdmin, formidable(), updateProductDetails);
router.route("/:id").get(fetchProductsById).delete(authenticate, authorizedAdmin, removeProduct)
router.route("/filtered-products").post(filterProducts)







export default router