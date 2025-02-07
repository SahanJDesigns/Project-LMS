import { Video } from "@/models/models";

export const GET = async (
    request: Request,
    { params }: { params: Promise<{ video_id: string }> }
) => {
    try {
        const video_id = (await params).video_id
        
        if (!video_id) {
            return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
        }
        const video = await Video.findOne({ upload_id: video_id });
        return new Response(JSON.stringify(video), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}