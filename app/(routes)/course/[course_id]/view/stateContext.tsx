import { useParams } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface StateContextType {
  lessons: any[];
  setLessons: React.Dispatch<React.SetStateAction<any[]>>;
  videolink: string;
  setVideoLink: React.Dispatch<React.SetStateAction<string>>;
  selectedLesson: any;
  setSelectedLesson: React.Dispatch<React.SetStateAction<any>>;
  resources: any[];
  setResources: React.Dispatch<React.SetStateAction<any[]>>;  
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a Context with a default value
const StateContext = createContext<StateContextType | undefined>(undefined);

// Create a provider component
export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  {// Url context
  const params = useParams();
  const course_id = params?.course_id as string;

  // State context
  const [lessons, setLessons] = useState<any[]>([]);
  const [videolink, setVideoLink] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [resources,setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Loading lessons
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
  }, [course_id]);

  // Loading 

  // Loading resources
   useEffect(() => {
          setLoading(true);
          const fetchResources = async () => {
              if (!selectedLesson) return;
              setLoading(true);
              const res = await fetch(`/api/lesson/${selectedLesson._id}/resource`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                  },
              });
              const data = await res.json();
              setResources(data);
              setLoading(false);
          };
          fetchResources();
      }, [selectedLesson]);
    

  return (
    <StateContext.Provider
      value={{
        lessons,
        setLessons,
        videolink,
        setVideoLink,
        selectedLesson,
        setSelectedLesson,
        resources,
        setResources,
        loading,
        setLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

}

// Hook to use the context
export const useGlobalState = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a StateProvider');
  }
  return context;
};
