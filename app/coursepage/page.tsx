"use client";
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import CourseCard from '../../components/CourseCard';

interface Course {
  title: string;
  category: string;
  image?: string;
}

const CoursePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const courses: Course[] = [
    { title: 'Premiere Pro CC for Beginners', category: 'Development', image: '' },
    { title: 'Advanced React Techniques', category: 'Development', image: '' },
    { title: 'Mastering Python', category: 'Programming', image: '' },
    // Add more course data as needed
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Quiz</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-6 space-y-4 lg:space-y-0">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg w-full lg:w-auto"
              style={{ width: '200px' }}
            />
            <div className="flex flex-col lg:flex-row lg:space-x-4 ml-auto space-y-4 lg:space-y-0">
              <div className="flex flex-col">
                <label className="mb-1">Sort</label>
                <select className="w-full lg:w-40 px-4 py-2 border rounded-lg">
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-1">Category</label>
                <select className="w-full lg:w-40 px-4 py-2 border rounded-lg">
                  <option value="all">All Categories</option>
                  <option value="development">Development</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  {/* Add more categories as needed */}
                </select>
              </div>
              <button className="px-4 py-2 bg-blue-700 text-white rounded-full w-full lg:w-36" style={{ width: '150px' }}>Search Quiz</button>
              <button className="px-4 py-2 bg-purple-700 text-white rounded-full w-full lg:w-36" style={{ width: '150px' }}>New Courses</button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                category={course.category}
                image={course.image}
              />
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center items-center space-x-2">
          <button className="px-3 py-1 bg-gray-300 rounded-md">1</button>
          <button className="px-3 py-1 bg-blue-700 text-white rounded-md">2</button>
          <button className="px-3 py-1 bg-gray-300 rounded-md">3</button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;