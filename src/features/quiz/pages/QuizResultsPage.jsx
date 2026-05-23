import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import ResultPanel from "../components/ResultPanel";

const QuizResultsPage = () => {
  const navigate = useNavigate();
  const { questions, answers, resetQuiz } = useQuizContext();

  // Redirect om inga frågor eller svar finns
  useEffect(() => {
    if (questions.length === 0) {
      navigate("/quiz/practice/subjects");
    }
  }, [questions, navigate]);

  const handleNewQuiz = () => {
    resetQuiz();
    navigate("/quiz/practice/subjects");
  };

  if (questions.length === 0) {
    return null; // Redirect körs i useEffect
  }

  const handleGoHome = () => {
    resetQuiz();
    navigate("/");
  };

  return (
    <ResultPanel
      questions={questions}
      answers={answers}
      onNewQuiz={handleNewQuiz}
      onGoHome={handleGoHome}
    />
  );
};

export default QuizResultsPage;
