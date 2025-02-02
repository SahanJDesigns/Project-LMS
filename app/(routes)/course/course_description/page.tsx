// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { instructor } from "./components/instructor";
// import { syllabusData } from "./components/syllabus";
// import { reviews } from "./components/reviews";
// import { courseDetails } from "./components/courseDetails";

// const CoursePage: React.FC = () => {
//   // Hardcoding course_id for now
//   const courseId = "6787f30310698a7de5667367";
  
//   interface Course {
//     duration: {
//       hours: number;
//       weeks: number;
//     };
//     rating: {
//       average: number;
//       reviews: number;
//     };
//     instructors: string[];
//     lessons: string[];
//     quizzes: string[];
//     comments: string[];
//     _id: string;
//     title: string;
//     category: string;
//     level: string;
//     price: number;
//     language: string;
//     introduction: string;
//     certification: boolean;
//     instructorExperience: string;
//     imageUrl: string;
//     description: string;
//     enrolledStudents: string[];
//     createdAt: string;
//     updatedAt: string;
//   }
  
//   const fetchCourseData = async (courseId: string) => {
//     console.log('Fetching course data...');
//     try {
//       const response = await fetch(`/api/course/onecourse?id=${courseId}`);
//       const data: Course = await response.json();
  
//       const {
//         duration,
//         rating,
//         instructors,
//         lessons,
//         quizzes,
//         comments,
//         _id,
//         title,
//         category,
//         level,
//         price,
//         language,
//         introduction,
//         certification,
//         instructorExperience,
//         imageUrl,
//         description,
//         enrolledStudents,
//         createdAt,
//         updatedAt,
//       } = data;
  
//       console.log(data);

//     } catch (error) {
//       console.error('Error fetching course data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCourseData(courseId);
//   }, []);
  
//   const [activeSection, setActiveSection] = useState<string>("description");
  
//   const sectionRefs = {
//     description: useRef<HTMLDivElement | null>(null),
//     instructor: useRef<HTMLDivElement | null>(null),
//     syllabus: useRef<HTMLDivElement | null>(null),
//     reviews: useRef<HTMLDivElement | null>(null),
//   };

//   // Load active section from session storage on page load
//   useEffect(() => {
//     const savedSection = sessionStorage.getItem("activeSection");
//     if (savedSection) {
//       setActiveSection(savedSection);
//     }
//   }, []);

//   // Save active section to session storage whenever it changes
//   useEffect(() => {
//     if (activeSection) {
//       sessionStorage.setItem("activeSection", activeSection);
//     }
//   }, [activeSection]);

//   // Handle scroll and set active section
//   const handleScroll = () => {
//     Object.keys(sectionRefs).forEach((section) => {
//       const ref = sectionRefs[section as keyof typeof sectionRefs].current;
//       if (ref) {
//         const rect = ref.getBoundingClientRect();
//         if (rect.top <= 0 && rect.bottom >= 0) {
//           setActiveSection(section);
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Function to scroll to the relevant section when clicked
//   const scrollToSection = (section: string) => {
//     const ref = sectionRefs[section as keyof typeof sectionRefs].current;
//     if (ref) {
//       ref.scrollIntoView({ behavior: "smooth" });
//       setActiveSection(section);
//     }
//   };

//   return (
//     <main className="course-page p-8 grid grid-cols-3 gap-8">
//       {/* Left Column */}
//       <div className="col-span-2">
//         <header className="course-header mb-8">
//           <h1 className="text-4xl font-bold mb-4">{title}</h1>
//           <p className="mb-4">{courseDetails.intro}</p>
//           <p className="text-sm mb-4">
//             <strong className="text-yellow-500">{courseDetails.rating}</strong> 
//             ({courseDetails.ratingsCount} ratings) | {courseDetails.totalHours} Total Hours · {courseDetails.lecturesCount} Lectures · {courseDetails.level}
//           </p>
//             <div className="course-meta mb-4">
//             <span className="text-gray-700 text-sm">{instructor.image} Created by {instructor.name}</span>
//             </div>
//             <div className="course-meta mb-4">
//             <span className="text-gray-700 text-sm">🌐 {courseDetails.languages.join(", ")}</span>  
//             </div>
//         </header>

