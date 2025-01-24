"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Breadcrumb from "../../components/Navigation"; // Import Breadcrumb
import PageSearchBox from "../../components/PageSearchBox"; // Import PageSearchBox

const QuestionPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected option:", selectedOption);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex-1">
            <Breadcrumb
              paths={[{ name: "Home", link: "/" }, { name: "Quiz", link: "/quiz" }, { name: "Question" }]} 
            />
            <h1 className="text-2xl font-bold">Quiz</h1>
          </div>
          <div className="flex-1 justify-center">
            
          </div>
        </div>
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="question"
                className="block text-gray-700 font-medium mb-2"
              >
                Question:
              </label>
              <input
                type="text"
                id="question"
                name="question"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Options:
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="option1"
                    name="option"
                    value="Option 1"
                    checked={selectedOption === "Option 1"}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  <label htmlFor="option1" className="text-gray-700">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="option2"
                    name="option"
                    value="Option 2"
                    checked={selectedOption === "Option 2"}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  <label htmlFor="option2" className="text-gray-700">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="option3"
                    name="option"
                    value="Option 3"
                    checked={selectedOption === "Option 3"}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  <label htmlFor="option3" className="text-gray-700">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="option4"
                    name="option"
                    value="Option 4"
                    checked={selectedOption === "Option 4"}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  <label htmlFor="option4" className="text-gray-700">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
