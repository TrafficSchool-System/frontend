import { useState, useEffect } from "react";
import examService from "../services/examService";

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
  // Data som backend returnerar (frågor, tid, sparade svar, mm)
  const [examData, setExamData] = useState(null);

  // Om provet har startats eller inte
  const [started, setStarted] = useState(false);

  // Index för frågan användaren är på just nu
  const [currentIndex, setCurrentIndex] = useState(0);

  // Objekt som lagrar användarens svar: { questionIndex: answer }
  const [answers, setAnswers] = useState({});

  // Visar om hooken håller på att ladda data (t.ex. återupptar session)
  const [loading, setLoading] = useState(true);

  // Result state
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // -------------------------------------------------------
  // 📌 Vid första laddning: kolla om det finns ett pågående prov
  // -------------------------------------------------------
  useEffect(() => {
    const checkExistingSession = async () => {
      const userId = getCurrentUserId();
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // Hämta pågående prov från backend
        const data = await examService.getExamStatus(userId);

        if (data) {
          // Om backend hittade en session
          setExamData(data);
          setStarted(true);

          // Om backend har sparade svar → återställ dem
          if (data.savedAnswers) {
            const restoredAnswers = {};

            // Matcha questionId → questionIndex
            data.questions.forEach((question, index) => {
              if (data.savedAnswers[question.id]) {
                restoredAnswers[index] = data.savedAnswers[question.id];
              }
            });

            setAnswers(restoredAnswers);

            // Hoppa till första obesvarade fråga
            const firstUnanswered = data.questions.findIndex(
              (q, i) => !restoredAnswers[i]
            );

            if (firstUnanswered !== -1) {
              setCurrentIndex(firstUnanswered);
            } else {
              // Om allt är besvarat → ställ in på sista frågan
              setCurrentIndex(data.questions.length - 1);
            }
          }
        }
      } catch (error) {
        console.error("Fel vid kontroll av session:", error);
      } finally {
        setLoading(false); // Färdigladdat
      }
    };

    checkExistingSession();
  }, []);

  // -------------------------------------------------------
  // 📌 Starta provet (skickar request till backend)
  // -------------------------------------------------------
  const startExam = async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      alert("Du måste vara inloggad för att starta provet");
      return;
    }

    const data = await examService.startExam(userId);

    // Spara provdata och sätt startläge
    setExamData(data);
    setStarted(true);
    setCurrentIndex(0);
    setAnswers({});
  };

  // -------------------------------------------------------
  // 📌 När användaren väljer ett svar
  // -------------------------------------------------------
  const handleSelect = async (answer) => {
    const userId = getCurrentUserId();
    if (!userId) return;

    // Uppdatera valt svar lokalt
    setAnswers(prev => ({ ...prev, [currentIndex]: answer }));

    // Spara svaret i backend
    const questionId = examData.questions[currentIndex].id;
    await examService.saveAnswer(userId, questionId, answer);
  };

  // -------------------------------------------------------
  // 📌 Gå till nästa fråga
  // -------------------------------------------------------
  const handleNext = () => {
    if (examData && currentIndex < examData.questions.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  // -------------------------------------------------------
  // 📌 Gå till föregående fråga
  // -------------------------------------------------------
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  // -------------------------------------------------------
  // 📌 Kolla om alla frågor är besvarade
  // -------------------------------------------------------
  const allAnswered =
    examData && Object.keys(answers).length === examData.questions.length;

  // -------------------------------------------------------
  // 📌 Avsluta provet
  // -------------------------------------------------------
  const finishExam = async () => {
    const userId = getCurrentUserId();
    if (!userId) return;

    await examService.finishExam(userId);
    
    // Hämta resultat
    const examResult = await examService.getExamResult(userId); 
    setResult(examResult); 
    setShowResult(true); 
    setStarted(false); 
  };

  // -------------------------------------------------------
  // 📌 Returnera all funktionalitet som komponenten behöver
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
  };
};