//         {/* Navigation */}
//         <nav className="mb-8 flex space-x-4">
//           {["description", "instructor", "syllabus", "reviews"].map((section) => (
//             <button
//               key={section}
//               className={`py-2 px-4 rounded ${
//                 activeSection === section ? "bg-gray-300" : "bg-gray-100"
//               }`}
//               onClick={() => scrollToSection(section)}
//             >
//               {section.charAt(0).toUpperCase() + section.slice(1)}
//             </button>
//           ))}
//         </nav>

//         {/* Sections */}
//         <div className="course-sections" style={{ maxHeight: "500px", overflowY: "scroll" }}>
//           <section
//             ref={sectionRefs.description}
//             className={`section mb-8 pt-4 pb-4 border-t-2 border-b-2 ${activeSection === "description" ? "bg-gray-200" : ""}`}
//           >
//             <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
//             <p>{courseDetails.description}</p>
//             <h2 className="text-xl font-semibold mt-4">Certification</h2>
//             <p>{courseDetails.certification}</p>
//           </section>

//           <section
//             ref={sectionRefs.instructor}
//             className={`section mb-8 pb-4 border-b-2 ${activeSection === "instructor" ? "bg-gray-200" : ""}`}
//           >
//             <h2 className="text-2xl font-semibold mb-4">Instructor</h2>
//             <div>
//               <p>{instructor.name}</p>
//               <p className="text-sm">{instructor.role}</p>
//                 <div className="flex items-center">
//                   <img
//                     src={instructor.image}
//                     alt={instructor.name}
//                     style={{ width: "100px", borderRadius: "50%" }}
//                     className="w-24 h-24 rounded-full"
//                   />
//                   <div className="mr-4 text-sm">
//                     <p>📋 {instructor.totalReviews} Reviews</p>
//                     <p>🎓 {instructor.totalStudents} Students</p>
//                     <p>📚 {instructor.totalCourses} Courses</p>
//                   </div>
//                 </div>
//               <p>{instructor.bio}</p>
//             </div>
//           </section>

//           <section
//             ref={sectionRefs.syllabus}
//             className={`section mb-8 pb-4 border-b-2 ${activeSection === "syllabus" ? "bg-gray-200" : ""}`}
//           >
//             <h2 className="text-2xl font-semibold mb-4">Syllabus</h2>
//             <div className="border border-gray-300 p-4 rounded-lg max-w-[800px] mx-auto">
//               {syllabusData.map((item, index) => (
//               <div key={index} className="py-2 border-b last:border-b-0 flex items-center">
//                 <span className="font-medium flex-[3]">{item.title}</span>
//                 <span className="text-sm text-right flex-1">{item.duration}</span>
//               </div>
//               ))}
//             </div>
//           </section>

//           <section
//             ref={sectionRefs.reviews}
//             className={`section pb-4 border-b-2 ${activeSection === "reviews" ? "bg-gray-200" : ""}`}
//           >
//             <h2 className="text-2xl font-semibold mb-6">Learner Reviews</h2>

//             {/* Summary */}
//             <div className="reviews-summary flex items-center justify-between mb-6">
//               <div className="text-center">
//                 <p className="text-4xl font-bold text-yellow-500">{courseDetails.rating}</p>
//                 <p className="text-gray-700">{courseDetails.ratingsCount} ratings</p>
//               </div>
//               <div className="flex-1 ml-4">
//                 {[5, 4, 3, 2, 1].map((star) => (
//                   <div key={star} className="flex items-center mb-1">
//                     <span className="w-12 text-sm text-gray-700">{star} Stars</span>
//                     <div className="bg-yellow-500 h-2 flex-1 rounded">
//                       {/* Dynamic width for bar */}
//                       <div
//                       className="bg-gray-300 h-2 rounded"
//                       style={{
//                         width: `${(reviews.filter((r) => r.rating === star).length / reviews.length) * 100}%`,
//                         maxWidth: "50%"
//                       }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Individual Reviews */}
//             <div className="reviews-list space-y-4">
//               {reviews.map((review, index) => (
//                 <div key={index} className="review p-4 border rounded-lg shadow-sm">
//                   <div className="flex items-center justify-between mb-2">
//                     <p className="font-bold">{review.name}</p>
//                     <span className="text-sm text-gray-500">{review.date}</span>
//                   </div>
//                   <p className="text-yellow-500 mb-2">
//                     {"⭐".repeat(review.rating)}{" "}
//                     {"☆".repeat(5 - review.rating)}
//                   </p>
//                   <p className="text-gray-800">{review.comment}</p>
//                 </div>
//                 ))}
//             </div>
//           </section>
          
