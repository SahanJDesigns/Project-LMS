"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/Sidebar";
import CourseCard from "@/components/CourseCard";
import DropdownMenu from "@/components/DropdownMenu";
import PageSearchBox from "@/components/PageSearchBox";
import Breadcrumb from "@/components/Navigation";
import { ICourse } from "@/types/interfaces";
import NavigationBar from "@/components/NavigationBar";

const CoursePage: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sortValue, setSortValue] = useState("latest");
  const [categoryValue, setCategoryValue] = useState("all");
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const userId = "67878371f4c16ce1e422c120";

  const fetchTotalCourses = async (category: string) => {
    try {
      const response = await fetch(`/api/course/count?category=${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      setTotalPages(data.totalCourses); // Assuming 10 courses per page
      console.log(data.totalCourses)
    } catch (error) {
      console.error("Error fetching total courses:", error);
    }
  };

  const fetchCourses = async (page: number, category: string) => {
    try {
      const response = await fetch(`/api/course/enrolled?userId=${userId}&category=${category}&page=${page}&limit=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      setCourses(data.courses);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchTotalCourses(categoryValue);
    fetchCourses(1, categoryValue);
  }, [categoryValue]);

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
    { value: "Technology", label: "Technology" },
    // Add more categories as needed
  ];

  const filteredAndSortedCourses = courses
    .filter(course => {
      const matchesSearchTerm = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearchTerm;
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
    router.push(`/course/toenroll`);
  };

  const handlePageChange = (page: number) => {
    fetchCourses(page, categoryValue);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:ml-52">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex-1 bg-gray-100">
        <NavigationBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="bg-white p-6 m-3 rounded-lg shadow-md min-h-full">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6 space-y-4 lg:space-y-0">
            <input
              type="text"
              placeholder="Search title ..."
              className="px-4 py-2 border rounded-lg w-full lg:w-full mr-20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-col md:flex-row gap-4">
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
                className="p-1 bg-blue-700 text-white rounded-full w-36"
              >
                Search Quiz
              </button>
              <button
                className="p-1 bg-purple-700 text-white rounded-full w-36"
                onClick={handleNewCoursesClick}
              >
                New Courses
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {filteredAndSortedCourses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                category={course.category}
                image={course.imageUrl}
              />
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center items-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-700 text-white' : 'bg-gray-300'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;