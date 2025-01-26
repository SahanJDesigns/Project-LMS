import { ObjectId } from 'mongoose';

export interface IResource {
  _id: ObjectId;
  resourceId: string;
  title: string;
  type: 'Video' | 'Document' | 'Link' | 'PDF';
  url: string;
  description?: string;
  relatedCourseId?: ObjectId;
  relatedLessonId?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}