import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ name: String, product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: Number, price: Number, image: String, category: String, box: Object }],
  shippingAddress: { name: String, address: String, phone: String },
  paymentMethod: { type: String, required: true },
  orderStatus: { type: String, default: "Processing" },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
