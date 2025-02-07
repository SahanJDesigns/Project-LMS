export interface CourseDetail {
    title: string;
    intro: string;
    description: string;
    certification: string;
    rating: number;
    languages: string[];
    ratingsCount: number;
    totalHours: number;
    lecturesCount: number;
    level: string
    price: number
    originalPrice: number;
    discount: string
}

export const courseDetails: CourseDetail= 
    {
      title: "Introduction to User Experience Design",
      intro: "This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional user experiences in the digital landscape.",
      description: "This course is designed to help you develop a deep understanding of user experience design. You'll learn key principles, explore real-world applications, and gain the skills needed to create engaging, user-centered digital experiences.",
      certification: "At Byway, we understand the significance of formal recognition for your hard work and dedication to continuous learning. Upon successful completion of our courses, you will earn a prestigious certification that not only validates your expertise but also opens doors to new opportunities in your chosen field.",
      rating: 4.6,
      languages: ["English", "Spanish", "Italian", "German"],
      ratingsCount: 165951,
      totalHours: 22,
      lecturesCount: 155,
      level: "All levels",
      price: 49.5,
      originalPrice: 99.5,
      discount: "50% Off",
    }
  