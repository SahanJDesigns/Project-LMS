// import mongoose from 'mongoose';

// const QuizAttemptSchema = new mongoose.Schema({
//   attemptId: {
//     type: String,
//     unique: true,
//     required: true, // Unique identifier for each attempt
//   },
//   student: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Reference to the User (Student)
//     required: true,
//   },
//   quiz: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Quiz', // Reference to the Quiz
//     required: true,
//   },
//   attemptNumber: {
//     type: Number,
//     required: true, // Tracks which attempt this is for the student
//     default: 1,
//   },
//   answers: [
//     {
//       question: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Question', // Reference to the Question
//         required: true,
//       },
//       selectedOption: {
//         type: mongoose.Schema.Types.Mixed, // Can store the selected option or answer text
//       },
//       isCorrect: {
//         type: Boolean, // Whether the selected answer was correct
//       },
//       marksAwarded: {
//         type: Number, // Marks awarded for the question
//         default: 0,
//       },
//     },
//   ],
//   totalMarks: {
//     type: Number,
//     required: true, // Total marks scored in the attempt
//   },
//   timeTaken: {
//     type: Number, // Time taken in seconds
//     required: true,
//   },
//   attemptStatus: {
//     type: String,
//     enum: ['in_progress', 'completed', 'abandoned'],
//     default: 'in_progress', // Current status of the attempt
//   },
//   startTime: {
//     type: Date,
//     required: true, // Timestamp when the attempt started
//   },
//   endTime: {
//     type: Date, // Timestamp when the attempt ended
//   },
//   feedback: {
//     type: String, // Overall feedback for the attempt
//   },
//   tags: [
//     {
//       type: String, // Optional tags for categorization
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now, // Timestamp of record creation
//   },
// });

// export default mongoose.models.QuizAttempt || mongoose.model('QuizAttempt', QuizAttemptSchema);


import mongoose from "mongoose";

const QuizAttemptSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Automatically generate ObjectId
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  attemptNumber: {
    type: Number,
    required: true,
    default: 1,
  },
  options: [
    {
      answer: { type: String },
      key: { type: String },
      value: { type: String },
      isCorrect: { type: Boolean },
    },
  ],
  attemptStatus: {
    type: String,
    enum: ["in_progress", "completed"],
    required: true,
  },
  timeTaken: {
    type: Number,
    required: true,
  },
  startTime: { type: Date, default: Date.now }, // Made optional with a default value
  totalMarks: { type: Number, default: 0 }, // Made optional with a default value
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.QuizAttempt ||
  mongoose.model("QuizAttempt", QuizAttemptSchema);
