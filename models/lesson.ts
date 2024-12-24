import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  lessonId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);