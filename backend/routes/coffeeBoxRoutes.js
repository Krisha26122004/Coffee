import express from "express";
import { coffeeBoxHistory, createCoffeeBox } from "../controllers/coffeeBoxController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/create", protect, createCoffeeBox);
router.get("/history", protect, coffeeBoxHistory);
export default router;
