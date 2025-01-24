import React from 'react';
import { useRouter } from "next/navigation";

interface QuizBuyCardProps {
  quiz_id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  timelimit: string;
  totalQuestions: number;
  date: string;
  passGrade: number;
  attempts: number;
  
}

const QuizBuyCard: React.FC<QuizBuyCardProps> = ({quiz_id, title, category, imageUrl, description,timelimit,totalQuestions,date,passGrade,attempts}) => {
  const router = useRouter();

  const handleStartClick = () => {
    router.push(`/quiz/${quiz_id}/question`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Recent Quizzes</h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="relative md:w-2/3">
            <img
              src={imageUrl || "https://via.placeholder.com/600x400"}
              alt="Quiz Thumbnail"
              className="w-full h-48 md:h-full object-cover"
            />
          </div>

          <div className="md:w-1/3 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {description}
            </p>
            <ul className="text-sm text-gray-700 space-y-2 mb-6">
              <li><strong>Date:</strong> {date}</li>
              <li><strong>Category:</strong> {category}</li>
              <li><strong>Time Limit:</strong> {timelimit}</li>
              <li><strong>Total Questions:</strong> {totalQuestions}</li>
              <li><strong>Attempts:</strong> {attempts}</li>
              <li><strong>Pass Points:</strong> {passGrade}</li>
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
  );
};

export default QuizBuyCard;
