import { Course, Lesson, Video } from "@/models/models";
import { NextResponse } from "next/server";
import  lessonTemplate from "./lesson_template/template1.json"
import { Types } from 'mongoose';
import connectMongo from "@/lib/dbconfig";
import Mux from '@mux/mux-node';

const client = new Mux({
  tokenId: process.env['MUX_TOKEN_ID'],
  tokenSecret: process.env['MUX_TOKEN_SECRET'],
});

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const slug = (await params).slug;
    
    if(slug === "new"){
        const {course_id} = await request.json();
        
        if (!course_id) {
            return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
        } 
        try {
            const lesson = await Lesson.create(lessonTemplate);
            lesson.save();
            await Course.updateOne({ _id: course_id }, { $push: { lessons: lesson._id } });
            return new Response(JSON.stringify({ lesson }), { status: 200 });
        } catch (error:any) {
            console.log(error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
    
    }else if(slug === "video"){
        await connectMongo();
        const { video, lesson_id } = await request.json();
        if (!video || !lesson_id) {
            return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
        }
        try {
            const lesson = await Lesson.findOne({ _id: lesson_id });

            if (!lesson) {
                return new Response(JSON.stringify({ error: "Lesson not found" }), { status: 404 });
            }
            const previousVideo = lesson.video;
            if (previousVideo) {
                const asset = await Video.findOne({ upload_id: previousVideo });
                if(asset){
                  await Video.deleteMany({ upload_id: previousVideo });
                  client.delete(`/video/v1/assets/${asset.id}`);
                }
                
            }
            await Video.deleteMany({ upload_id: previousVideo });
            const result2 = await Lesson.updateOne({ _id: lesson_id }, { $set: { video } });
            return new Response(JSON.stringify({ result2 }), { status: 200 });
        } catch (error:any) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
      }else{
        const { lesson_id, ...data } = await request.json();
        console.log(lesson_id,data)
        if (!(slug in data)){
            return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
        }
        const updateField = { [slug]: data[slug] };
    
        try {
            const result = await Lesson.updateOne({ _id: lesson_id }, { $set: updateField });
            return new Response(JSON.stringify({ result }), { status: 200 });
        } catch (error:any) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
    }
}

/*
function uplaodResources(request: Request) {
  try {
    const { file, filename, mimeType } = req.body;

    // Authenticate with Google API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uris: ["YOUR_REDIRECT_URI"],
      },
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });

    // Create file in Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: filename, // Name of the file in Drive
        mimeType,
      },
      media: {
        mimeType,
        body: Buffer.from(file, "base64"), // Convert file to buffer
      },
    });

    // Make file shareable
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Get the shareable link
    const fileLink = `https://drive.google.com/file/d/${response.data.id}/view`;

    res.status(200).json({ link: fileLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload file" });
  }
}

*/
