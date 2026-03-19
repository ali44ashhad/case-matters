import express from "express";
import {
  loginAdmin,
  logoutAdmin,
  getMeAdmin,
  getAllUsers,
} from "../controllers/adminAuthController.js";

import { verifyToken, isAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/admin-dashboard", verifyToken, isAdmin, getMeAdmin);
router.get("/all-users", verifyToken, isAdmin, getAllUsers);

export default router;