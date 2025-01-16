import { NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import Student from '../../../../models/student';
import Course from '../../../../models/course';
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

    interface EnrolledCourse {
        _id: Types.ObjectId;
    }

    interface StudentDocument {
        enrolledCourses: EnrolledCourse[];
    }

    const enrolledCourseIds: Types.ObjectId[] = (student as StudentDocument).enrolledCourses.map(course => course._id);
    const coursesNotEnrolled = await Course.find({ _id: { $nin: enrolledCourseIds } }).select('title category thumbnail price rating.average numberOfStudents createdAt');

    return new NextResponse(JSON.stringify(coursesNotEnrolled), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in fetching courses not enrolled: ${error.message}`, { status: 500 });
  }
};