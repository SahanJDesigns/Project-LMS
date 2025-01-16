import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['Student', 'Instructor', 'Admin'],
    required: true,
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  contact: {
    phone: {
      type: String,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zip: {
        type: String,
      },
    },
  },
  /* Student specific fields */
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
          ref: 'Course',
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
  /* Instructor specific fields */
      coursesTaught: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      ],
      qualifications: [
        {
          degree: {
            type: String,
            required: true,
          },
          institution: {
            type: String,
          },
          yearCompleted: {
            type: Number,
          },
        },
      ],
      achievements: [
        {
          title: {
            type: String,
          },
          description: {
            type: String,
          },
          date: {
            type: Date,
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
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
