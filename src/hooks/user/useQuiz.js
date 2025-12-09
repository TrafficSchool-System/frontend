import { useState, useEffect } from "react";
import getQuestionsBySubject from "../../services/user/quizService";

const useQuiz = (subjectId, limit = 10) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getQuestionsBySubject(subjectId, limit);
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (subjectId) fetchQuestions();
  }, [subjectId, limit]);

  return { questions, loading, error };
};

export default useQuiz;
