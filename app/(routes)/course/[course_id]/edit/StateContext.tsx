import React, { createContext, useContext, useState } from 'react';

interface StateContextType {
  lessons: any[];
  setLessons: React.Dispatch<React.SetStateAction<any[]>>;
  videolink: string;
  setVideoLink: React.Dispatch<React.SetStateAction<string>>;
  selectedLesson: any;
  setSelectedLesson: React.Dispatch<React.SetStateAction<any>>;
  isVideoUploaderOpen: boolean;
  setIsVideoUploaderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isResourceUploaderOpen: boolean;
  setIsResourceUploaderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resources: any[];
  setResources: React.Dispatch<React.SetStateAction<any[]>>;
}

// Create a Context with a default value
const StateContext = createContext<StateContextType | undefined>(undefined);

// Create a provider component
export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [videolink, setVideoLink] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isVideoUploaderOpen, setIsVideoUploaderOpen] = useState(false);
  const [isResourceUploaderOpen, setIsResourceUploaderOpen] = useState(false);
  const [resources,setResources] = useState<any[]>([]);

  return (
    <StateContext.Provider
      value={{
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Hook to use the context
export const useGlobalState = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a StateProvider');
  }
  return context;
};
