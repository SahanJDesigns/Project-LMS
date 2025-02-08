import React, { createContext, use, useContext, useState } from 'react';

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
  const [lessons, setLessons] = useState<any[]>([]);
  const [videolink, setVideoLink] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [resources,setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  
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

// Hook to use the context
export const useGlobalState = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a StateProvider');
  }
  return context;
};
