import { useEffect, useState } from "react";
import QuizSubjectSelector from "../components/quiz/QuizSubjectSelector";
import QuestionLimitSelector from "../components/quiz/QuestionLimitSelector";
import QuizCard from "../components/quiz/QuizCard";
import QuizNavigation from "../components/quiz/QuizNavigation";
import ProgressBar from "../components/ui/ProgressBar";
import ResultPanel from "../components/quiz/ResultPanel";
import QuizInfo from "../components/quiz/QuizInfo";
import quizService from "../services/quizService";

const QuizPage = () => {
  // === STATE ===
  const [subjects, setSubjects] = useState([]);
  const [subjectConfirmed, setSubjectConfirmed] = useState(false);

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
    if (!subjectConfirmed || !limitConfirmed) return;

    const loadQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Requesting questions with subjects:", subjects, "limit:", limit);
        const data = await quizService.getQuestionsBySubjects(subjects, limit);
        console.log("Received questions data:", data);
        console.log("First question:", data[0]);
        setQuestions(data);
        setCurrentIndex(0);
        setAnswers({});
      } catch (err) {
        console.error("Error loading questions:", err);
        console.error("Error response:", err.response?.data);
        setError("Kunde inte hämta frågor");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [subjectConfirmed, limitConfirmed, subjects, limit]);

  // === STEG 1: Välj ämnen ===
  if (!subjectConfirmed) {
    return (
      <div className="max-w-2xl mx-auto p-6">
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
          setSubjectConfirmed(false);
          setLimitConfirmed(false);
        }}
      />
    );
  }

  const currentQuestion = questions[currentIndex];

  // Säkerhetskontroll
  if (!currentQuestion) {
    return <p className="p-6">Laddar fråga...</p>;
  }

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
