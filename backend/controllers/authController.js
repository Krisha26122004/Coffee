import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const token = (id) => jwt.sign({ id }, process.env.JWT_SECRET || "brewnest_super_secret_key", { expiresIn: "30d" });
const publicUser = (u) => ({ _id: u._id, name: u.name, email: u.email, role: u.role });

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: "Email already exists" });
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
  res.status(201).json({ user: publicUser(user), token: token(user._id) });
}
export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ user: publicUser(user), token: token(user._id) });
}
export async function profile(req, res) { res.json(req.user); }
