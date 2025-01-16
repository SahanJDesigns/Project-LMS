import { ObjectId } from 'mongoose';

export interface ICourse {
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: {
    hours: number;
    weeks: number;
  };
  price: number;
  thumbnail?: string;
  rating: {
    average: number;
    reviews: number;
  };
  instructors?: ObjectId[];
  lessons?: ObjectId[];
  quizzes?: ObjectId[];
  enrolledStudents?: ObjectId[];
  comments?: ObjectId[];
  language: string;
  introduction: string;
  certification: boolean;
  instructorExperience: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}