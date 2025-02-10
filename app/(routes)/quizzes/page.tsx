"use client";
import React, { use, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import QuizCard from "./quizCard";
import PageSearchBox from "../../../components/PageSearchBox";
import Breadcrumb from "@/components/Navigation";
import DropdownMenu from "../../../components/DropdownMenu";
import useGetQuiz from "@/context/getquiz";
import { ICourse } from "@/types/interfaces";
import NavigationBar from "@/components/NavigationBar";
import { IQuiz } from "@/types/interfaces";

const QuizPage: React.FC = () => {
  const [quizzes, setQuizes] = useState<IQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizes = async () => {
      try {
        const res = await fetch("/api/quizes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        setQuizes(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching quizzes:", err.message);
          setError(err.message);
        } else {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuizes();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortValue, setSortValue] = useState("latest");
  const [categoryValue, setCategoryValue] = useState("all");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "development", label: "Development" },
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
  ];

  // **Filter and Sort Quizzes**
  const processedQuizzes: IQuiz[] = quizzes
    .filter(
      (quiz: IQuiz) =>
        categoryValue === "all" ||
        (quiz.course_id &&
          (quiz.course_id as unknown as ICourse).category.toLowerCase() ===
            categoryValue)
    )
    .sort((a: IQuiz, b: IQuiz) => {
      if (sortValue === "latest") {
        return b.name.localeCompare(a.name); // Example sort by title (latest)
      } else {
        return a.name.localeCompare(b.name); // Example sort by title (oldest)
      }
    });

  return (
    <div className="lg:ml-52">
      <Sidebar showSidebar={isSidebarOpen} setShowSidebar={setIsSidebarOpen} />
      <NavigationBar
        setShowSidebar={setIsSidebarOpen}
        showSidebar={isSidebarOpen}
      />
      <div className="flex-1 p-6 min-h-full">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-lg w-full lg:w-auto"
                style={{ width: "200px" }}
              />
              <button
                className="px-4 py-2 bg-blue-700 text-white rounded-full w-full md:w-36"
                style={{ width: "150px" }}
              >
                Search Quiz
              </button>
            </div>
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
            </div>
          </div>
          {loading && <p>Loading quizzes...</p>}
          {error && <p>Error loading quizzes: {error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {!loading &&
              processedQuizzes.map((quiz, index) => (
                <QuizCard
                  key={index}
                  quiz_id={quiz._id}
                  title={quiz.name}
                  category={
                    typeof quiz.course_id === "object" &&
                    quiz.course_id !== null &&
                    "category" in quiz.course_id
                      ? (quiz.course_id as unknown as ICourse).category
                      : "Unknown"
                  }
                  image={quiz.image || "default-image-url.jpg"}
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

export default QuizPage;
