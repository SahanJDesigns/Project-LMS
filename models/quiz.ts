import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
  quiz_id:{
    type:mongoose.Schema.Types.ObjectId,
    required: true,},
  name:{
    type: String,
    required: true,},
  description:{
    type: String},
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the course
    required: true,
  },
  question_id: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question', // Reference to the question
        required: true,
      },
    },
  ],
  totalQuestions: {
    type: Number,
    required: true,
  },
  settings: {
    timing: {
      openTime: {
        type: Date,
        required: true,
      },
      closeTime: {
        type: Date,
        required: true,
      },
      timeLimit: {
        type: Number, // Time limit in seconds
        required: true,
      },
    },
    grade: {
      gradeToPass: {
        type: Number,
        required: true,
      },
      attemptsAllowed: {
        type: Number,
        default: 1,
      },
      gradingMethod: {
        type: String,
        enum: ['highest_grade', 'average_grade', 'first_attempt', 'last_attempt'],
        default: 'highest_grade',
      },
    },
    layout: {
      questionOrder: {
        type: String,
        enum: ['shuffle', 'fixed'],
        default: 'shuffle',
      },
      newPage: {
        type: Number, // Questions per page
        default: 1,
      },
    },
    questionBehavior: {
      shuffleWithinQuestions: {
        type: Boolean,
        default: true,
      },
      behaviorType: {
        type: String,
        enum: ['deferred_feedback', 'immediate_feedback', 'interactive'],
        default: 'deferred_feedback',
      },
    },
    reviewOptions: {
      duringAttempt: [String], // Example: ['score']
      immediatelyAfterAttempt: [String], // Example: ['score', 'feedback']
      laterWhileOpen: [String], // Example: ['score', 'correct_answers']
      afterClose: [String], // Example: ['score', 'feedback', 'correct_answers']
    },
    appearance: {
      showUserPicture: {
        type: Boolean,
        default: false,
      },
      decimalPlacesInGrades: {
        type: Number,
        default: 2,
      },
      decimalPlacesInQuestionGrades: {
        type: Number,
        default: 1,
      },
    },
    extraRestrictions: {
      requirePassword: {
        type: String, // Password for the quiz
      },
      requireNetworkAddress: {
        type: String, // IP range restriction
      },
      enforcedDelayBetweenAttempts: {
        type: Number, // Delay in seconds
      },
      browserSecurity: {
        type: String,
        enum: ['none', 'secure_window'],
        default: 'none',
      },
    },
    completion: {
      requireView: {
        type: Boolean,
        default: false,
      },
      requireGrade: {
        type: Boolean,
        default: false,
      },
      requirePassingGrade: {
        type: Boolean,
        default: false,
      },
    },
  },
  overallFeedback: [
    {
      range: [Number], // Example: [90, 100]
      feedback: {
        type: String,
      },
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  files: [
    {
      fileName: {
        type: String,
      },
      fileUrl: {
        type: String,
      },
    },
  ],
  totalAmount: {
    type: Number, // Placeholder for total score calculation
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'inactive'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quiz', QuizSchema);
