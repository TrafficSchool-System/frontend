import { useState, useEffect } from "react";
import examService from "../services/examService";
import useError from "@shared/hooks/useError";
import { getUserId } from "@shared/utils/auth";

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
  const { error, handleError, clearError } = useError();

  // -------------------------------------------------------
  // 📌 Vid första laddning: kolla om det finns ett pågående prov
  // -------------------------------------------------------
  useEffect(() => {
    const checkExistingSession = async () => {
      const userId = getUserId();
      if (!userId) {
        setLoading(false);
        handleError(null, "Du måste vara inloggad för att se provet");
        return;
      }

      try {
        // FIX: getExamStatus tar inga parametrar - userId hämtas från JWT
        const data = await examService.getExamStatus();
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
              (q, i) => !restoredAnswers[i],
            );
            setCurrentIndex(
              firstUnanswered !== -1
                ? firstUnanswered
                : data.questions.length - 1,
            );
          }
        }
      } catch (err) {
        // 404 = ingen session finns, vilket är OK (användaren ska starta nytt prov)
        if (err?.response?.status !== 404) {
          handleError(err, "Kunde inte hämta provsessionen");
        }
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
    const userId = getUserId();
    if (!userId) {
      handleError(null, "Du måste vara inloggad för att starta provet");
      return;
    }

    try {
      // FIX: startExam tar inga parametrar - userId hämtas från JWT
      const data = await examService.startExam();
      setExamData(data);
      setStarted(true);
      setCurrentIndex(0);
      setAnswers({});
      setResult(null);
      setShowResult(false);
      clearError(); // rensa tidigare fel
    } catch (err) {
      handleError(err, "Kunde inte starta provet. Försök igen senare.");
    }
  };

  // -------------------------------------------------------
  // 📌 Välj svar
  // -------------------------------------------------------
  const handleSelect = async (answer) => {
    const userId = getUserId();
    if (!userId) {
      handleError(null, "Du måste vara inloggad");
      return;
    }

    setAnswers((prev) => ({ ...prev, [currentIndex]: answer }));

    try {
      const questionId = examData.questions[currentIndex].id;
      // FIX: saveAnswer tar endast (questionId, selectedAnswer) - userId hämtas från JWT
      await examService.saveAnswer(questionId, answer);
      clearError(); // rensa tidigare fel om det gick bra
    } catch (err) {
      handleError(err, "Kunde inte spara svaret. Försök igen senare.");
    }
  };

  // -------------------------------------------------------
  // 📌 Nästa/ Föregående fråga
  // -------------------------------------------------------
  const handleNext = () => {
    if (examData && currentIndex < examData.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
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
    const userId = getUserId();
    if (!userId) {
      handleError(null, "Du måste vara inloggad");
      return;
    }

    try {
      // FIX: finishExam och getExamResult tar inga parametrar - userId hämtas från JWT
      await examService.finishExam();
      const examResult = await examService.getExamResult();
      setResult(examResult);
      setShowResult(true);
      setStarted(false);
      clearError();
    } catch (err) {
      handleError(err, "Kunde inte avsluta provet. Försök igen senare.");
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
