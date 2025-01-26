import connectMongo from "@/lib/dbconfig";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const userId = "67878371f4c16ce1e422c120";
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!userId || !category) {
      return new NextResponse(JSON.stringify({ message: "User ID and category are required." }), { status: 400 });
    }

    // Find the user by ID
    const user = await User.findById(userId).populate({
      path: 'enrolledCourses',
      match: { category },
      options: {
        skip: (page - 1) * limit,
        limit: limit,
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found." }), { status: 404 });
    }

    return new NextResponse(JSON.stringify({
      courses: user.enrolledCourses,
      totalPages: Math.ceil(user.enrolledCourses.length / limit),
      currentPage: page,
    }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error fetching courses by category: ${error.message}`, { status: 500 });
  }
};