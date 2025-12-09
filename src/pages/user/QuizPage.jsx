import { useEffect, useState } from "react";
import QuizSubjectSelector from "../../components/user/quiz/QuizSubjectSelector";
import QuestionLimitSelector from "../../components/user/quiz/QuestionLimitSelector";
import QuizCard from "../../components/user/quiz/QuizCard";
import QuizNavigation from "../../components/user/quiz/QuizNavigation";
import ProgressBar from "../../components/shared/ui/ProgressBar";
import ResultPanel from "../../components/user/quiz/ResultPanel";
import QuizInfo from "../../components/user/quiz/QuizInfo";
import LoadingSpinner from "../../components/shared/ui/LoadingSpinner";
import quizService from "../../services/user/quizService";

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

  // === Loading / error states ===
  if (loading) {
    return <LoadingSpinner message="Laddar dina frågor..." />;
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center border-2 border-red-200">
          <div className="text-5xl mb-4">❌</div>
          <p className="text-xl text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }
  
  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-5xl mb-4">🤔</div>
          <p className="text-xl text-gray-700 font-medium">Inga frågor hittades</p>
        </div>
      </div>
    );
  }

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
    return <LoadingSpinner message="Laddar fråga..." />;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress section */}
        <div className="mb-6">
          <ProgressBar answered={answeredCount} total={questions.length} />
        </div>

        {/* Quiz card section */}
        <div className="mb-6">
          <QuizCard
            question={currentQuestion}
            selectedAnswer={answers[currentIndex] || null}
            onSelect={handleSelect}
          />
        </div>

        {/* Navigation section */}
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
