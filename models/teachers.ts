import mongoose from "mongoose";
const instructorSchema = new mongoose.Schema(
  {
    instructorId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coursesTaught: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    profilePicture: {
      type: String,
    },
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
  },
  { timestamps: true }
);

export default mongoose.models.instructor || mongoose.model("Instructor", instructorSchema);
