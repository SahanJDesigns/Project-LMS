import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import {Course, User} from '@/models/models';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

export const GET = async (request: NextRequest) => {
  try {
    await connectMongo();
    const token = request.cookies.get('token')?.value;
        if (!token) {
          return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }
    
        if (!process.env.JWT_SECRET) {
          return new NextResponse(JSON.stringify({ message: "JWT Secret not found" }), { status: 500 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { _id: string };
        const user_id = decoded._id;

       const user = await User.findById(user_id);
       const enrolledCourses = user.enrolledCourses
       const coursesNotEnrolled = await Course.find({ _id: { $nin: enrolledCourses } }).select('title category thumbnail price rating.average numberOfStudents createdAt');

    return new NextResponse(JSON.stringify(coursesNotEnrolled), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in fetching courses not enrolled: ${error.message}`, { status: 500 });
  }
};