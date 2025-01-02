"use client";

import React, { useState, useEffect, useRef } from "react";
import { instructor } from "./components/instructor";
import { syllabusData } from "./components/syllabus";
import { reviews } from "./components/reviews";
import { courseDetails } from "./components/courseDetails";

const CoursePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("description");
  
  const sectionRefs = {
    description: useRef<HTMLDivElement | null>(null),
    instructor: useRef<HTMLDivElement | null>(null),
    syllabus: useRef<HTMLDivElement | null>(null),
    reviews: useRef<HTMLDivElement | null>(null),
  };

  // Load active section from session storage on page load
  useEffect(() => {
    const savedSection = sessionStorage.getItem("activeSection");
    if (savedSection) {
      setActiveSection(savedSection);
    }
  }, []);

  // Save active section to session storage whenever it changes
  useEffect(() => {
    if (activeSection) {
      sessionStorage.setItem("activeSection", activeSection);
    }
  }, [activeSection]);

  // Handle scroll and set active section
  const handleScroll = () => {
    Object.keys(sectionRefs).forEach((section) => {
      const ref = sectionRefs[section as keyof typeof sectionRefs].current;
      if (ref) {
        const rect = ref.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
          setActiveSection(section);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to the relevant section when clicked
  const scrollToSection = (section: string) => {
    const ref = sectionRefs[section as keyof typeof sectionRefs].current;
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
      setActiveSection(section);
    }
  };

  return (
    <main className="course-page p-8 grid grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="col-span-2">
        <header className="course-header mb-8">
          <h1 className="text-4xl font-bold mb-4">{courseDetails.title}</h1>
          <p className="mb-4">{courseDetails.intro}</p>
          <p className="text-sm mb-4">
            <strong className="text-yellow-500">{courseDetails.rating}</strong> 
            ({courseDetails.ratingsCount} ratings) | {courseDetails.totalHours} Total Hours · {courseDetails.lecturesCount} Lectures · {courseDetails.level}
          </p>
            <div className="course-meta mb-4">
            <span className="text-gray-700 text-sm">{instructor.image} Created by {instructor.name}</span>
            </div>
            <div className="course-meta mb-4">
            <span className="text-gray-700 text-sm">🌐 {courseDetails.languages.join(", ")}</span>  
            </div>
        </header>

        {/* Navigation */}
        <nav className="mb-8 flex space-x-4">
          {["description", "instructor", "syllabus", "reviews"].map((section) => (
            <button
              key={section}
              className={`py-2 px-4 rounded ${
                activeSection === section ? "bg-gray-300" : "bg-gray-100"
              }`}
              onClick={() => scrollToSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>

        {/* Sections */}
        <div className="course-sections" style={{ maxHeight: "500px", overflowY: "scroll" }}>
          <section
            ref={sectionRefs.description}
            className={`section mb-8 pt-4 pb-4 border-t-2 border-b-2 ${activeSection === "description" ? "bg-gray-200" : ""}`}
          >
            <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
            <p>{courseDetails.description}</p>
            <h2 className="text-xl font-semibold mt-4">Certification</h2>
            <p>{courseDetails.certification}</p>
          </section>

          <section
            ref={sectionRefs.instructor}
            className={`section mb-8 pb-4 border-b-2 ${activeSection === "instructor" ? "bg-gray-200" : ""}`}
          >
            <h2 className="text-2xl font-semibold mb-4">Instructor</h2>
            <div>
              <p>{instructor.name}</p>
              <p className="text-sm">{instructor.role}</p>
                <div className="flex items-center">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    style={{ width: "100px", borderRadius: "50%" }}
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="mr-4 text-sm">
                    <p>📋 {instructor.totalReviews} Reviews</p>
                    <p>🎓 {instructor.totalStudents} Students</p>
                    <p>📚 {instructor.totalCourses} Courses</p>
                  </div>
                </div>
              <p>{instructor.bio}</p>
            </div>
          </section>

          <section
            ref={sectionRefs.syllabus}
            className={`section mb-8 pb-4 border-b-2 ${activeSection === "syllabus" ? "bg-gray-200" : ""}`}
          >
            <h2 className="text-2xl font-semibold mb-4">Syllabus</h2>
            <div className="border border-gray-300 p-4 rounded-lg max-w-[900px] mx-auto">
              {syllabusData.map((item, index) => (
              <div key={index} className="py-2 border-b last:border-b-0 flex items-center">
                <span className="font-medium flex-[3]">{item.title}</span>
                <span className="text-sm text-left flex-1">{item.lessons} Lessons</span>
                <span className="text-sm text-left flex-1">{item.duration}</span>
              </div>
              ))}
            </div>
          </section>

          <section
            ref={sectionRefs.reviews}
            className={`section pb-4 border-b-2 ${activeSection === "reviews" ? "bg-gray-200" : ""}`}
          >
            <h2 className="text-2xl font-semibold mb-4">Learner Reviews</h2>
            {reviews.map((review, index) => (
              <div key={index} className="review mb-4 p-4 border rounded">
                <p className="font-semibold">
                  <strong>{review.name}</strong> - {review.date}
                </p>
                <p className="text-yellow-500">Rating: {"⭐".repeat(review.rating)}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Right Column */}
      <aside className="col-span-1">
        <div className="sticky top-8 bg-white p-6 rounded-lg shadow-md">
          {/* Course Image */}
          <img src="/course-image.jpg" alt="Course Image" className="w-full rounded-lg mb-4" />

          {/* Pricing */}
          <div className="pricing text-center mb-6">
            <div className="text-3xl font-bold text-gray-800">${courseDetails.price}</div>
            <div className="text-gray-500 line-through">${courseDetails.originalPrice}</div>
            <div className="text-green-600 font-semibold">{courseDetails.discount}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 mb-6">
            <button className="bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-black hover:text-white border border-black">
              Add to Cart
            </button>
            <button className="bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-black hover:text-white border border-black">
              Buy Now
            </button>
          </div>

          {/* Share Section */}
          <div className="share text-center">
            <p className="text-gray-600 mb-2">Share</p>
            <div className="flex justify-center space-x-4">
              <a href="https://www.facebook.com/" className="text-blue-600">
                <img src="/assets/facebook_icon.png" alt="Facebook" />
              </a>
              <a href="https://www.github.com/" className="text-gray-900">
                <img src="/assets/github_icon.png" alt="Github" />
              </a>
              <a href="https://www.google.com/" className="text-red-500">
                <img src="/assets/google_icon.png" alt="Google" />
              </a>
              <a href="https://www.x.com/" className="text-blue-400">
                <img src="/assets/x_icon.png" alt="X" />
              </a>
              <a href="https://www.microsoft.com/" className="text-blue-800">
                <img src="/assets/microsoft_icon.png" alt="Microsoft" />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default CoursePage;



