import mongoose from 'mongoose';
import Lesson from "./lesson"


const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  duration: {
    hours: { type: Number, required: true },
    weeks: { type: Number, required: true },
  },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  rating: {
    average: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
  },
  instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  language: { type: String, required: true },
  introduction: { type: String, required: true },
  certification: { type: Boolean, default: false },
  instructorExperience: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
