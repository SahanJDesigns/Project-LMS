import { ObjectId } from "mongoose";

export interface IQuizAttempt {
  _id: ObjectId;
  student: ObjectId;
  quiz: ObjectId;
  attemptNumber: number;
  options?: IOption[];
  attemptStatus: "in_progress" | "completed";
  timeTaken: number;
}

interface IOption {
  answer?: string;

  key?: string;
  value?: string;

  isCorrect?: boolean;
}


