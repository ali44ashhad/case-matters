import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


/* ================= GENERATE TOKEN ================= */
const generateToken = (id) => {
  return jwt.sign({ id, isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* ================= LOGIN ADMIN ================= */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // TEMP default (optional)
    const loginEmail = email || "admin123@gmail.com";
    const loginPassword = password || "Admin@123";

    const admin = await Admin.findOne({ email: loginEmail }).select("+password");

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(loginPassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(admin._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // 👉 "none" only with HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= LOGOUT ================= */

export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: "lax",
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET CURRENT ADMIN ================= */
export const getMeAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // .find({}) ka matlab hai saare records le aao
    // .sort({ createdAt: -1 }) se naye submissions sabse upar dikhenge
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Users fetch karne mein dikkat aayi",
      error: error.message,
    });
  }
};