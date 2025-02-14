import { ObjectId } from 'mongoose';

export interface ISchedule {
  _id: ObjectId;
  scheduleId: string;
  student: ObjectId;
  items: {
    course: ObjectId;
    lessons: {
      lesson: ObjectId;
      date: Date;
      status: 'Pending' | 'Completed' | 'Skipped';
    }[];
  }[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}