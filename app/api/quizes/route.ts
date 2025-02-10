import { NextResponse } from "next/server";

import connectMongo from "@/lib/dbconfig";
import {Quiz} from "@/models/models";

export const GET = async () => {
  try {
    await connectMongo();

    const quizes = await Quiz.find().populate("course_id", "category");

    return new NextResponse(JSON.stringify(quizes), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching quizes" + error.message, {
      status: 500,
    });
  }
};
