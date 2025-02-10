import { ObjectId } from "mongoose";

export interface IQuestion {
  _id: ObjectId;
  quiz: ObjectId;
  text: string;
  type: QuestionType;
  answer?: string;
  options?: IOption[];
  weight: number;
  tags: string[];
  media: IMedia[];
  createdAt: string;
  updatedAt: string;
}

type QuestionType =
  | "short_answer"
  | "multiple_choice"
  | "true_false"
  | "matching";

interface IOption {
  text?: string;
  isCorrect?: boolean;

  key?: string;
  value?: string;
}

interface IMedia {
  url: string;
  type: MediaType;
}

type MediaType = "image" | "video" | "audio";
