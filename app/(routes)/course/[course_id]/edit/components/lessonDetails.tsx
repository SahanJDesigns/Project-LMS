import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import Resources from './resources';
import { useGlobalState } from '../stateContext';



const LessonDetails: React.FC = () => {
  const [editing, setEditing] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [view, setView] = useState('Resources');
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

  const handleDoubleClick = (field: string) => {
    setEditing(field);
    setEditingContent(selectedLesson[field] || '');
  };

  const handleOnChange = (field: string) => {
    setEditingContent(field);
  };
  const handleInputBlur = async (field: string, value: string) => {
    setEditing("");
    try {
      const response = await fetch(`/api/lesson/edit/${field}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lesson_id: selectedLesson._id,
          [field]: value,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setSelectedLesson({ ...selectedLesson, [field]: value });
    } catch (error) {
      console.error('Failed to update lesson:', error);
    }
  };
  return (
    <div className='my-3'>
      <div className='bg-gray-100 rounded-lg p-4 mb-6 shadow-md'>
        {/* Title */}
        {editing !== 'title' ? (
          <h3 className="text-lg font-semibold" onDoubleClick={() => handleDoubleClick('title')}>
            {selectedLesson?.title || 'Select a Lesson'}
          </h3>
        ) : (
          <input
            type="text"
            value={editingContent}
            autoFocus
            onChange={(e) => handleOnChange(e.target.value)}
            onBlur={() => handleInputBlur('title', editingContent)}
            className="w-full border-b border-gray-500"
          />
        )}

        {/* Description */}
        {editing !== 'description' ? (
          <p className="text-gray-700 mb-2" onDoubleClick={() => handleDoubleClick('description')}>
            <strong>Description:</strong> {selectedLesson?.description || 'No description available.'}
          </p>
        ) : (
          <input
            type="text"
            value={editingContent}
            autoFocus
            onChange={(e) => handleOnChange(e.target.value)}
            onBlur={() => handleInputBlur('description', editingContent)}
            className="w-full border-b border-gray-500"
          />
        )}

        {/* Summary */}
        {editing !== 'summary' ? (
          <p className="text-gray-600 mb-2" onDoubleClick={() => handleDoubleClick('summary')}>
            <strong>Summary:</strong> {selectedLesson?.summary || 'No summary available.'}
          </p>
        ) : (
          <input
            type="text"
            value={editingContent}
            autoFocus
            onChange={(e) => handleOnChange(e.target.value)}
            onBlur={() => handleInputBlur('summary', editingContent)}
            className="w-full border-b border-gray-500"
          />
        )}

        {/* Content */}
        {editing !== 'content' ? (
          <p className="text-gray-500 mb-4" onDoubleClick={() => handleDoubleClick('content')}>
            <strong>Content:</strong> {selectedLesson?.content || 'No content available.'}
          </p>
        ) : (
          <input
            type="text"
            value={editingContent}
            autoFocus
            onChange={(e) => handleOnChange(e.target.value)}
            onBlur={() => handleInputBlur('content', editingContent)}
            className="w-full border-b border-gray-500"
          />
        )}

        {/* Comments or resources select buttons */}
        <div className="mt-4 flex gap-2">
          <Button variant={view === 'Resources' ? 'default' : 'ghost'} size="sm" onClick={() => setView('Resources')}>
            Resources
          </Button>
        </div>
      </div>

      {/* Resources or comments view panel */}
      <div className='bg-gray-100 rounded-lg shadow-md'>
        <Resources/>
      </div>
    </div>
  );
};

export default LessonDetails;
