import { useEffect, useState } from "react";
import getQuestionsBySubject from "../services/quizService";
import QuizSubjectSelector from "../components/quiz/quizSubjectSelector";
import QuestionLimitSelector from "../components/quiz/QuestionLimitSelector";
import QuizCard from "../components/quiz/quizCard";
import QuizNavigation from "../components/quiz/quizNavigation";
import ProgressBar from "../components/ui/ProgressBar";
import ResultPanel from "../components/quiz/ResultPanel";

const QuizPage = () => {
  // === STATE ===
  const [subjectId, setSubjectId] = useState(null);
  const [limit, setLimit] = useState(10);
  const [limitConfirmed, setLimitConfirmed] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const isCurrentAnswered = answers[currentIndex] !== undefined;

  // === HÄMTA FRÅGOR NÄR ÄMNE OCH LIMIT BEKRÄFTATS ===
  useEffect(() => {
    if (!subjectId || !limitConfirmed) return;

    const loadQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getQuestionsBySubject(subjectId, limit);
        setQuestions(data);
        setCurrentIndex(0);
        setAnswers({});
      } catch (err) {
        setError("Kunde inte hämta frågor");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [subjectId, limitConfirmed, limit]);

  // === STEG 1: Välj ämne ===
  if (!subjectId) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <QuizSubjectSelector subjectId={subjectId} setSubjectId={setSubjectId} />
      </div>
    );
  }

  // === STEG 2: Välj antal frågor ===
  if (!limitConfirmed) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <QuestionLimitSelector
          limit={limit}
          setLimit={setLimit}
          onConfirm={() => setLimitConfirmed(true)}
        />
      </div>
    );
  }

  // === Loading / error states ===
  if (loading) return <p className="p-6">Laddar frågor...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!questions.length) return <p className="p-6">Inga frågor hittades.</p>;

  // === Visa resultat om quizet är klart ===
  if (showResult) {
    return (
      <ResultPanel
        questions={questions}
        answers={answers}
        onRetry={() => {
          setShowResult(false);
          setAnswers({});
          setCurrentIndex(0);
          setLimitConfirmed(false); // Börja om från att välja antal frågor
        }}
      />
    );
  }

  const currentQuestion = questions[currentIndex];

  // === Hantera svar ===
  const handleSelect = (answer) => {
    if (answers[currentIndex]) return; // Lås frågan
    setAnswers((prev) => ({ ...prev, [currentIndex]: answer }));
  };

  // === Navigation ===
  const handleNext = () => {
    if (!isCurrentAnswered) return;
    if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleFinish = () => {
    if (!allAnswered) {
      alert("Du måste svara på alla frågor innan du rättar provet!");
      return;
    }
    setShowResult(true);
  };

  // === RENDER QUIZ ===
  return (
    <div className="max-w-2xl mx-auto p-6">
      <ProgressBar answered={answeredCount} total={questions.length} />

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
        onFinish={handleFinish}
        isCurrentAnswered={isCurrentAnswered}
        allAnswered={allAnswered}
      />
    </div>
  );
};

export default QuizPage;
