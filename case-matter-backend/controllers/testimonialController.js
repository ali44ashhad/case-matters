import Testimonial from "../models/testimonial.js";
import mongoose from "mongoose";

/* ================= CREATE ================= */
export const createTestimonial = async (req, res) => {
  try {
    const { name, companyName, rating, description } = req.body;

    // ✅ Validation
    if (!name || !rating || !description) {
      return res.status(400).json({
        success: false,
        message: "Name, rating, and description are required",
      });
    }

    const newTestimonial = new Testimonial({
      name,
      companyName,
      rating,
      description,
    });

    const savedTestimonial = await newTestimonial.save();

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: savedTestimonial,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= GET ALL ================= */
export const getAllTestimonials = async (req, res) => {
  try {
    // If DB isn't connected (common on misconfigured deploys), fail fast with a clear status.
    // readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database not connected. Please try again shortly.",
      });
    }

    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= UPDATE ================= */
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { $set: updatedData },
      {
        returnDocument: "after", // ✅ FIXED (no warning)
        runValidators: true,
      }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= DELETE ================= */
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};