import express from "express";
const router = express.Router();

import { calculateTotalSales, calculateTotalSalesByDate, countTotalOrders, createOrder, findOrderById, getAllOrders, getUserOrders, markOrderAsDelivered, markOrderAsPaid } from "../controllers/orderController.js";

import {authenticateUser, authorizeAdmin} from  "../middlewares/authMiddleware.js"


router.route("/").post(authenticateUser,createOrder).get(authenticateUser,authorizeAdmin,getAllOrders);

router.route("/mine").get(authenticateUser,getUserOrders);
router.route("/total-orders").get(countTotalOrders)
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authenticateUser, findOrderById);
router.route("/:id/pay").put(authenticateUser, markOrderAsPaid);
router.route("/:id/deliver").put(authenticateUser, authorizeAdmin, markOrderAsDelivered);



export default router;

