import { ObjectId } from 'mongoose';

export interface IResource {
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