'use client';
import VideoPlayer from '@/components/player';
import { useEffect, useState } from 'react';
import CourseContent from './components/courseContent';
import LessonDetails from './components/lessonDetails';
import { useParams } from 'next/navigation';
import { useGlobalState } from './stateContext';
import { IoMdAddCircle } from 'react-icons/io';
import { VscRunErrors } from "react-icons/vsc";
import { Skeleton } from '@/components/ui/skeleton';

function Course() {
  const params = useParams();
  const course_id = params?.course_id as string;
  
  const { 
    setLessons,
    videolink,
    setVideoLink,
    setSelectedLesson,
    loading,
    setLoading,
  } = useGlobalState();

  useEffect(() => {
    setLoading(true);
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
        setSelectedLesson(data[0] || null);
        setVideoLink(data[0]?.video || '');
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching lessons:', error));
  }, [course_id, setLessons, setVideoLink]);

  return (
    <div className="grid lg:grid-cols-3">
      {/* Video Section */}
      <div className="relative lg:col-span-2 items-center justify-center rounded-lg m-3">
        {loading ? (
          <Skeleton className="aspect-video rounded-lg overflow-hidden mb-3" />
        ) : (
          <>
            {videolink != '' ? (
              <div className='aspect-video rounded-lg overflow-hidden mb-3'>
                <VideoPlayer video_id={videolink} />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center bg-black text-white aspect-video w-full rounded-lg mb-3">
                <VscRunErrors className="text-5xl"/>
                <span className='m-1'>No video is currently available</span>
              </div>
            )}
          </>
        )}
        {/* Lesson Details Section */}
        <div className="w-full h-64 col-span-2 my-6">
          <LessonDetails />
        </div>
      </div>
      {/* Course Content Section*/}
      <div className="lg:col-span-1 lg:row-span-2 rounded-md m-3">
        <CourseContent />
      </div>
    </div>
  );
}

export default Course;