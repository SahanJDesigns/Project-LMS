// To do: find useage of this file in the project
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import { Types } from 'mongoose';
import { Course, Lesson } from '@/models/models';


export const POST = async (request: Request) => {

  async function populateComment(comments: any) {
      for (const comment of comments) {

          if (comment.replies.length > 0) {
              await comment.populate("replies");
              await populateComment(comment.replies);
          }

          await comment.populate("author");
          
      }
  }

  try {
      await connectMongo();
      const {course_id,...filters} = await request.json();
      console.log(course_id);

      const course = await Course.findOne({_id: course_id, ...filters})
          .select("lessons")
          .populate("lessons");
      let lessons = course.lessons;

      console.log(lessons);

      if (lessons.length !== 0) {
        for (const lesson of lessons) {
          await lesson.populate("comments");
          let comments = lesson.comments;
          await populateComment(comments);
        }
      }

      return new NextResponse(JSON.stringify(lessons), { status: 200 });
  } catch (error: any) {
      console.error("Error in fetching users:", error);
      return new NextResponse("Error in fetching users: " + error.message, { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  try {
    await connectMongo();
    const { lessonId, updateData } = await request.json();

    if (!lessonId || !updateData) {
      return new NextResponse(JSON.stringify({ message: "Lesson ID or update data not found" }), { status: 400 });
    }

    if (!Types.ObjectId.isValid(lessonId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Lesson ID" }), { status: 400 });
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, updateData, { new: true });

    if (!updatedLesson) {
      return new NextResponse(JSON.stringify({ message: "Lesson not found in the database" }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ message: "Lesson is updated", lesson: updatedLesson }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in updating lesson: ${error.message}`, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  try {
    await connectMongo();
    const body = await request.text();
    if (!body) {
      return new NextResponse(JSON.stringify({ message: "Request body is empty" }), { status: 400 });
    }
    const { lesson_id } = JSON.parse(body);

    console.log(lesson_id);
    if (!lesson_id) {
      return new NextResponse(JSON.stringify({ message: "Lesson ID not found" }), { status: 400 });
    }

    if (!Types.ObjectId.isValid(lesson_id)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Lesson ID" }), { status: 400 });
    }

    const deletedLesson = await Lesson.findByIdAndDelete(lesson_id);

    if (!deletedLesson) {
      return new NextResponse(JSON.stringify({ message: "Lesson not found in the database" }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ message: "Lesson is deleted", lesson: deletedLesson }), { status: 200 });
  } catch (error: any) {
    console.error("Error in deleting lesson:", error);
    return new NextResponse(`Error in deleting lesson: ${error.message}`, { status: 500 });
  }
};