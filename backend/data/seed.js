import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import products from "./products.js";

dotenv.config({ path: "./backend/.env" });
await connectDB();
await Product.deleteMany();
await Product.insertMany(products);
console.log("BrewNest products seeded");
process.exit();
