import express from "express";
import formidable from 'express-formidable'
import { authenticateUser,authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

import { addProduct,
    updateProduct,
    deleteproduct,
    allProducts,
    getProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    newProducts
 } from "../controllers/productController.js";

const router = express.Router()

router.route('/').get(allProducts).post(authenticateUser,authorizeAdmin, formidable(), addProduct)
router.route('/:id').get(getProductById).put(authenticateUser,authorizeAdmin,formidable(),updateProduct).delete(authenticateUser,authorizeAdmin,deleteproduct)

router.route('/allproducts').get(fetchAllProducts)
router.route('/:id/reviews').post(authenticateUser,authorizeAdmin,addProductReview)


router.get('/top',fetchTopProducts)
router.get('/new',newProducts)


export default router;



