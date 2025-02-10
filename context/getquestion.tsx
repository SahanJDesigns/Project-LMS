import axios from "axios";
import { useEffect, useState } from "react";

const useGetQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizes = async () => {
    try {
      const res = await axios.get("/api/questions");
      setQuestions(res.data); // Assuming the API returns an array of quizzes
      setError(null); // Clear any previous error
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching quizzes:", err.message);
        setError(err.message); // Use the error message from the Error object
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizes();
  }, []);

  return { questions, loading, error };
};

export default useGetQuestion;
