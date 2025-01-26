import Mux from "@mux/mux-node";
import { NextRequest } from "next/server";

const client = new Mux({
  tokenId: process.env['MUX_TOKEN_ID'],
  tokenSecret: process.env['MUX_TOKEN_SECRET'],
});


{/* get video upload url */}
export const GET = async () => {
    const directUpload = await client.video.uploads.create({
        cors_origin: '*',
        new_asset_settings: {
          playback_policy: ['public'],
        },
      });
    return new Response(JSON.stringify({directUpload}), { status: 200 });
}