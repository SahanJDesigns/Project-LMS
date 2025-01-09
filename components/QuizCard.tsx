import React from 'react';
import { useRouter } from "next/navigation";

interface QuizCardProps {
  quiz_id: string;
  title: string;
  category: string;
  image: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz_id, title, category, image }) => {
  const router = useRouter();
  return (
    <div
      className="bg-gray-100 shadow-md rounded-lg overflow-hidden"
      onClick={() => router.push(`/question/setup/${quiz_id}`)} 
    >
      <div className="p-2 rounded-lg overflow-hidden">
        <img
          src={image || 'https://via.placeholder.com/300'}
          alt={title}
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-purple-700 uppercase font-medium">{category}</p>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>
    </div>
  );
};

export default QuizCard;
