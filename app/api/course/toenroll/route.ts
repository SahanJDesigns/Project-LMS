import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import User from '@/models/user';
import Course from '@/models/course';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export const GET = async (request: NextRequest) => {
  try {
    await connectMongo();

    const session = await getServerSession({ req: request, ...authOptions });
    // const user_id = session?.user._id;
    const user_id = "67878371f4c16ce1e422c120";

    if (!user_id) {
      return new NextResponse(JSON.stringify({ message: "You must be logged in." }), { status: 401 });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found." }), { status: 404 });
    }

    const enrolledCourses = user.enrolledCourses;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const category = searchParams.get('category') || 'all';

    const query: { _id: { $nin: any[] }, category?: string } = { _id: { $nin: enrolledCourses } };
    if (category !== 'all') {
      query['category'] = category;
    }

    const coursesNotEnrolled = await Course.find(query)
      .select('title category thumbnail price rating.average numberOfStudents createdAt')
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCourses = await Course.countDocuments(query);
    // console.log(coursesNotEnrolled)
    return new NextResponse(JSON.stringify({
      courses: coursesNotEnrolled,
      totalCourses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: page,
    }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in fetching courses not enrolled: ${error.message}`, { status: 500 });
  }
};