import { useState } from "react";
import useQuiz from "../../hooks/user/useQuiz";
import useError from "../useError";

const useQuizLogic = (subjects, limit, loadQuestions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  // Använd useErro hook 
  const {error, handleError, clearError} = useError();

  // Hoom som hämtar frågor
  const { questions, loading, setQuestions } = useQuiz(subjects, limit, loadQuestions);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const isCurrentAnswered = answers[currentIndex] !== undefined;

  const handleSelect = (answer) => {
    if (isCurrentAnswered) return; // Lås frågan
    setAnswers(prev => ({ ...prev, [currentIndex]: answer }));
  };

  const handleNext = () => {
    if (!isCurrentAnswered) return;
    if (currentIndex < questions.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleFinish = () => {
    if (!allAnswered) {
      handleError("Du måste svara på alla frågor innan du rättar provet!");
      return;
    }
    setShowResult(true);
  };

  const handleRetry = () => {
    setShowResult(false);
    setAnswers({});
    setCurrentIndex(0);
    
  };

  return {
    questions,
    loading,
    error,
    clearError,
    currentIndex,
    currentQuestion: questions[currentIndex],
    answers,
    answeredCount,
    allAnswered,
    isCurrentAnswered,
    showResult,
    handleSelect,
    handleNext,
    handlePrev,
    handleFinish,
    handleRetry,
    setQuestions,
    setAnswers,
    setCurrentIndex
  };
};

export default useQuizLogic;
