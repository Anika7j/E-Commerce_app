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
    newProducts,
    filterProducts
 } from "../controllers/productController.js";

const router = express.Router()

router.route('/').get(allProducts).post(authenticateUser,authorizeAdmin, formidable(), addProduct)
router.route('/allproducts').get(fetchAllProducts)

router.get('/top',fetchTopProducts)
router.get('/new',newProducts)


router.route('/filtered-products').post(filterProducts)

router.route('/:id/reviews').post(authenticateUser,checkId,addProductReview)
router.route('/:id').get(getProductById).put(authenticateUser,authorizeAdmin,formidable(),updateProduct).delete(authenticateUser,authorizeAdmin,deleteproduct)




export default router;