//         </div>
//       </div>

//       {/* Right Column */}
//       <aside className="col-span-1">
//         <div className="sticky top-8 bg-white p-6 rounded-lg shadow-md">
//           {/* Course Image */}
//           <img src="/course-image.jpg" alt="Course Image" className="w-full rounded-lg mb-4" />

//           {/* Pricing */}
//           <div className="pricing text-center mb-6">
//             <div className="text-3xl font-bold text-gray-800">${courseDetails.price}</div>
//             <div className="text-gray-500 line-through">${courseDetails.originalPrice}</div>
//             <div className="text-green-600 font-semibold">{courseDetails.discount}</div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col space-y-4 mb-6">
//             <button className="bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-black hover:text-white border border-black">
//               Add to Cart
//             </button>
//             <button className="bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-black hover:text-white border border-black">
//               Buy Now
//             </button>
//           </div>

//           {/* Share Section */}
//           <div className="share text-center">
//             <p className="text-gray-600 mb-2">Share</p>
//             <div className="flex justify-center space-x-4">
//               <a href="https://www.facebook.com/" className="text-blue-600">
//                 <img src="/public/course-assets/facebook_icon.png" alt="Facebook" />
//               </a>
//               <a href="https://www.github.com/" className="text-gray-900">
//                 <img src="/public/course-assets/github_icon.png" alt="Github" />
//               </a>
//               <a href="https://www.google.com/" className="text-red-500">
//                 <img src="/public/course-assets/google_icon.png" alt="Google" />
//               </a>
//               <a href="https://www.x.com/" className="text-blue-400">
//                 <img src="/public/course-assets/x_icon.png" alt="X" />
//               </a>
//               <a href="https://www.microsoft.com/" className="text-blue-800">
//                 <img src="/public/course-assets/microsoft_icon.png" alt="Microsoft" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </main>
//   );
// };

// export default CoursePage; 


"use client";

import React, { useState, useEffect, useRef } from "react";

