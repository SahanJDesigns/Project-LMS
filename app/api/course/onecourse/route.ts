import { NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import Course from '../../../../models/course';
import { Types } from 'mongoose';

export const GET = async (request: Request) => {
  try {
    await connectMongo();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id || !Types.ObjectId.isValid(id)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Course ID" }), { status: 400 });
    }

    const course = await Course.findById(id);
    console.log(course);

    if (!course) {
      return new NextResponse(JSON.stringify({ message: "Course not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(course), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in fetching course: ${error.message}`, { status: 500 });
  }
};