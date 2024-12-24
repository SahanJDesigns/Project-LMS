import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  progress: { type: Map, of: Number },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  submittedAssignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', studentSchema);