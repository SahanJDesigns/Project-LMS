import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  role: 'Student' | 'Instructor' | 'Admin';
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  profilePicture?: string;
  contact?: {
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zip?: string;
    };
  };
  enrolledCourses?: ObjectId[];
  progress?: {
    courseId: ObjectId;
    lessonsCompleted: number;
    quizzesCompleted: number;
    completionPercentage: number;
  }[];
  coursesTaught?: ObjectId[];
  qualifications?: {
    degree: string;
    institution?: string;
    yearCompleted?: number;
  }[];
  achievements?: {
    title?: string;
    description?: string;
    date?: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}