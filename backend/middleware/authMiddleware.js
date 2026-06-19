import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Not authorized" });
  try {
    const decoded = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET || "brewnest_super_secret_key");
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
