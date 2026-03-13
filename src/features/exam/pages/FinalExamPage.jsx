import QuizCard from "../../quiz/components/QuizCard";
import QuizNavigation from "../../quiz/components/QuizNavigation";
import ProgressBar from "@shared/components/ui/ProgressBar";
import FinalExamIntro from "../components/FinalExamIntro";
import ExamTimer from "../components/ExamTimer";
import { useExam } from "../hooks/useExam";
import ExamResult from "../components/ExamResult";
import Alert from "@shared/components/ui/Alert";
import LoadingSpinner from "@shared/components/ui/LoadingSpinner";
import { useState } from "react";

const FinalExamPage = () => {
  const {
    examData,
    started,
    currentIndex,
    answers,
    handleSelect,
    handleNext,
    handlePrev,
    allAnswered,
    startExam,
    finishExam,
    loading,
    result,
    showResult,
    error,
  } = useExam();

  const [showAlert, setShowAlert] = useState(true);

  if (loading)
    return <LoadingSpinner message="Kontrollerar provsession..." fullScreen />;

  // Visa resultatet om provet är klart
  if (showResult && result) {
    return <ExamResult result={result} onRetry={startExam} />;
  }

  if (!started) {
    return (
      <FinalExamIntro
        durationMinutes={examData?.durationMinutes || 50}
        onStart={startExam}
      />
    );
  }

  if (!examData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Kunde inte ladda provet</p>
      </div>
    );
  }

  const currentQuestion = examData.questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* ALERT */}
      {error && showAlert && (
        <Alert
          message={error}
          type="error"
          onClose={() => setShowAlert(false)}
          className="mb-4"
        />
      )}

      <ExamTimer expiresAt={examData.expiresAt} onTimeUp={finishExam} />

      <ProgressBar
        answered={Object.keys(answers).length}
        total={examData.questions.length}
      />

      <QuizCard
        question={currentQuestion}
        selectedAnswer={answers[currentIndex]}
        onSelect={handleSelect}
        showAnswerFeedback={false}
      />

      <QuizNavigation
        currentIndex={currentIndex}
        total={examData.questions.length}
        onNext={handleNext}
        onPrev={handlePrev}
        onFinish={finishExam}
        isLastQuestion={currentIndex === examData.questions.length - 1}
        isCurrentAnswered={answers[currentIndex] !== undefined}
        allAnswered={allAnswered}
      />
    </div>
  );
};

export default FinalExamPage;
