import { NextResponse } from "next/server";
import connectMongo from "@/lib/dbconfig";
import { Question } from "@/models/models";

export const GET = async () => {
  try {
    await connectMongo();

    const questions = await Question.find().populate("quiz","quiz_id");
    console.log("questions", questions);

    return new NextResponse(JSON.stringify(questions), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching questions: " + error.message, {
      status: 500,
    });
  }
};
