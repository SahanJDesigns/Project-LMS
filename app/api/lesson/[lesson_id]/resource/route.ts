import { Lesson } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    request: NextRequest,
    { params }: { params: Promise<{ lesson_id: string }> }
) => {
    try {
        const lesson_id = (await params).lesson_id
        const lessons = await Lesson.findById(lesson_id).select("resources").populate("resources");
        const resources = lessons.resources;
        return new NextResponse(JSON.stringify(resources), { status: 200 });
    } catch (error: any) {
        console.error("Error in fetching users:", error);
        return new NextResponse("Error in fetching users: " + error.message, { status: 500 });
    }
}