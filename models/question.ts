import { Mongoose } from "mongoose";

const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz", // Reference to the quiz
    required: true,
  },
  text: {
    type: String,
    required: true, // Question text
  },
  type: {
    type: String,
    enum: [
      "multiple_choice",
      "true_false",
      "short_answer",
      "matching",
      "Essay",
      "Numerical",
      "Drag and drop",
    ],
    required: true,
  },

  options: [
    {
      text: {
        type: String,
        required: function (this : any) {
          return this.type !== "matching"; // Only required for non-matching types
        },
      },
      key: {
        type: String,
        required: function ( this : any) {
          return this.type === "matching"; // Only required for matching type
        },
      },
      value: {
        type: String,
        required: function (this : any) {
          return this.type === "matching"; // Only required for matching type
        },
      },
      isCorrect: {
        type: Boolean,
        required: function (this : any) {
          return this.type !== "matching"; // Not needed for matching type
        },
      },
    },
  ],

  answer: {
    type: String, // For true/false or short-answer questions
    enum: [
      "multiple_choice",
      "true_false",
      "short_answer",
      "matching",
      "Essay",
      "Numerical",
      "Drag and drop",
    ],
    required: false,
  },
  weight: {
    type: Number,
    default: 1, // Default weight for the question
  },
  tags: [
    {
      type: String, // Tags for categorizing questions
    },
  ],
  media: [
    {
      file_name: {
        type: String,
      },
      file_url: {
        type: String,
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

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);
