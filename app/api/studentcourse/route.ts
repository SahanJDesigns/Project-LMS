import { NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import Student from '../../../models/student';
import Course from '../../../models/course';
import { Types } from 'mongoose';

export const GET = async (request: Request) => {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return new NextResponse(JSON.stringify({ message: "Student ID not found" }), { status: 400 });
    }

    if (!Types.ObjectId.isValid(studentId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Student ID" }), { status: 400 });
    }

    const student = await Student.findById(studentId).populate('enrolledCourses');

    if (!student) {
      return new NextResponse(JSON.stringify({ message: "Student not found in the database" }), { status: 404 });
    }

    const enrolledCourses = await Course.find({ _id: { $in: student.enrolledCourses } }).select('title category thumbnail createdAt');

    return new NextResponse(JSON.stringify(enrolledCourses), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in fetching enrolled courses: ${error.message}`, { status: 500 });
  }
};