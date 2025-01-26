import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import User from '@/models/user';
import Course from '@/models/course';
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const GET = async (request: NextRequest) => {
  try {
    await connectMongo();
    const session = await getServerSession({ req: request, ...authOptions });
    // const user_id = session?.user._id;
    const user_id = "67878371f4c16ce1e422c120";
    if (!user_id) {
      return new NextResponse(JSON.stringify({ message: "You must be logged in." }), { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const user = await User.findById(user_id).populate({
      path: 'enrolledCourses',
      match: category !== "all" ? { category } : {},
      options: {
        skip: (page - 1) * limit,
        limit: limit,
      },
    }).exec();

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found." }), { status: 404 });
    }

    const totalCourses = await Course.countDocuments(category !== "all" ? { category } : {});

    return new NextResponse(JSON.stringify({
      courses: user.enrolledCourses,
      totalCourses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: page,
    }), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(`Error in fetching enrolled courses: ${error.message}`, { status: 500 });
  }
};