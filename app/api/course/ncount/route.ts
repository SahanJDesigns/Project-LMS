import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import User from '@/models/user';
import Course from '@/models/course';

export const GET = async (request: NextRequest) => {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const userId = "67878371f4c16ce1e422c120";
    const category = searchParams.get("category");

    if (!userId || !category) {
      return new NextResponse(JSON.stringify({ message: "User ID and category are required." }), { status: 400 });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found." }), { status: 404 });
    }

    const enrolledCourses = user.enrolledCourses;

    const query: { _id: { $nin: any[] }, category?: string } = { _id: { $nin: enrolledCourses } };
    if (category !== 'all') {
      query['category'] = category;
    }

    const totalCourses = await Course.countDocuments(query);

    return new NextResponse(JSON.stringify({ totalCourses }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error fetching course count: ${error.message}`, { status: 500 });
  }
};