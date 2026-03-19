import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Admin.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    console.log(error);
  }
};

/* ADMIN CHECK */
export const isAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Admin only access" });
  }
};