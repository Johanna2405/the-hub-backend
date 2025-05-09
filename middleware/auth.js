import jwt from "jsonwebtoken";
import models from "../models/index.js";

const { User } = models;

const auth = async (req, res, next) => {
  // Token Extraction
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Token Validation
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    // User Fetching
    req.user = await User.findByPk(decoded.id);
    // Error Handling
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default auth;
