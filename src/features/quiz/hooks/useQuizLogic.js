import { useState, useEffect } from "react";
import useQuiz from "./useQuiz";
import useError from "@shared/hooks/useError";

const QUIZ_DATA_KEY = "quizData";

const useQuizLogic = (subjects, limit, loadQuestions) => {
  // Återställ från sessionStorage vid reload
  const getSavedQuizData = () => {
    try {
      const saved = sessionStorage.getItem(QUIZ_DATA_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  const savedData = getSavedQuizData();

  const [currentIndex, setCurrentIndex] = useState(
    savedData?.currentIndex || 0,
  );
  const [answers, setAnswers] = useState(savedData?.answers || {});
  const [showResult, setShowResult] = useState(false);

  // Använd useErro hook
  const { error, handleError, clearError } = useError();

  // Hoom som hämtar frågor (skippa om vi redan har dem från sessionStorage)
  const shouldLoadQuestions =
    loadQuestions && (!savedData || !savedData.questions);
  const { questions, loading, setQuestions } = useQuiz(
    subjects,
    limit,
    shouldLoadQuestions,
  );

  // Återställ frågor från sessionStorage om de finns
  useEffect(() => {
    if (savedData?.questions && savedData.questions.length > 0) {
      setQuestions(savedData.questions);
    }
  }, [setQuestions]);

  // Spara quiz data till sessionStorage när den ändras
  useEffect(() => {
    if (questions.length > 0) {
      const dataToSave = {
        questions,
        currentIndex,
        answers,
      };
      sessionStorage.setItem(QUIZ_DATA_KEY, JSON.stringify(dataToSave));
    }
  }, [questions, currentIndex, answers]);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const isCurrentAnswered = answers[currentIndex] !== undefined;

  // Om vi har data från sessionStorage, visa inte loading
  const isLoading = loading && !savedData?.questions;

  const handleSelect = (answer) => {
    if (isCurrentAnswered) return; // Lås frågan
    setAnswers((prev) => ({ ...prev, [currentIndex]: answer }));
  };

  const handleNext = () => {
    if (!isCurrentAnswered) return;
    if (currentIndex < questions.length - 1)
      setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
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
    // Rensa sparad data från sessionStorage när användaren startar om
    sessionStorage.removeItem(QUIZ_DATA_KEY);
  };

  return {
    questions,
    loading: isLoading,
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
    setCurrentIndex,
  };
};

export default useQuizLogic;
