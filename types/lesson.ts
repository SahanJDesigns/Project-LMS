import { ObjectId } from 'mongoose';

export interface ILesson {
  _id: ObjectId;
  title: string;
  description: string;
  videoDuration: number;
  videoUrl?: string;
  summary: string;
  content: string;
  resources?: ObjectId[];
  comments?: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}