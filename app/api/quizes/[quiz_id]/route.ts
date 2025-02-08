import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/dbconfig";
import { Question, Quiz } from "@/models/models";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ quiz_id: string }> }
) {
  const quiz_id = (await params).quiz_id;
  try {
    await connectMongo();

    const quiz = await Quiz.findById(quiz_id);
    console.log("quizzes", quiz);

    return new NextResponse(JSON.stringify(quiz), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching questions: " + error.message, {
      status: 500,
    });
  }
}
