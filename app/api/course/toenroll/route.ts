import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import {Course, User} from '@/models/models';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export const GET = async (request: NextRequest) => {
  try {
    await connectMongo();

    const session = await getServerSession({ req: request, ...authOptions });
    const user_id = session?.user._id;

    if (!user_id) {
      return new NextResponse(JSON.stringify({ message: "You must be logged in." }), { status: 401 });
    }

    const user = await User.findById(user_id);
    const enrolledCourses = user.enrolledCourses
    const coursesNotEnrolled = await Course.find({ _id: { $nin: enrolledCourses } }).select('title category thumbnail price rating.average numberOfStudents createdAt');

    return new NextResponse(JSON.stringify(coursesNotEnrolled), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in fetching courses not enrolled: ${error.message}`, { status: 500 });
  }
};
