import { useEffect, useState } from "react";
import getQuestionsBySubject from "../services/quizService";
import QuizSubjectSelector from "../components/quiz/quizSubjectSelector";
import QuizCard from "../components/quiz/quizCard";
import QuizNavigation from "../components/quiz/quizNavigation";
import ProgressBar from "../components/ui/ProgressBar";
import ResultPanel from "../components/quiz/ResultPanel";

const QuizPage = () => {
  // === STATE ===
  const [subjectId, setSubjectId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const isCurrentAnswered = answers[currentIndex] !== undefined;

  // === HÄMTA FRÅGOR NÄR ÄMNE VÄLJS ===
  useEffect(() => {
    if (!subjectId) return;

    const loadQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getQuestionsBySubject(subjectId, 10);
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
  }, [subjectId]);

  // === FALL 1: Inget ämne valt ===
  if (!subjectId) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <QuizSubjectSelector subjectId={subjectId} setSubjectId={setSubjectId} />
      </div>
    );
  }

  // === FALL 2: laddar eller error ===
  if (loading) return <p className="p-6">Laddar frågor...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!questions.length) return <p className="p-6">Inga frågor hittades.</p>;

  // === FALL 3: visa resultat ===
  if (showResult) {
    return (
      <ResultPanel
        questions={questions}
        answers={answers}
        onRetry={() => {
          setShowResult(false);
          setAnswers({});
          setCurrentIndex(0);
        }}
      />
    );
  }

  // === AKTUELLA FRÅGAN ===
  const currentQuestion = questions[currentIndex];

  // === Spara svar ===
  const handleSelect = (answer) => {
    if (answers[currentIndex]) return; // Förhindra ändring

    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: answer,
    }));
  };

  // === Nästa fråga ===
  const handleNext = () => {
    if (!isCurrentAnswered) return; // Stoppa om ej besvarad

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // === Föregående fråga ===
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // === RENDER HUVUDDEL ===
  return (
    <div className="max-w-2xl mx-auto p-6">

      {/* Ämnesväljare */}
      <QuizSubjectSelector subjectId={subjectId} setSubjectId={setSubjectId} />

      {/* Progress bar */}
      <ProgressBar answered={answeredCount} total={questions.length} />

      {/* Frågekort */}
      <QuizCard
        question={currentQuestion}
        selectedAnswer={answers[currentIndex] || null}
        onSelect={handleSelect}
      />

      {/* Navigation */}
      <QuizNavigation
        currentIndex={currentIndex}
        total={questions.length}
        onNext={handleNext}
        onPrev={handlePrev}
        isLastQuestion={currentIndex === questions.length - 1}
        onFinish={() => setShowResult(true)}
        isCurrentAnswered={isCurrentAnswered}
        allAnswered={allAnswered}
      />

    </div>
  );
};

export default QuizPage;
