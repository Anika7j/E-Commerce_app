import express from "express";
import { authenticateUser, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { categoryList, createCategory,deleteCategory,getCategory,updateCategory } from "../controllers/categoryController.js";



const router = express.Router();

router.route('/').post(authenticateUser, authorizeAdmin, createCategory)
router.route('/:Id').put(authenticateUser,authorizeAdmin,updateCategory)

router.route('/:Id').delete(authenticateUser,authorizeAdmin,deleteCategory)

router.route('/categories').get(authenticateUser,authorizeAdmin,categoryList)

router.route('/getcategory/:Id').get(authenticateUser,authorizeAdmin,getCategory)

export default router;