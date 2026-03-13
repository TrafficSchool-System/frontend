import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuizPracticeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/quiz/practice/subjects", { replace: true });
  }, [navigate]);

  return null;
};

export default QuizPracticeRedirect;
