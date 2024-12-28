import React from "react";

interface CardProps {
  category: string;
  title: string;
  rating: number;
  students: number;
  price: number;
  imageUrl: string;
}

const CourseBuyCard: React.FC<CardProps> = ({
  category,
  title,
  rating,
  students,
  price,
  imageUrl,
}) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden">
      {/* Image Wrapper */}
      <div className="p-2 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-sm text-purple-700 uppercase font-medium">
          {category}
        </p>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800">
          {title}
        </h3>

        {/* Rating and Students */}
        <div className="flex justify-between items-center text-gray-600 text-sm mt-2">
          <div className="flex items-center">
            <span>⭐</span>
            <span className="ml-1">{rating}</span>
          </div>
          <div className="flex items-center">
            <span>👤</span>
            <span className="ml-1">{students.toLocaleString()} students</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-xl font-bold text-gray-800 mt-4">
          ${price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CourseBuyCard;