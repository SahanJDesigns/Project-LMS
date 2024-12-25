import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  resourceId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['Video', 'Document', 'Link', 'PDF'], required: true },
  url: { type: String, required: true },
  description: { type: String },
  relatedCourseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  relatedLessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Resource || mongoose.model('Resource', resourceSchema);