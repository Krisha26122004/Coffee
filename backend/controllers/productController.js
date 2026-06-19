import Product from "../models/Product.js";

export const getProducts = async (req, res) => res.json(await Product.find().sort("-createdAt"));
export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product ? res.json(product) : res.status(404).json({ message: "Product not found" });
};
export const createProduct = async (req, res) => res.status(201).json(await Product.create(req.body));
export const updateProduct = async (req, res) => res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }));
export const deleteProduct = async (req, res) => { await Product.findByIdAndDelete(req.params.id); res.json({ message: "Product deleted" }); };
