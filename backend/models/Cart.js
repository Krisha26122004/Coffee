import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, name: String, quantity: Number, price: Number, image: String }],
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
