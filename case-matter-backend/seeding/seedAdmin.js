import bcrypt from "bcryptjs";
import Admin from "../models/admin.js";

const seedAdmin = async () => {
  try {
    // check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    // password hash karo
    const hashedPassword = await bcrypt.hash("123456", 10);

    // admin create karo
    await Admin.create({
      name: "Super Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      isAdmin: true,
    });

    console.log("🔥 Admin seeded successfully");
  } catch (error) {
    console.log("❌ Error seeding admin:", error.message);
  }
};

export default seedAdmin;