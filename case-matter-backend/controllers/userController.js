import User from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    // ✅ CHECK ALL FIELDS
    if (!name || !phone || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ CHECK IF EMAIL ALREADY EXISTS (optional but recommended)
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // ✅ CREATE USER
    const user = await User.create({
      name,
      phone,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};