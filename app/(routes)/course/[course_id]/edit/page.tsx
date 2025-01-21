'use client';
import React, { useEffect, useState } from 'react';
import CourseContent from './courseContent';
import { useParams, useRouter } from 'next/navigation';
import { IoMdAddCircle } from "react-icons/io";
import LessonDetails from './lessonDetails';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import VideoUploader from './videoUploader'
import { set } from 'mongoose';
import VideoPlayer from './player';


interface CourseParams {
  course_id: string;
}

function Course() {
  const params = useParams();
  const course_id = params.course_id as string;
  const [lessons, setLessons] = useState<any>([]);
  const [videolink, setVideoLink] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  
  useEffect(() => {
    setVideoLink(selectedLesson?.video || '');
  },[selectedLesson]);

  useEffect(() => {
    fetch('/api/lesson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ course_id: course_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLessons(data);
        setVideoLink(data[0]?.video || '');
        setSelectedLesson(data[0] || null);
      })
      .catch((error) => console.error('Error fetching lessons:', error));
  }, []);

  return (
    <div className="grid lg:grid-cols-3">
      {/* Video Section */}
      <div className="relative lg:col-span-2 items-center justify-center rounded-lg m-3">
        { videolink != '' && (
          <div className='aspect-video rounded-lg overflow-hidden mb-3'>
            <button className='absolute z-10 top-0 right-0 m-4 bg-blue-500 text-white px-4 py-2 rounded-md' onClick={() => setIsUploaderOpen(true)}>Change</button>
            <VideoPlayer video_id={videolink} />
          </div>
        )}
        { videolink === '' &&
          <div className="flex justify-center items-center bg-black aspect-video w-full rounded-lg mb-3">
            <IoMdAddCircle onClick = {() => {setIsUploaderOpen(true)}} className="text-4xl hover:text-5xl transition-all duration-200 text-white" />
          </div>    
        }

            <Dialog open={isUploaderOpen} onOpenChange={setIsUploaderOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add your video here</DialogTitle>
                  <DialogDescription>
                    Please upload a video file to add a lesson to this course. Ensure the video is in a supported format.
                  </DialogDescription>
                </DialogHeader>
                <VideoUploader lessons={lessons} setLessons={setLessons} selectedLesson={selectedLesson} setSelectedLesson={setSelectedLesson} setIsUploaderOpen={setIsUploaderOpen} />
              </DialogContent>
            </Dialog>

          {/* Lesson Details Section */}
          <div className="w-full h-64 col-span-2 my-6">
            <LessonDetails selectedLesson={selectedLesson} setSelectedLesson={setSelectedLesson}/>
          </div>
      </div>
       {/* Course Content Section */}
       <div className="lg:col-span-1 lg:row-span-2 rounded-md m-3">
        <CourseContent course_id={course_id} selectedLesson={selectedLesson} setVideoLink={setVideoLink} lessons={lessons} setLessons={setLessons} setSelectedLesson={setSelectedLesson}/>
      </div>
    </div>
  );
}

export default Course;
 