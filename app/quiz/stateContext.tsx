import { IQuiz } from "@/types/interface";

interface stateContext {
    quizes: IQuiz[];
    loading: boolean;
    error: string;
    isSidebarOpen: boolean;
    sortValue: string;
    categoryValue: string;
    toggleSidebar: () => void;
    sortOptions: { value: string; label: string }[];
    categoryOptions: { value: string; label: string }[];
    processedQuizzes: IQuiz[];
}