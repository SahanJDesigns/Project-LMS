import React from 'react';

interface CourseCardProps {
  title: string;
  category: string;
  image?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, category, image }) => {
  console.log(image);
  return (
    <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden">
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

export default CourseCard;
