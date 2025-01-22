import { formatTime } from "@/lib/utils";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { IoMdTrash } from "react-icons/io";
import { useGlobalState } from "../StateContext";
import { useParams } from "next/navigation";



const CourseContent: React.FC = () => {
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const params = useParams();
  const course_id = params?.course_id as string;
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
    setIsResourceUploaderOpen,
    resources,
    setResources
  } = useGlobalState();

  const haddleAddNewLesson = () => {
    fetch('/api/lesson/edit/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ course_id: course_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLessons([...lessons, data.lesson]);
        setSelectedLesson(data.lesson);
        setVideoLink(data.lesson?.video);
      })
      .catch((error) => console.error('Error fetching lessons:', error));
  }

  const handleLessonClick = (lesson: any) => {
    setSelectedLesson(lesson);
    setVideoLink(lesson.video);
  };

  const handleLessonDoubleClick = (lesson: any) => {
    setEditingLesson(lesson);
    setEditingTitle(lesson.title);
  };

  const handleInputBlur = () => {
    console.log(editingTitle);
    setEditingLesson(null);
    fetch(`/api/lesson/edit/title`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lesson_id: editingLesson._id, title: editingTitle }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLessons(lessons.map(lesson => lesson._id === editingLesson._id ? { ...lesson, title: editingTitle } : lesson));
      })
      .catch((error) => console.error('Error updating lesson:', error));
  };

  const handleDeleteLesson = async (lesson_id: string) => {
    try {
      const response = await fetch(`/api/lesson/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lesson_id, course_id }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data?.message || 'Failed to delete the lesson.');
      }
  
      // Update lessons and selected lesson
      setLessons((prevLessons) => {
        const updatedLessons = prevLessons.filter((lesson) => lesson._id !== lesson_id);
        if (selectedLesson?._id === lesson_id) {
          setSelectedLesson(updatedLessons.length > 0 ? updatedLessons[0] : null);
        }
        return updatedLessons;
      });
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };
  
  return (
    <div className="p-4 bg-gray-100 shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Course Content</h2>
      <div className="p-1">
        {lessons.map((lesson: any) => (
          <div key={lesson._id} className="flex items-center">
          <div
            className="py-3 px-4 m-2 cursor-pointer rounded-lg flex-auto bg-white hover:bg-gray-200"
            onClick={() => handleLessonClick(lesson)}
            onDoubleClick={() => handleLessonDoubleClick(lesson)}
          >
            {editingLesson === lesson ? (
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onBlur={handleInputBlur}
                className="w-full p-2 border rounded"
                autoFocus
              />
            ) : (
              <div className="flex justify-between items-center">
                <span>{lesson.title}</span>
                <span className="text-sm text-gray-500">{formatTime(lesson.videoDuration)}</span>
              </div>
            )}
          </div>
          <IoMdTrash
                  size={20}
                  className="text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLesson(lesson._id);
                  }}
                />   
          </div>
        ))}
      </div>
      <div
        className="mx-4 p-4 py-1 cursor-pointer border-b rounded-2xl bg-white hover:bg-gray-200"
        onClick={() => haddleAddNewLesson()}
      >
        <div className="flex items-center gap-1">
          <IoMdAddCircle size={30} />
          <span>Add New</span>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;