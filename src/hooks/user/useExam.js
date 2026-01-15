import { useState, useEffect } from "react";
import examService from "../../services/user/examService";

// -------------------------------------------------------
// 📌 Hjälpfunktion: hämtar ID för den inloggade användaren
// -------------------------------------------------------
const getCurrentUserId = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const user = JSON.parse(userStr);
    return user.id; // Returnera användarens ID om det finns
  }
  return null; // Om ingen användare är inloggad
};

// -------------------------------------------------------
// 📌 useExam — Custom hook för att hantera hela provlogiken
// -------------------------------------------------------
export const useExam = () => {
  const [examData, setExamData] = useState(null);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Error state
  const [error, setError] = useState(null);

  // -------------------------------------------------------
  // 📌 Vid första laddning: kolla om det finns ett pågående prov
  // -------------------------------------------------------
  useEffect(() => {
    const checkExistingSession = async () => {
      const userId = getCurrentUserId();
      if (!userId) {
        setLoading(false);
        setError("Du måste vara inloggad för att se provet");
        return;
      }

      try {
        const data = await examService.getExamStatus(userId);
        if (data) {
          setExamData(data);
          setStarted(true);

          if (data.savedAnswers) {
            const restoredAnswers = {};
            data.questions.forEach((question, index) => {
              if (data.savedAnswers[question.id]) {
                restoredAnswers[index] = data.savedAnswers[question.id];
              }
            });
            setAnswers(restoredAnswers);

            const firstUnanswered = data.questions.findIndex(
              (q, i) => !restoredAnswers[i]
            );
            setCurrentIndex(firstUnanswered !== -1 ? firstUnanswered : data.questions.length - 1);
          }
        }
      } catch (err) {
        setError("Kunde inte hämta provsessionen");
      } finally {
        setLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  // -------------------------------------------------------
  // 📌 Starta provet
  // -------------------------------------------------------
  const startExam = async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      setError("Du måste vara inloggad för att starta provet");
      return;
    }

    try {
      const data = await examService.startExam(userId);
      setExamData(data);
      setStarted(true);
      setCurrentIndex(0);
      setAnswers({});
      setResult(null);
      setShowResult(false);
      setError(null); // rensa tidigare fel
    } catch (err) {
      setError("Kunde inte starta provet. Försök igen senare.");
    }
  };

  // -------------------------------------------------------
  // 📌 Välj svar
  // -------------------------------------------------------
  const handleSelect = async (answer) => {
    const userId = getCurrentUserId();
    if (!userId) {
      setError("Du måste vara inloggad");
      return;
    }

    setAnswers(prev => ({ ...prev, [currentIndex]: answer }));

    try {
      const questionId = examData.questions[currentIndex].id;
      await examService.saveAnswer(userId, questionId, answer);
      setError(null); // rensa tidigare fel om det gick bra
    } catch (err) {
      setError("Kunde inte spara svaret. Försök igen senare.");
    }
  };

  // -------------------------------------------------------
  // 📌 Nästa/ Föregående fråga
  // -------------------------------------------------------
  const handleNext = () => {
    if (examData && currentIndex < examData.questions.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  // -------------------------------------------------------
  // 📌 Alla frågor besvarade
  // -------------------------------------------------------
  const allAnswered =
    examData && Object.keys(answers).length === examData.questions.length;

  // -------------------------------------------------------
  // 📌 Avsluta provet
  // -------------------------------------------------------
  const finishExam = async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      setError("Du måste vara inloggad");
      return;
    }

    try {
      await examService.finishExam(userId);
      const examResult = await examService.getExamResult(userId);
      setResult(examResult);
      setShowResult(true);
      setStarted(false);
      setError(null);
    } catch (err) {
      setError("Kunde inte avsluta provet. Försök igen senare.");
    }
  };

  // -------------------------------------------------------
  // 📌 Returnera all funktionalitet
  // -------------------------------------------------------
  return {
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
    error, // <-- här exponerar vi felet
  };
};
