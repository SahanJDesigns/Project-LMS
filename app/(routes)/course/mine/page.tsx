"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/Sidebar";
import CourseCard from "@/components/CourseCard";
import DropdownMenu from "@/components/DropdownMenu";
import PageSearchBox from "@/components/PageSearchBox";
import Breadcrumb from "@/components/Navigation";
import {ICourse} from "@/types/interfaces";
import NavigationBar from "@/components/NavigationBar";
import { IoMdAddCircle } from "react-icons/io";
import Link from "next/link";

const CoursePage: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sortValue, setSortValue] = useState("latest");
  const [categoryValue, setCategoryValue] = useState("all");
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch(`/api/course/enrolled`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const data = await response.json();
          setCourses(data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
  
      fetchCourses();
    }, []);

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
    router.push(`/course/toenroll`);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:ml-52" >
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex-1  bg-gray-100">
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
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            <Link href="/course/new" className="bg-gray-100 shadow-md rounded-lg justify-center items-center flex">
              <IoMdAddCircle className="text-[70px]" />
            </Link>
            {filteredCourses.map((course, index) => (
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