import connectMongo from "@/lib/dbconfig";
import { Question } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
   request: NextRequest,
  { params }: { params: Promise<{ question_id: string }> }
) {
  const question_id = (await params).question_id;
  try{
    connectMongo();
    const question = await Question.findById(question_id);
    return new NextResponse(JSON.stringify(question), { status: 200 });
  }catch(error: any){
    console.log("Error in fetching questions: " + error.message);
    return new NextResponse("Error in fetching questions: " + error.message, {
      status: 500,
    });
  }
 
}
