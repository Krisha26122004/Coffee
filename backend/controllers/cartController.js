import Cart from "../models/Cart.js";

export async function addToCart(req, res) {
  const { product, name, quantity = 1, price, image } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
  const item = cart.items.find((i) => String(i.product) === String(product));
  if (item) item.quantity += quantity; else cart.items.push({ product, name, quantity, price, image });
  await cart.save(); res.json(cart);
}
export const getCart = async (req, res) => res.json(await Cart.findOne({ user: req.user._id }).populate("items.product") || { items: [] });
export async function updateCart(req, res) {
  const cart = await Cart.findOne({ user: req.user._id });
  const item = cart?.items.id(req.body.itemId);
  if (item) item.quantity = req.body.quantity;
  await cart?.save(); res.json(cart);
}
export async function removeFromCart(req, res) {
  const cart = await Cart.findOne({ user: req.user._id });
  if (cart) cart.items = cart.items.filter((i) => String(i._id) !== req.params.id);
  await cart?.save(); res.json(cart || { items: [] });
}
