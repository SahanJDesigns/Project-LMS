import connectMongo from "@/lib/dbconfig";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const userId = "67878371f4c16ce1e422c120";
    const category = searchParams.get("category");

    if (!userId || !category) {
      return new NextResponse(JSON.stringify({ message: "User ID and category are required." }), { status: 400 });
    }

    // Find the user by ID
    const user = await User.findById(userId).populate('enrolledCourses');

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found." }), { status: 404 });
    }

// Filter the user's enrolled courses by category
let enrolledCoursesInCategory;
if (category !== 'all') {
    enrolledCoursesInCategory = user.enrolledCourses.filter((course: any) => course.category === category);
} else {
    enrolledCoursesInCategory = user.enrolledCourses;
}
// Get the total count of enrolled courses in the category
const totalCourses = enrolledCoursesInCategory.length;

    return new NextResponse(JSON.stringify({ totalCourses }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error fetching course count by category: ${error.message}`, { status: 500 });
  }
};