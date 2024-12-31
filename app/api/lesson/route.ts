import { NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import Lesson from '../../../models/lesson';
import { Types } from 'mongoose';

export const GET = async () => {
  try {
    await connectMongo();
    const lessons = await Lesson.find();
    return new NextResponse(JSON.stringify(lessons), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in fetching lessons: ${error.message}`, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connectMongo();
    const {
      lessonId,
      title,
      description,
      videoUrl,
      summary,
      content,
      course,
      resources,
      comments,
    } = await request.json();

    const newLesson = new Lesson({
      lessonId,
      title,
      description,
      videoUrl,
      summary,
      content,
      course,
      resources,
      comments,
    });

    await newLesson.save();
    return new NextResponse(JSON.stringify(newLesson), { status: 201 });
  } catch (error: any) {
    return new NextResponse(`Error in creating lesson: ${error.message}`, { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  try {
    await connectMongo();
    const { lessonId, updateData } = await request.json();

    if (!lessonId || !updateData) {
      return new NextResponse(JSON.stringify({ message: "Lesson ID or update data not found" }), { status: 400 });
    }

    if (!Types.ObjectId.isValid(lessonId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Lesson ID" }), { status: 400 });
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, updateData, { new: true });

    if (!updatedLesson) {
      return new NextResponse(JSON.stringify({ message: "Lesson not found in the database" }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ message: "Lesson is updated", lesson: updatedLesson }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in updating lesson: ${error.message}`, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  try {
    await connectMongo();
    const { lessonId } = await request.json();

    if (!lessonId) {
      return new NextResponse(JSON.stringify({ message: "Lesson ID not found" }), { status: 400 });
    }

    if (!Types.ObjectId.isValid(lessonId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Lesson ID" }), { status: 400 });
    }

    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);

    if (!deletedLesson) {
      return new NextResponse(JSON.stringify({ message: "Lesson not found in the database" }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ message: "Lesson is deleted", lesson: deletedLesson }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in deleting lesson: ${error.message}`, { status: 500 });
  }
};