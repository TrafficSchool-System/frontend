import QuizCard from "../components/quiz/QuizCard";
import QuizNavigation from "../components/quiz/QuizNavigation";
import ProgressBar from "../components/ui/ProgressBar";
import FinalExamIntro from "../components/exam/FinalExamIntro";
import ExamTimer from "../components/exam/ExamTimer";
import { useExam } from "../hooks/useExam";
import ExamResult from "../components/exam/ExamResult";

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
  } = useExam();

  if (loading) {
    return <p>Kontrollerar pågående session…</p>;
  }

  // Visa resultatet om provet är klart
  if(showResult && result) {
    return <ExamResult result={result} onRetry={startExam} />
  }

  if (!started) {
    return (
      <FinalExamIntro
        durationMinutes={examData?.durationMinutes || 50}
        onStart={startExam}
      />
    );
  }

  if (!examData) return <p>Laddar prov…</p>;

  const currentQuestion = examData.questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ExamTimer
        expiresAt={examData.expiresAt}
        onTimeUp={finishExam}
      />

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