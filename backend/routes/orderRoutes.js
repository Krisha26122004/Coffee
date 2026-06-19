import express from "express";
import { createOrder, myOrders, createRazorpayOrder, verifyRazorpayPayment } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/create", protect, createOrder);
router.get("/myorders", protect, myOrders);
router.post("/razorpay", protect, createRazorpayOrder);
router.post("/verify", protect, verifyRazorpayPayment);
export default router;
