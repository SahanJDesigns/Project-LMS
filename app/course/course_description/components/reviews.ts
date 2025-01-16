export interface Review {
    name: string;
    rating: number;
    comment: string;
    date: string;
}
  
export const reviews: Review[] = [
    {
      name: "Mark Doe",
      rating: 5,
      comment:
        "I was initially apprehensive, having no prior design experience. The instructor did an amazing job of breaking down complex concepts into easily digestible modules. The real-world examples really helped solidify my understanding.",
      date: "22nd March, 2024",
    },
];
  