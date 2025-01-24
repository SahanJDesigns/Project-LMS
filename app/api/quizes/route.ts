import { NextResponse } from "next/server";

import connectMongo from "@/lib/dbconfig";
import quiz from "@/models/quiz";
import Course from "@/models/course";

export const GET = async () => {
  try {
    await connectMongo();

    const quizes = await quiz.find().populate("course_id", "category");

    return new NextResponse(JSON.stringify(quizes), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching quizes" + error.message, {
      status: 500,
    });
  }
};
