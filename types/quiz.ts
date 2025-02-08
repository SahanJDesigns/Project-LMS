import { ObjectId } from "mongoose";

export interface IQuiz {
  _id: ObjectId;
  name: string;
  description?: string | null;
  image: string;
  timelimit: string;
  totalQuestions: number;
  date: string;
  passGrade: number;
  attempts: number;
  course_id: ObjectId;
  questions: ObjectId[];
}
