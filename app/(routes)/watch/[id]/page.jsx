'use client';

import MuxPlayer from '@mux/mux-player-react';

export default async function Page({ params }) {
  const asset = getAssetFromDatabase(params.id);
  return <MuxPlayer streamType="on-demand" playbackId={asset.id} accentColor="#ac39f2" />;
}
