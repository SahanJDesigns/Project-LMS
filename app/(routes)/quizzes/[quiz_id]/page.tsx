"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import Breadcrumb from "@/components/Navigation";
import { ICourse } from "@/types/interfaces";
import { IQuestion, IQuiz } from "@/types/interfaces";

const SetUpPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [CurrentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shortAnswer, setShortAnswer] = useState<string>("");
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [matchingAnswers, setMatchingAnswers] = useState<
    Record<string, string>
  >({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const router = useRouter();
  const params = useParams();
  const quizID = params?.quiz_id;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/quizes/${quizID}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch quiz");
        const data = await res.json();
        setQuiz(data);
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
    fetchQuiz();
  }, [quizID]);

  const handleShortAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShortAnswer(e.target.value);
  };

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>Quiz not found</p>;

  const handleStartClick = async () => {
    if (!quiz || !quiz.questions?.length) return;
    try {
      const questionData = await Promise.all(
        quiz.questions.map(async (questionID) => {
          const res = await fetch(`/api/questions/${questionID}`);
          if (!res.ok)
            throw new Error(`Failed to fetch question ${questionID}`);
          return res.json();
        })
      );
      setQuestions(questionData);
      setQuizStarted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching questions."
      );
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!quiz) return <p>Quiz not found</p>;

  if (!quizStarted) {
    return (
      <div className="flex lg:ml-52">
        <Sidebar
          showSidebar={isSidebarOpen}
          setShowSidebar={setIsSidebarOpen}
        />
        <div className="flex-1 p-4">
          <Breadcrumb
            paths={[
              { name: "Home", link: "/" },
              { name: "Quiz", link: "/quiz" },
              { name: quiz.name, link: `/quiz/${quizID}` },
            ]}
          />
          <h1 className="text-2xl font-bold mb-4">{quiz.name}</h1>

          <div className="bg-gray-100 min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Recent Quizzes
              </h1>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="relative md:w-2/3">
                  <img
                    src={quiz.image || "https://via.placeholder.com/600x400"}
                    alt="Quiz Thumbnail"
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>

                <div className="md:w-1/3 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {quiz.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {quiz.description ?? ""}
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2 mb-6">
                    <li>
                      <strong>Date:</strong> {quiz.date}
                    </li>
                    <li>
                      <strong>Category:</strong>{" "}
                      {typeof quiz.course_id === "object" &&
                      quiz.course_id !== null
                        ? (quiz.course_id as unknown as ICourse).category
                        : "Unknown"}
                    </li>
                    <li>
                      <strong>Time Limit:</strong> {quiz.timelimit}
                    </li>
                    <li>
                      <strong>Total Questions:</strong> {quiz.totalQuestions}
                    </li>
                    <li>
                      <strong>Attempts:</strong> {quiz.attempts}
                    </li>
                    <li>
                      <strong>Pass Points:</strong> {quiz.passGrade}
                    </li>
                  </ul>
                  <button
                    className="w-full bg-blue-700 text-white py-2 px-4 rounded-full hover:bg-blue-800"
                    onClick={handleStartClick}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[CurrentQuestionIndex];
  const handleNext = () => setCurrentQuestionIndex((prev) => prev + 1);
  const handlePrevious = () =>
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar showSidebar={isSidebarOpen} setShowSidebar={setIsSidebarOpen} />
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
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Match the following:
                </label>
                <div className="flex flex-wrap gap-3 mb-6">
                  {currentQuestion.options?.map((option, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-blue-200 rounded cursor-pointer text-sm text-center"
                      draggable
                      onDragStart={() => handleDragStart(option.value || "")}
                    >
                      {option.value}
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="text-gray-700 font-medium text-sm">
                        {option.key}
                      </span>
                      <div
                        className="flex-1 px-4 py-2 border border-dashed rounded bg-gray-50 text-sm text-gray-500 text-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(option.key || "")}
                      >
                        {matchingAnswers[option.key || ""] || "Drop here"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
              hidden={CurrentQuestionIndex === 0}
              >
              Previous
              </button>
              <div className="ml-auto">
              {CurrentQuestionIndex < questions.length - 1 ? (
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetUpPage;
