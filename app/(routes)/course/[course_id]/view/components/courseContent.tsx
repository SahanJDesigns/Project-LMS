import { formatTime } from "@/lib/utils";
import { useGlobalState } from "../stateContext";
import { Skeleton } from '@/components/ui/skeleton';



const CourseContent: React.FC = () => {
  const { 
    lessons,
    setLessons,
    videolink,
    setVideoLink,
    selectedLesson,
    setSelectedLesson,
    loading,

  } = useGlobalState();

    const handleLessonClick = (lesson: any) => {
        setSelectedLesson(lesson);
        setVideoLink(lesson.video);
      };
    
  return (
   <div className="p-4 bg-gray-100 shadow rounded-md">
         <h2 className="text-xl font-semibold mb-4">Course Content</h2>
         <div className="p-1">
             {loading ? (
             Array.from({ length: 3 }).map((_, index) => (
                 <div key={index} className="py-3 px-4 m-2 rounded-lg bg-gray-200">
                 <Skeleton className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                 <Skeleton className="h-4 bg-gray-300 rounded w-1/2" />
                 </div>
             ))
             ) : (
             lessons.map((lesson: any) => (
               <div key={lesson._id} className="flex items-center">
               <div
                 className="py-3 px-4 m-2 cursor-pointer rounded-lg flex-auto bg-white hover:bg-gray-200"
                 onClick={() => handleLessonClick(lesson)}
               >
                 <div className="flex justify-between items-center">
                 <span>{lesson.title}</span>
                 <span className="text-sm text-gray-500">{formatTime(lesson.videoDuration)}</span>
                 </div>
               </div>
               </div>
             ))
             )}
         </div>
          
         </div>
  )
};

export default CourseContent