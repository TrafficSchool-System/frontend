import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import QuestionLimitSelector from "../components/QuestionLimitSelector";
import Button from "@shared/components/ui/Button";

const SelectLimitPage = () => {
  const navigate = useNavigate();
  const { subjects, limit, setLimit } = useQuizContext();

  // Redirect om inga ämnen är valda
  useEffect(() => {
    if (subjects.length === 0) {
      navigate("/quiz/practice/subjects");
    }
  }, [subjects, navigate]);

  const handleConfirm = () => {
    if (limit && limit > 0) {
      navigate("/quiz/practice/active");
    }
  };

  const handleBack = () => {
    navigate("/quiz/practice/subjects");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-md mx-auto mb-4">
        <Button variant="secondary" onClick={handleBack} className="w-full">
          ← Tillbaka till ämneval
        </Button>
      </div>
      <QuestionLimitSelector
        limit={limit}
        setLimit={setLimit}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default SelectLimitPage;
