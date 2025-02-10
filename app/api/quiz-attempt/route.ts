import connectMongo from "@/lib/dbconfig";
import { QuizAttempt } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Use ObjectId from mongodb

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectMongo();

    const { student, quiz, attemptNumber, options, attemptStatus, timeTaken } =
      await request.json();

    // Validate required fields
    if (
      !student ||
      !quiz ||
      attemptNumber == null ||
      !attemptStatus ||
      timeTaken == null
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure valid ObjectId conversion
    if (!ObjectId.isValid(student) || !ObjectId.isValid(quiz)) {
      return NextResponse.json(
        { error: "Invalid student or quiz ID" },
        { status: 400 }
      );
    }

    const quizAttempt = new QuizAttempt({
      student: ObjectId.createFromHexString(student), // Proper way to create ObjectId
      quiz: ObjectId.createFromHexString(quiz),
      attemptNumber,
      options,
      attemptStatus,
      timeTaken,
    });

    await quizAttempt.save();
    return NextResponse.json(quizAttempt, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : JSON.stringify(error) },
      { status: 500 }
    );
  }
}
