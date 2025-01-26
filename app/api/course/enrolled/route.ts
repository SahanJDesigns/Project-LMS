import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import jwt from 'jsonwebtoken';
import User from '@/models/user';
import { authOptions } from "../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import { NextApiRequest, NextApiResponse } from 'next';

export const GET = async (request: NextRequest) => {
  try {
    await connectMongo();
    const session = await getServerSession({ req: request, ...authOptions });
    const user_id = session?.user._id;
    if (!user_id) {
      return new NextResponse(JSON.stringify({ message: "You must be logged in." }), { status: 401 });
    }

    const user = await User.findById(user_id).populate('enrolledCourses').exec();

    const enrolledCourses = user.enrolledCourses
    return new NextResponse(JSON.stringify(enrolledCourses), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(`Error in fetching enrolled courses: ${error.message}`, { status: 500 });
  }
};
