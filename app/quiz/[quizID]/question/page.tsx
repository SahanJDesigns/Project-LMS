"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import Breadcrumb from "../../../../components/Navigation";
import useGetQuestion from "@/context/getquestion";
import { useParams } from "next/navigation";
import { IQuestion } from "@/types/interface";

const QuestionPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { questions, error } = useGetQuestion();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shortAnswer, setShortAnswer] = useState<string>("");
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [matchingAnswers, setMatchingAnswers] = useState<
    Record<string, string>
  >({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const quizID = params?.quizID;
  const [filteredQuestions, setFilteredQuestions] = useState<
    IQuestion[] | null
  >(null);

  useEffect(() => {
    if (questions && quizID) {
      console.log("Questions:", questions);
      const foundQuestions = questions.filter(
        (question: IQuestion) => question.quiz.quiz_id === quizID
      );
      setFilteredQuestions(foundQuestions.length > 0 ? foundQuestions : null);
      setLoading(false);
    }
  }, [questions, quizID]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleShortAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShortAnswer(e.target.value);
  };

  const handleNext = () => {
    if (
      filteredQuestions &&
      currentQuestionIndex < filteredQuestions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShortAnswer(""); // Reset for short-answer questions
      setMatchingAnswers({}); // Reset for matching questions
    }
  };

  const handleSubmit = () => {
    console.log("Quiz Submitted!");
    console.log("Matching Answers:", matchingAnswers);
    // Handle submission logic here (e.g., send data to an API)
  };

  const handleDragStart = (text: string) => {
    setDraggedItem(text);
  };

  const handleDrop = (key: string) => {
    if (draggedItem) {
      setMatchingAnswers((prev) => ({ ...prev, [key]: draggedItem }));
      setDraggedItem(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!filteredQuestions || filteredQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">
          No questions available for this quiz.
        </p>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-6 lg:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex-1">
            <Breadcrumb
              paths={[
                { name: "Home", link: "/" },
                { name: "Quiz", link: "/quiz" },
                { name: "Question" },
              ]}
            />
            <h1 className="text-3xl font-bold text-gray-800">Quiz</h1>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <form>
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Question:
              </label>
              <p className="text-gray-800 text-base">{currentQuestion.text}</p>
            </div>

            {currentQuestion.type === "short_answer" && (
              <div className="mb-6">
                <label
                  htmlFor="shortAnswer"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Your Answer:
                </label>
                <input
                  type="text"
                  id="shortAnswer"
                  value={shortAnswer}
                  onChange={handleShortAnswerChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Type your answer here..."
                />
              </div>
            )}

            {currentQuestion.type === "multiple_choice" && (
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Choose the correct answer:
                </label>
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="multipleChoice"
                        value={option.text}
                        className="mr-3 focus:ring-blue-400"
                      />
                      <label
                        htmlFor={`option-${index}`}
                        className="text-gray-700 text-base"
                      >
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentQuestion.type === "true_false" && (
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Choose True or False:
                </label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="true"
                      name="trueFalse"
                      value="true"
                      className="mr-3 focus:ring-blue-400"
                    />
                    <label htmlFor="true" className="text-gray-700 text-base">
                      True
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="false"
                      name="trueFalse"
                      value="false"
                      className="mr-3 focus:ring-blue-400"
                    />
                    <label htmlFor="false" className="text-gray-700 text-base">
                      False
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentQuestion.type === "matching" && (
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Match the following:
                </label>

                {/* Draggable values displayed horizontally */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {currentQuestion.options?.map((option, index) => {
                    const [, value] = option.text.split(" - ");
                    return (
                      <div
                        key={index}
                        className="px-4 py-2 bg-blue-200 rounded cursor-pointer text-sm text-center"
                        draggable
                        onDragStart={() => handleDragStart(value)}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>

                {/* Keys with blank spaces displayed vertically */}
                <div className="space-y-4">
                  {currentQuestion.options?.map((option, index) => {
                    const [key] = option.text.split(" - ");
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <span className="text-gray-700 font-medium text-sm">
                          {key}
                        </span>
                        <div
                          className="flex-1 px-4 py-2 border border-dashed rounded bg-gray-50 text-sm text-gray-500 text-center"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleDrop(key)}
                        >
                          {matchingAnswers[key] || "Drop here"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentQuestionIndex < filteredQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
