"use client";

import React, { useState, useEffect } from "react";
import MuxPlayer from '@mux/mux-player-react';
import { set } from "mongoose";


interface VideoPlayerProps {
  video_id: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video_id }) => {
  const [asset, setAsset] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchVideoAsset = async (attemptNumber:number) => {
      try {
        const response = await fetch(`/api/video/${video_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setAsset(data);
        console.log("video data 123:",data);
        if(!data){
          if(attemptNumber === 10){
            console.error('Failed to fetch video asset after 10 attempts');
            setError('Failed to fetch video asset after 10 attempts');
            return;
          }
          await new Promise(resolve => setTimeout(resolve, 1000 * attemptNumber));
          fetchVideoAsset(attemptNumber + 1);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    fetchVideoAsset(0);
  }, [video_id]);

  if (!asset) {
    return (  <div className="flex justify-center items-center bg-black h-screen">
                <div className="w-16 h-16 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>);
  } else if (error) {
    return <div className="text-red-500">{error}</div>;
  } else {
    return <MuxPlayer streamType="on-demand" playbackId={asset.playback_ids[0].id} accentColor="#ac39f2" />;
  }
};

export default VideoPlayer;
