import connectMongo from "@/lib/dbconfig";
import { Course } from "@/models/models";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export const POST = async (request: Request) => {
    try {
      await connectMongo();
      const {
        title,
        description,
        category,
        level,
        duration,
        price,
        language,
        introduction,
        certification,
        instructorExperience,
        imageUrl,
      } = await request.json();
      
        const session = await getServerSession({ req: request, ...authOptions });
        console.log(session);
        // const user_id = session?.user._id;
        const user_id = "67878371f4c16ce1e422c120";

        if (!user_id) {
            return new NextResponse(JSON.stringify({ message: "You must be logged in." }), { status: 401 });
        }

      const newCourse = new Course({
        title,
        description,
        category,
        level,
        duration,
        price,
        instructors: [user_id],
        language,
        introduction,
        certification,
        instructorExperience,
        imageUrl,
      });
  
      await newCourse.save();
      return new NextResponse(JSON.stringify(newCourse), { status: 201 });
    } catch (error: any) {
      return new NextResponse(`Error in creating course: ${error.message}`, { status: 500 });
    }
  };