import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  quizId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);