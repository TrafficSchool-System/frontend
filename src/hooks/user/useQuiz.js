import { useState, useEffect } from "react";
import quizService from "../../services/user/quizService";
import useError from "../useError";

const useQuiz = (subjects = [], limit = 10, load = false) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const {error, handleError, clearError } = useError();

  useEffect(() => {
    if (!load || subjects.length === 0) return;

    const fetchQuestions = async () => {
      setLoading(true);
      clearError(); // Rensa tidigare fel
      try {
        const data = await quizService.getQuestionsBySubjects(subjects, limit);
        setQuestions(data);
      } catch {
        handleError(err, "Kunde inte hämta frågor");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subjects, limit, load, handleError, clearError]);

  return { questions, loading, error, clearError, setQuestions };
};

export default useQuiz;