const CoursePage: React.FC = () => {
  const courseId = "6789bdccb807d1b8eb0516aa";

  interface Course {
    duration: {
      hours: number;
      weeks: number;
    };
    rating: {
      average: number;
      reviews: number;
    };
    instructors: string[];
    lessons: string[];
    quizzes: string[];
    comments: { rating: number; comment: string; name: string; date: string }[];
    _id: string;
    title: string;
    category: string;
    level: string;
    price: number;
    language: string;
    introduction: string;
    certification: boolean;
    instructorExperience: string;
    imageUrl: string;
    description: string;
    enrolledStudents: string[];
    createdAt: string;
    updatedAt: string;
  }

  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [activeSection, setActiveSection] = useState<string>("description");

  const sectionRefs = {
    description: useRef<HTMLDivElement | null>(null),
    instructor: useRef<HTMLDivElement | null>(null),
    syllabus: useRef<HTMLDivElement | null>(null),
    reviews: useRef<HTMLDivElement | null>(null),
  };

  const fetchCourseData = async (courseId: string) => {
    console.log('Fetching course data...');
    try {
      const response = await fetch(`/api/course/onecourse?id=${courseId}`);
      const data: Course = await response.json();
      setCourseDetails(data);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  useEffect(() => {
    fetchCourseData(courseId);
  }, [courseId]);

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

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <main className="course-page p-8 grid grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="col-span-2">
        <header className="course-header mb-8">
          <h1 className="text-4xl font-bold mb-4">{courseDetails.title}</h1>
          <p className="mb-4">{courseDetails.introduction}</p>
          <p className="text-sm mb-4">
            <strong className="text-yellow-500">{courseDetails.rating.average}</strong> 
            ({courseDetails.rating.reviews} ratings) | {courseDetails.duration.hours} Total Hours · {courseDetails.level}
          </p>
          <div className="course-meta mb-4">
            <span className="text-gray-700 text-sm">Created by {courseDetails.instructors.join(", ")}</span>
          </div>
          <div className="course-meta mb-4">
            <span className="text-gray-700 text-sm">🌐 {courseDetails.language}</span>  
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
            <p>{courseDetails.certification ? "Yes" : "No"}</p>
          </section>

          <section
            ref={sectionRefs.instructor}
            className={`section mb-8 pb-4 border-b-2 ${activeSection === "instructor" ? "bg-gray-200" : ""}`}
          >
            <h2 className="text-2xl font-semibold mb-4">Instructor</h2>
            <div>
              <p>{courseDetails.instructorExperience}</p>
            </div>
          </section>

          <section
            ref={sectionRefs.syllabus}
            className={`section mb-8 pb-4 border-b-2 ${activeSection === "syllabus" ? "bg-gray-200" : ""}`}
          >
            <h2 className="text-2xl font-semibold mb-4">Syllabus</h2>
            <div className="border border-gray-300 p-4 rounded-lg max-w-[800px] mx-auto">
              {courseDetails.lessons.map((lesson, index) => (
                <div key={index} className="py-2 border-b last:border-b-0 flex items-center">
                  <span className="font-medium flex-[3]">{lesson}</span>
                </div>
              ))}
            </div>
          </section>

          <section
            ref={sectionRefs.reviews}
            className={`section pb-4 border-b-2 ${activeSection === "reviews" ? "bg-gray-200" : ""}`}
          >
            <h2 className="text-2xl font-semibold mb-6">Learner Reviews</h2>

            {/* Summary */}
            <div className="reviews-summary flex items-center justify-between mb-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-yellow-500">{courseDetails.rating.average}</p>
                <p className="text-gray-700">{courseDetails.rating.reviews} ratings</p>
              </div>
              <div className="flex-1 ml-4">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center mb-1">
                    <span className="w-12 text-sm text-gray-700">{star} Stars</span>
                    <div className="bg-yellow-500 h-2 flex-1 rounded">
                      {/* Dynamic width for bar */}
                      <div
                        className="bg-gray-300 h-2 rounded"
                        style={{
                          width: `${(courseDetails.comments.filter((r) => r.rating === star).length / courseDetails.comments.length) * 100}%`,
                          maxWidth: "50%"
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="reviews-list space-y-4">
              {courseDetails.comments.map((comment, index) => (
                <div key={index} className="review p-4 border rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold">{comment.name}</p>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                    <p className="text-yellow-500 mb-2">
                      {"⭐".repeat(comment.rating)}{" "}
                      {"☆".repeat(5 - comment.rating)}
                    </p>
                    <p className="text-gray-800">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Right Column */}
      <aside className="col-span-1">
        <div className="sticky top-8 bg-white p-6 rounded-lg shadow-md">
          {/* Course Image */}
          <img src={courseDetails.imageUrl} alt="Course Image" className="w-full rounded-lg mb-4" />

          {/* Pricing */}
          <div className="pricing text-center mb-6">
            <div className="text-3xl font-bold text-gray-800">${courseDetails.price}</div>
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
                <img src="/public/course-assets/facebook_icon.png" alt="Facebook" />
              </a>
              <a href="https://www.github.com/" className="text-gray-900">
                <img src="/public/course-assets/github_icon.png" alt="Github" />
              </a>
              <a href="https://www.google.com/" className="text-red-500">
                <img src="/public/course-assets/google_icon.png" alt="Google" />
              </a>
              <a href="https://www.x.com/" className="text-blue-400">
                <img src="/public/course-assets/x_icon.png" alt="X" />
              </a>
              <a href="https://www.microsoft.com/" className="text-blue-800">
                <img src="/public/course-assets/microsoft_icon.png" alt="Microsoft" />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default CoursePage;
