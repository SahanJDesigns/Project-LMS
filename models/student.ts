import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  progress: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // References the Course schema
        required: true,
      },
      lessonsCompleted: {
        type: Number,
        default: 0,
      },
      quizzesCompleted: {
        type: Number,
        default: 0,
      },
      completionPercentage: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields.

export default mongoose.models.Student || mongoose.model('Student', studentSchema);
