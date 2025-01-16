import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    scheduleId: {
      type: String,
      required: true,
      unique: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    items: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course',
          required: true,
        },
        lessons: [
          {
            lesson: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Lesson',
              required: true,
            },
            date: {
              type: Date,
              required: true,
            },
            status: {
              type: String,
              enum: ['Pending', 'Completed', 'Skipped'],
              default: 'Pending',
            },
          },
        ],
      },
    ],
    notes: {
      type: String, 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
});
  
export default mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);
  