interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IQuiz {
  quiz_id: string;
  name: string;
  description?: string | null;
  image: string;
  timelimit: string;
  totalQuestions: number;
  date: string;
  passGrade: number;
  attempts: number;
  course_id: string;
}

interface ICourse {
  course_id: string;
  name: string;
  description?: string | null;
  image: string;
  category: string;
  instructor_id: string;
}

interface IQuestion {
  question_id: string;
  quiz: { _id: string; quiz_id: string };
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

type QuestionType = "short_answer" | "multiple_choice" | "true_false" | "matching";

interface IOption {
  text: string;
  isCorrect: boolean;
}

interface IMedia {
  url: string;
  type: MediaType;
}

type MediaType = "image" | "video" | "audio";

export type {
  IUser,
  IQuiz,
  ICourse,
  IQuestion,
  IOption,
  IMedia,
  MediaType,
  QuestionType,
};
