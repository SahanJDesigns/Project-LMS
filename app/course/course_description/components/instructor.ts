export interface InstructorDetails {
    name: string;
    bio: string;
    image: string;
}
  
export const instructor: InstructorDetails = {
    name: "Ronald Richards",
    bio: "With over a decade of industry experience, Ronald brings a wealth of practical knowledge to the classroom. He has played a pivotal role in designing user-centric interfaces for renowned tech companies, ensuring seamless and engaging user experiences.",
    image: "/ronald.jpg",
};
  



/*For .tsx*/
// import React from "react";

// const Instructor: React.FC = () => (
//   <section className="instructor">
//     <h2>Instructor</h2>
//     <div>
//       <img 
//         src="/ronald.jpg" 
//         alt="Ronald Richards" 
//         className="instructor-image" 
//         style={{ width: "100px", borderRadius: "50%" }}
//       />
//       <p>
//         With over a decade of industry experience, Ronald brings a wealth of practical
//         knowledge to the classroom. He has played a pivotal role in designing user-centric
//         interfaces for renowned tech companies, ensuring seamless and engaging user experiences.
//       </p>
//     </div>
//   </section>
// );

// export default Instructor;
