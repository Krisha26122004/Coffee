import mongoose from "mongoose";

const coffeeBoxSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coffeeType: { type: String, required: true },
  mugType: { type: String, required: true },
  addons: [{ type: String }],
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("CoffeeBox", coffeeBoxSchema);
