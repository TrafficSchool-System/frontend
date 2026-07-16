import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuizContext } from "../context/QuizContext";
import useQuiz from "../hooks/useQuiz";
import useError from "@shared/hooks/useError";
import QuizCard from "../components/QuizCard";
import QuizNavigation from "../components/QuizNavigation";
import ProgressBar from "@shared/components/ui/ProgressBar";
import LoadingSpinner from "@shared/components/ui/LoadingSpinner";
import Alert from "@shared/components/ui/Alert";

const ActiveQuizPage = () => {
  const navigate = useNavigate();
  const {
    subjects,
    limit,
    questions: contextQuestions,
    setQuestions: setContextQuestions,
    answers,
    setAnswers,
    currentIndex,
    setCurrentIndex,
  } = useQuizContext();

  const { error, handleError, clearError } = useError();

  // Redirect om inga ämnen eller limit är satt
  useEffect(() => {
    if (subjects.length === 0) {
      navigate("/quiz/practice/subjects");
    } else if (!limit || limit <= 0) {
      navigate("/quiz/practice/limit");
    }
  }, [subjects, limit, navigate]);

  // Hämta frågor om vi inte redan har dem
  const shouldLoad = contextQuestions.length === 0 && subjects.length > 0;
  const { questions: fetchedQuestions, loading } = useQuiz(
    subjects,
    limit,
    shouldLoad,
    contextQuestions,
  );

  // Uppdatera context när frågor hämtas
  useEffect(() => {
    if (fetchedQuestions.length > 0 && contextQuestions.length === 0) {
      setContextQuestions(fetchedQuestions);
    }
  }, [fetchedQuestions, contextQuestions.length, setContextQuestions]);

  const questions =
    contextQuestions.length > 0 ? contextQuestions : fetchedQuestions;
  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const isCurrentAnswered = answers[currentIndex] !== undefined;

  const handleSelect = (answer) => {
    if (isCurrentAnswered) return; // Lås frågan
    setAnswers((prev) => ({ ...prev, [currentIndex]: answer }));
  };

  const handleNext = () => {
    if (!isCurrentAnswered) return;
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    if (!allAnswered) {
      handleError("Du måste svara på alla frågor innan du rättar provet!");
      return;
    }
    navigate("/quiz/practice/results");
  };

  if (loading) {
    return <LoadingSpinner message="Laddar dina frågor..." fullScreen />;
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Inga frågor hittades</p>
          <button
            onClick={() => navigate("/quiz/practice/subjects")}
            className="text-traffic-yellow hover:underline"
          >
            Tillbaka till start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-6 px-4">
      {error && <Alert type="error" message={error} onClose={clearError} />}

      <div className="max-w-4xl mx-auto space-y-4">
        <ProgressBar
          answered={answeredCount}
          total={questions.length}
        />
        <QuizCard
          question={currentQuestion}
          selectedAnswer={answers[currentIndex] || null}
          onSelect={handleSelect}
        />
        <QuizNavigation
          currentIndex={currentIndex}
          total={questions.length}
          onNext={handleNext}
          onPrev={handlePrev}
          isLastQuestion={currentIndex === questions.length - 1}
          allAnswered={allAnswered}
          onFinish={handleFinish}
          isCurrentAnswered={isCurrentAnswered}
        />
      </div>
    </div>
  );
};

export default ActiveQuizPage;
