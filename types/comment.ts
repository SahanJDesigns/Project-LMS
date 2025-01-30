import { ObjectId } from 'mongoose';

export interface IComment {
  _id: ObjectId;
  commentId: string;
  content: string;
  author: ObjectId;
  parentComment?: ObjectId;
  replies?: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}