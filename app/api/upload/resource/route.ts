import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { Lesson, Resource } from "@/models/models";

const UPLOAD_DIR = path.resolve(process.cwd(), "public/uploads/resources");

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    console.log(formData)
    const file = formData.get('file') as Blob;
    const lesson_id = formData.get('lesson_id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    console.log(file)
    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalFileName = (file as File).name;
    const fileExtension = path.extname(originalFileName);
    const newFileName = `${title}.${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, newFileName);

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    fs.writeFileSync(filePath, buffer);
    const resource = await Resource.create({title, type: fileExtension.toUpperCase().substring(1), url: `/uploads/resources/${newFileName}`, description });
    const lesson = await Lesson.findById(lesson_id);
    lesson.resources.push(resource._id);
    await lesson.save();
    return NextResponse.json(JSON.stringify(lesson), { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};