import CoffeeBox from "../models/CoffeeBox.js";

export async function createCoffeeBox(req, res) {
  const box = await CoffeeBox.create({ user: req.user._id, ...req.body });
  res.status(201).json(box);
}
export const coffeeBoxHistory = async (req, res) => res.json(await CoffeeBox.find({ user: req.user._id }).sort("-createdAt"));
