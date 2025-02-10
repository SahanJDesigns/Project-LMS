// To do: find useage of this file in the project
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import Course from '../../../models/course';
import { Types } from 'mongoose';

export const GET = async () => {
  try {
    await connectMongo();
    const courses = await Course.find();
    return new NextResponse(JSON.stringify(courses), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in fetching courses: ${error.message}`, { status: 500 });
  }
};

export const GETONE = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    await connectMongo();
    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Course ID" }), { status: 400 });
    }

    const course = await Course.findById(id);

    if (!course) {
      return new NextResponse(JSON.stringify({ message: "Course not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(course), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in fetching course: ${error.message}`, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connectMongo();
    const {
      courseId,
      title,
      description,
      category,
      level,
      duration,
      price,
      thumbnail,
      rating,
      instructors,
      lessons,
      quizzes,
      enrolledStudents,
      comments,
      language,
      introduction,
      certification,
      instructorExperience,
      imageUrl,
    } = await request.json();

    const newCourse = new Course({
      courseId,
      title,
      description,
      category,
      level,
      duration,
      price,
      thumbnail,
      rating,
      instructors,
      lessons,
      quizzes,
      enrolledStudents,
      comments,
      language,
      introduction,
      certification,
      instructorExperience,
      imageUrl,
    });

    await newCourse.save();
    return new NextResponse(JSON.stringify(newCourse), { status: 201 });
  } catch (error: any) {
    return new NextResponse(`Error in creating course: ${error.message}`, { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  try {
    await connectMongo();
    const { courseId, updateData } = await request.json();

    if (!courseId || !updateData) {
      return new NextResponse(JSON.stringify({ message: "Course ID or update data not found" }), { status: 400 });
    }

    if (!Types.ObjectId.isValid(courseId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Course ID" }), { status: 400 });
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

    if (!updatedCourse) {
      return new NextResponse(JSON.stringify({ message: "Course not found in the database" }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ message: "Course is updated", course: updatedCourse }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in updating course: ${error.message}`, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  try {
    await connectMongo();
    const { courseId } = await request.json();

    if (!courseId) {
      return new NextResponse(JSON.stringify({ message: "Course ID not found" }), { status: 400 });
    }

    if (!Types.ObjectId.isValid(courseId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Course ID" }), { status: 400 });
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return new NextResponse(JSON.stringify({ message: "Course not found in the database" }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ message: "Course is deleted", course: deletedCourse }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in deleting course: ${error.message}`, { status: 500 });
  }
};