import connectMongo from "@/lib/dbconfig";
import { Course, Lesson, Video } from "@/models/models";
import Mux from "@mux/mux-node";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

const client = new Mux({
  tokenId: process.env['MUX_TOKEN_ID'],
  tokenSecret: process.env['MUX_TOKEN_SECRET'],
});

export const POST = async (request: Request) => {
    try {
        const {lesson_id,course_id} = await request.json();
        await connectMongo();
        console.log(lesson_id);
        if (!lesson_id) {
            return new NextResponse(JSON.stringify({ message: "Lesson ID not found" }), { status: 400 });
        }
        if (!Types.ObjectId.isValid(lesson_id)) {
            return new NextResponse(JSON.stringify({ message: "Invalid Lesson ID" }), { status: 400 });
        }
        const lesson = await Lesson.findOne({ _id: lesson_id });
        const course = await Course.findOne({ lessons: lesson_id });
        if (course) {
            course.lessons = course.lessons.filter((lesson: any) => lesson._id != lesson_id);
            await course.save();
        }
        if (!lesson) {
            return new Response(JSON.stringify({ error: "Lesson not found" }), { status: 404 });
        }
        const lessonVideo = lesson.video;
        console.log("lesson video: ",lessonVideo);
        if (lessonVideo) {
            const asset = await Video.findOne({ upload_id: lessonVideo });
            if(asset){
              await Video.deleteMany({ upload_id: lessonVideo });
              client.delete(`/video/v1/assets/${asset.id}`);
            }
        }  
        const result = await Lesson.deleteOne({ _id: lesson_id });
        return new NextResponse(JSON.stringify({ result }), { status: 200 });
    } catch (error: any) {
      console.log(error);
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
