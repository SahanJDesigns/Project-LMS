import mongoose from 'mongoose';
import Course from "./course";
import Resource from "./resource";
import Comment from "./comment";

const resourceSchema = Resource;
const commentSchema = Comment;

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoDuration: { type:Number, required: true },
  videoUrl: { type: String},
  summary: { type: String, required: true },
  content: { type: String, required: true },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });


export default mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);
