import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
  instructorId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Instructor || mongoose.model('Instructor', instructorSchema);