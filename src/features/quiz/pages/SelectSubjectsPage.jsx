import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import QuizSubjectSelector from "../components/QuizSubjectSelector";
import QuizInfo from "../components/QuizInfo";

const SelectSubjectsPage = () => {
  const navigate = useNavigate();
  const { subjects, setSubjects } = useQuizContext();

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
