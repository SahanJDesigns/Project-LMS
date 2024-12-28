import React from "react";
import { instructor } from "./components/instructor";
import { syllabusData } from "./components/syllabus";
import { reviews } from "./components/reviews";

const CoursePage: React.FC = () => (
  <main className="course-page p-8">
    <header className="course-header mb-8">
      <h1 className="text-4xl font-bold mb-4">Introduction to User Experience Design</h1>
      <p className="mb-4">
        This course is meticulously crafted to provide you with a foundational understanding
        of the principles, methodologies, and tools that drive exceptional user experiences
        in the digital landscape.
      </p>
      <p className="text-lg mb-4">
        <strong>4.6</strong> (165,951 ratings) | 22 Total Hours · 155 Lectures · All levels
      </p>
      <div className="course-meta mb-4">
        <span className="text-gray-700">Created by {instructor.name}</span>
      </div>
      <div className="pricing mb-4">
        <strong className="text-2xl">$49.5</strong> <span className="line-through text-gray-500">$99</span> <span>50% Off</span>
      </div>
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Add to Cart</button>
        <button className="bg-green-500 text-white py-2 px-4 rounded">Buy Now</button>
      </div>
    </header>

    <section className="instructor mb-8">
      <h2 className="text-2xl font-semibold mb-4">Instructor</h2>
      <div className="flex items-center">
        <img 
          src={instructor.image} 
          alt={instructor.name} 
          style={{ width: "100px", borderRadius: "50%" }} 
          className="w-24 h-24 rounded-full mr-4" 
        />
        <p>{instructor.bio}</p>
      </div>
    </section>

    <section className="syllabus mb-8">
      <h2 className="text-2xl font-semibold mb-4">Syllabus</h2>
      <ul className="list-disc list-inside">
        {syllabusData.map((item, index) => (
          <li key={index} className="mb-2">
            <strong>{item.title}</strong> - {item.lessons} Lessons, {item.duration}
          </li>
        ))}
      </ul>
    </section>

    <section className="reviews">
      <h2 className="text-2xl font-semibold mb-4">Learner Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="review mb-4 p-4 border rounded">
          <p className="font-semibold"><strong>{review.name}</strong> - {review.date}</p>
          <p className="text-yellow-500">Rating: {"⭐".repeat(review.rating)}</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </section>
  </main>
);

export default CoursePage;
