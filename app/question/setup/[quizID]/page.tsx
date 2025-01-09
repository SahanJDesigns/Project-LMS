"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar";
import QuizBuyCard from "@/components/QuizBuyCard";
import Breadcrumb from "@/components/Navigation";
import { ICourse, IQuiz } from "@/types/interface";
import useGetQuiz from "@/context/getquiz";

const SetUpPage: React.FC<{ params: { quizID: string } }> = ({ params }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [loading, setLoading] = useState(true);
  const { quizes, error } = useGetQuiz();
  const { quizID } = params;

  useEffect(() => {
    if (quizes) {
      const foundQuiz = quizes.find((quiz: IQuiz) => quiz.quiz_id === quizID);
      setQuiz(foundQuiz || null);
      setLoading(false);
    }
  }, [quizes, quizID]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-4">
        <Breadcrumb
          paths={[
            { name: "Home", link: "/" },
            { name: "Quiz", link: "/quiz" },
            { name: quiz.name, link: `/quiz/${quizID}` },
          ]}
        />
        <h1 className="text-2xl font-bold mb-4">{quiz.name}</h1>
        <QuizBuyCard
          title={quiz.name}
          category={typeof quiz.course_id === 'object' && quiz.course_id !== null ? (quiz.course_id as ICourse).category : 'Unknown'}
          imageUrl={quiz.image}
          description={quiz.description ?? ""}
          timelimit={quiz.timelimit}
          totalQuestions={quiz.totalQuestions}
          date={quiz.date}
          passGrade={quiz.passGrade}
          attempts={quiz.attempts}
        />
      </div>
    </div>
  );
};

export default SetUpPage;
