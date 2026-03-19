import express from "express";
import {
  loginAdmin,
  logoutAdmin,
  getMeAdmin,
  getAllUsers,
} from "../controllers/adminAuthController.js";
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "../controllers/testimonialController.js";
import { verifyToken, isAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/admin-dashboard", verifyToken, isAdmin, getMeAdmin);
router.get("/all-users", verifyToken, isAdmin, getAllUsers);

// testimonial routes//
router.get('/all-testimonials', getAllTestimonials);
// Admin protected routes (Dashbord logic)
router.post('/create-testimonial',verifyToken, isAdmin, createTestimonial);
router.put('/update-testimonial/:id',verifyToken, isAdmin, updateTestimonial);
router.delete('/delete-testimonial/:id',verifyToken, isAdmin, deleteTestimonial);

export default router;