import { useState } from "react";
import QuizSubjectSelector from "../../components/user/quiz/QuizSubjectSelector";
import QuestionLimitSelector from "../../components/user/quiz/QuestionLimitSelector";
import QuizCard from "../../components/user/quiz/QuizCard";
import QuizNavigation from "../../components/user/quiz/QuizNavigation";
import ProgressBar from "../../components/shared/ui/ProgressBar";
import ResultPanel from "../../components/user/quiz/ResultPanel";
import QuizInfo from "../../components/user/quiz/QuizInfo";
import LoadingSpinner from "../../components/shared/ui/LoadingSpinner";
import useQuizLogic from "../../hooks/user/useQuizLogic";
import Alert from "../../components/shared/ui/Alert";

const QuizPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectConfirmed, setSubjectConfirmed] = useState(false);

  const [limit, setLimit] = useState(10);
  const [limitConfirmed, setLimitConfirmed] = useState(false);

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
    handleRetry
  } = useQuizLogic(subjects, limit, loadQuestions);

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
  if (loading) return <LoadingSpinner message="Laddar dina frågor..." />;
  if (error) return <Alert type="error" message={error} onClose={clearError} />;
  if (!questions.length) return <div className="min-h-screen flex items-center justify-center">Inga frågor hittades</div>;
  if (showResult) return <ResultPanel questions={questions} answers={answers} onRetry={handleRetry} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">

      {error && <Alert type="error" message={error} onClose={clearError} />}

      <div className="max-w-3xl mx-auto">
        <ProgressBar answered={answeredCount} total={questions.length} className="mb-6" />
        <QuizCard question={currentQuestion} selectedAnswer={answers[currentIndex] || null} onSelect={handleSelect} className="mb-6" />
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
