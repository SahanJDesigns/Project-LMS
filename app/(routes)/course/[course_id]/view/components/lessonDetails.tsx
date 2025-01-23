import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import Resources from './resources';
import { useGlobalState } from '../stateContext';
import { Skeleton } from '@/components/ui/skeleton';

const LessonDetails: React.FC = () => {
  const [view, setView] = useState('Resources');
  const { selectedLesson } = useGlobalState();
  
  const { 
    loading,
  } = useGlobalState();

  return (
    <>
      <div className='m-3'>
      <div className='bg-gray-100 rounded-lg p-4 mb-6  shadow-md'>
        {/* Title */}
        <div className="flex text-lg font-semibold my-2">
        {loading ? <Skeleton style={{ width: '100%', height: '24px' }} /> : <span>{selectedLesson?.title}</span>}
        </div>
        {/* Description */}
        <div className="flex text-gray-700 my-2">
        <strong>Description:</strong> {loading ? <Skeleton style={{ width: '100%', height: '20px' }} /> : <span>{selectedLesson?.description}</span>}
        </div>
        <div className="flex text-gray-600 my-2">
        <strong>Summary:</strong> {loading ? <Skeleton style={{ width: '100%', height: '20px' }} /> : <span>{selectedLesson?.summary}</span>}
        </div>
        <div className="flex text-gray-500 mt-2 mb-4">
        <strong>Content:</strong> {loading ? <Skeleton style={{ width: '100%', height: '20px' }} /> : <span>{selectedLesson?.content}</span>}
        </div>
        <Button variant={view === 'Resources' ? 'default' : 'ghost'} size="sm" onClick={() => setView('Resources')}>
        Resources
        </Button>
        <Button variant={view === 'Comments' ? 'default' : 'ghost'} size="sm" onClick={() => setView('Comments')}>
        Comments
        </Button>
      </div>
      </div>
      {/* Resources or comments view panel */}
      <div className='bg-gray-100 rounded-lg shadow-md'>
      {view === 'Resources' && (
        <Resources />
      )}
      </div>
    </>
  );
}

export default LessonDetails