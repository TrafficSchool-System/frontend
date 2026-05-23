import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import QuizSubjectSelector from "../components/QuizSubjectSelector";
import QuizInfo from "../components/QuizInfo";

const SelectSubjectsPage = () => {
  const navigate = useNavigate();
  const { subjects, setSubjects, setQuestions, setAnswers, setCurrentIndex } =
    useQuizContext();

  // When the user reaches the subjects page they are starting a new quiz session.
  // Clear any in-progress questions/answers so ActiveQuizPage fetches fresh questions,
  // but preserve subject/limit selections for convenience.
  useEffect(() => {
    setQuestions([]);
    setAnswers({});
    setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    if (subjects.length > 0) {
      navigate("/quiz/practice/limit");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
      <QuizSubjectSelector
        subjects={subjects}
        setSubjects={setSubjects}
        onNext={handleNext}
      />
      <QuizInfo />
    </div>
  );
};

export default SelectSubjectsPage;
