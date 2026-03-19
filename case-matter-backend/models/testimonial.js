import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  companyName: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a star rating'],
    min: 1,
    max: 5,
    default: 5
  },
  description: {
    type: String,
    required: [true, 'Please provide a review description'],
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const testimonial = mongoose.model('testimonial', testimonialSchema);

export default testimonial;