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
  course_id: string;}

interface ICourse {
  course_id: string;
  name: string;
  description?: string | null;
  image: string;
  category: string;
  instructor_id: string;

  
  }

export type { IUser, IQuiz, ICourse };