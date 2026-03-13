import { useState, useEffect } from "react";
import { QUIZ_CONFIG } from "@shared/constants/config";
import QuizSubjectSelector from "../components/QuizSubjectSelector";
import QuestionLimitSelector from "../components/QuestionLimitSelector";
import QuizCard from "../components/QuizCard";
import QuizNavigation from "../components/QuizNavigation";
import ProgressBar from "@shared/components/ui/ProgressBar";
import ResultPanel from "../components/ResultPanel";
import QuizInfo from "../components/QuizInfo";
import LoadingSpinner from "@shared/components/ui/LoadingSpinner";
import useQuizLogic from "../hooks/useQuizLogic";
import Alert from "@shared/components/ui/Alert";

const STORAGE_KEY = "quizState";
const QUIZ_DATA_KEY = "quizData";

const QuizPage = () => {
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
  const [subjectConfirmed, setSubjectConfirmed] = useState(
    savedState?.subjectConfirmed || false,
  );

  const [limit, setLimit] = useState(
    savedState?.limit || QUIZ_CONFIG.DEFAULT_QUESTION_LIMIT,
  );
  const [limitConfirmed, setLimitConfirmed] = useState(
    savedState?.limitConfirmed || false,
  );

  const loadQuestions = subjectConfirmed && limitConfirmed;

  const {
    questions,
    loading,
    error,
    clearError,
    currentQuestion,
    currentIndex,
    answers,
    answeredCount,
    allAnswered,
    isCurrentAnswered,
    showResult,
    handleSelect,
    handleNext,
    handlePrev,
    handleFinish,
    handleRetry: originalHandleRetry,
  } = useQuizLogic(subjects, limit, loadQuestions);

  // Wrapper för handleRetry som också rensar sessionStorage
  const handleRetry = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(QUIZ_DATA_KEY);
    originalHandleRetry();
  };

  // Spara state till sessionStorage när den ändras
  useEffect(() => {
    if (subjectConfirmed || limitConfirmed) {
      const stateToSave = {
        subjects,
        subjectConfirmed,
        limit,
        limitConfirmed,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }
  }, [subjects, subjectConfirmed, limit, limitConfirmed]);

  // === STEG 1: Välj ämnen ===
  if (!subjectConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
        <QuizSubjectSelector
          subjects={subjects}
          setSubjects={setSubjects}
          onNext={() => subjects.length > 0 && setSubjectConfirmed(true)}
        />
        <QuizInfo />
      </div>
    );
  }

  // === STEG 2: Välj antal frågor ===
  if (!limitConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
        <QuestionLimitSelector
          limit={limit}
          setLimit={setLimit}
          onConfirm={() => setLimitConfirmed(true)}
        />
      </div>
    );
  }

  // === Loading / error / empty states ===
  if (loading)
    return <LoadingSpinner message="Laddar dina frågor..." fullScreen />;
  if (error) return <Alert type="error" message={error} onClose={clearError} />;
  if (!questions.length)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Inga frågor hittades
      </div>
    );
  if (showResult)
    return (
      <ResultPanel
        questions={questions}
        answers={answers}
        onRetry={handleRetry}
      />
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      {error && <Alert type="error" message={error} onClose={clearError} />}

      <div className="max-w-3xl mx-auto">
        <ProgressBar
          answered={answeredCount}
          total={questions.length}
          className="mb-6"
        />
        <QuizCard
          question={currentQuestion}
          selectedAnswer={answers[currentIndex] || null}
          onSelect={handleSelect}
          className="mb-6"
        />
        <QuizNavigation
          currentIndex={currentIndex}
          total={questions.length}
          onNext={handleNext}
          onPrev={handlePrev}
          isLastQuestion={currentIndex === questions.length - 1}
          onFinish={handleFinish}
          isCurrentAnswered={isCurrentAnswered}
          allAnswered={allAnswered}
        />
      </div>
    </div>
  );
};

export default QuizPage;
