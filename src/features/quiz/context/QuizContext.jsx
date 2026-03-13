import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QUIZ_CONFIG } from "@shared/constants/config";

const QuizContext = createContext(null);

const STORAGE_KEY = "quizState";

export const QuizProvider = ({ children }) => {
  const navigate = useNavigate();

  // Återställ från sessionStorage vid reload
  const getSavedState = () => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  const savedState = getSavedState();

  const [subjects, setSubjects] = useState(savedState?.subjects || []);
  const [limit, setLimit] = useState(
    savedState?.limit || QUIZ_CONFIG.DEFAULT_QUESTION_LIMIT,
  );
  const [questions, setQuestions] = useState(savedState?.questions || []);
  const [answers, setAnswers] = useState(savedState?.answers || {});
  const [currentIndex, setCurrentIndex] = useState(
    savedState?.currentIndex || 0,
  );

  // Spara state till sessionStorage när den ändras
  useEffect(() => {
    const stateToSave = {
      subjects,
      limit,
      questions,
      answers,
      currentIndex,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [subjects, limit, questions, answers, currentIndex]);

  // Reset hela quizet
  const resetQuiz = () => {
    setSubjects([]);
    setLimit(QUIZ_CONFIG.DEFAULT_QUESTION_LIMIT);
    setQuestions([]);
    setAnswers({});
    setCurrentIndex(0);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    subjects,
    setSubjects,
    limit,
    setLimit,
    questions,
    setQuestions,
    answers,
    setAnswers,
    currentIndex,
    setCurrentIndex,
    resetQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within QuizProvider");
  }
  return context;
};
