"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Sidebar from "../../components/Sidebar";
import CourseCard from "../../components/CourseCard";
import DropdownMenu from "../../components/DropdownMenu";
import PageSearchBox from "../../components/PageSearchBox";
import Breadcrumb from "@/components/Navigation";

interface Course {
  title: string;
  category: string;
  thumbnail: string;
  createdAt: string;
}

const CoursePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortValue, setSortValue] = useState("latest");
  const [categoryValue, setCategoryValue] = useState("all");
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const studentId = "6772b6f13bd058646febc9d9";
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/studentcourse?studentId=${studentId}`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [studentId]);

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "development", label: "Development" },
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
    { value: "physics", label: "Physics" },
    { value: "mathematics", label: "Mathematics" },
    // Add more categories as needed
  ];

  const filteredCourses = courses
    .filter(course => {
      const matchesCategory = categoryValue === "all" || course.category.toLowerCase() === categoryValue.toLowerCase();
      const matchesSearchTerm = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    })
    .sort((a, b) => {
      if (sortValue === "latest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortValue === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return 0;
    });

  const handleNewCoursesClick = () => {
    router.push(`/coursebuy?studentId=${studentId}`);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex-1 ">
            <Breadcrumb paths={[{ name: "Home", link: "/" }, { name: "Course" }]} />
            <h1 className="text-2xl font-bold">Course</h1>
          </div>
          <div className="flex-1 justify-center">
            <PageSearchBox />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
            <input
              type="text"
              placeholder="Search title ..."
              className="px-4 py-2 border rounded-lg w-full lg:w-auto"
              style={{ width: "200px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-col md:flex-row md:justify-center md:space-x-4 space-y-4 md:space-y-0">
              <DropdownMenu
                label="Sort"
                options={sortOptions}
                onChange={(e) => setSortValue(e.target.value)}
                value={sortValue}
              />
              <DropdownMenu
                label="Category"
                options={categoryOptions}
                onChange={(e) => setCategoryValue(e.target.value)}
                value={categoryValue}
              />
              <button
                className="px-4 py-2 bg-blue-700 text-white rounded-full w-full md:w-36"
                style={{ width: "150px" }}
              >
                Search Quiz
              </button>
              <button
                className="px-4 py-2 bg-purple-700 text-white rounded-full w-full md:w-36"
                style={{ width: "150px" }}
                onClick={handleNewCoursesClick}
              >
                New Courses
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                category={course.category}
                image={course.thumbnail}
              />
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center items-center space-x-2">
          <button className="px-3 py-1 bg-gray-300 rounded-md">1</button>
          <button className="px-3 py-1 bg-blue-700 text-white rounded-md">
            2
          </button>
          <button className="px-3 py-1 bg-gray-300 rounded-md">3</button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;