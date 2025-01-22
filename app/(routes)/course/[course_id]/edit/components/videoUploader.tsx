import lesson from '@/models/lesson';
import video from '@/models/video';
import { ILesson } from '@/types/lesson';
import Mux from '@mux/mux-node';
import MuxUploader from '@mux/mux-uploader-react';
import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../StateContext';



export default function VideoUploader() {
  const [directUpload, setDirectUpload] = useState<Mux.Video.Uploads.Upload | null>(null);
   const { 
      lessons,
      setLessons,
      videolink,
      setVideoLink,
      selectedLesson,
      setSelectedLesson,
      isVideoUploaderOpen,
      setIsVideoUploaderOpen,
      isResourceUploaderOpen,
      setIsResourceUploaderOpen
    } = useGlobalState();

  const handleOnSuccess = async() => {
    await fetch(`/api/lesson/edit/video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        video: directUpload?.id,
        lesson_id: selectedLesson._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLessons(lessons.map(lesson => lesson._id === selectedLesson._id ? { ...lesson, video: directUpload?.id } : lesson));
        setSelectedLesson({...selectedLesson,video:directUpload?.id});
      })
      .catch((error) => console.error('Error:', error));
    console.log('Video uploaded successfully');
    setIsVideoUploaderOpen(false);
  }

  useEffect(() => {
    fetch("/api/upload/video", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {setDirectUpload(data.directUpload);
    })
    .catch(error => console.error('Error:', error));
  }, []);

  if (directUpload === null) {
    return null;
  }

  return <MuxUploader endpoint={directUpload.url as string} onSuccess={handleOnSuccess} />;
}