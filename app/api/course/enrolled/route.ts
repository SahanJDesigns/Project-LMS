import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import jwt from 'jsonwebtoken';
import User from '@/models/user';
import { authOptions } from "../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import { NextApiRequest, NextApiResponse } from 'next';
/*
export const GET = async (request: NextRequest) => {
  try {
    await connectMongo();

    if (!token) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      return new NextResponse(JSON.stringify({ message: "JWT Secret not found" }), { status: 500 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { _id: string };
    const user_id = decoded._id;

    const user = await User.findById(user_id).populate('enrolledCourses').exec();

    const enrolledCourses = user.enrolledCourses
    return new NextResponse(JSON.stringify(enrolledCourses), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(`Error in fetching enrolled courses: ${error.message}`, { status: 500 });
  }
};

*/

export const GET = async (request: NextRequest) => {
  const session = await getServerSession({ req: request, ...authOptions });
  console.log(session);
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "You must be logged in." }), { status: 401 });
  }

  return new NextResponse(JSON.stringify({
    message: "Success",
  }), { status: 200 });
}