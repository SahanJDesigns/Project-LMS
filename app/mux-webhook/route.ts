import { Video } from "@/models/models";

export async function POST(request: Request) {
  const body = await request.json();
  const { type, data } = body

  if (type === 'video.asset.ready') {
    await saveAssetToDatabase(data);
  } else {
    /* handle other event types */
  }
  return Response.json({ message: 'ok' });
}

async function saveAssetToDatabase(data: any) {
  const { upload_id } = data;
  console.log(data);
  const video = await Video.findOne({ upload_id });
  if (!video) {
    const result = await Video.create(data);
    result.save();
  } else {
    await video.updateOne(data);
  }
}