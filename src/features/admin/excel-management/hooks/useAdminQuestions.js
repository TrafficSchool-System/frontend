import { useState, useCallback } from "react";
import quizService from "@features/quiz/services/quizService";
import useError from "@shared/hooks/useError";

const useAdminQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]); // hela listan
  const [loading, setLoading] = useState(false);

  const { error, handleError, clearError } = useError();

  // ⚡ Hämta alla frågor (initialt)
  const fetchAllQuestions = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      const res = await quizService.getAllQuestions();
      setQuestions(res);
      setAllQuestions(res);
    } catch (err) {
      handleError("Kunde inte hämta frågor");
    } finally {
      setLoading(false);
    }
  }, [handleError, clearError]);

  // 🔍 Sök via ID (eller visa alla om ID är tomt)
  const searchQuestionById = useCallback(
    async (id) => {
      if (!id) {
        // Tomt ID → visa alla frågor
        setQuestions(allQuestions);
        return;
      }

      // Försök filtrera lokalt först
      const localMatch = allQuestions.find(
        (q) => q.id.toString() === id.toString()
      );

      if (localMatch) {
        setQuestions([localMatch]);
        return;
      }

      // Annars hämta från server
      try {
        setLoading(true);
        clearError();
        const question = await quizService.getQuestionById(id);

        if (question) {
          setQuestions([question]);
        } else {
          // Om inget hittas → tom lista, ingen alert
          setQuestions([]);
        }
      } catch {
        // Om inget hittas → visa tom lista, ingen alert
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    },
    [allQuestions, clearError]
  );

  // ✏️ Uppdatera fråga (inline-edit) – sparar hela raden
  const updateQuestion = useCallback(
    async (id, updatedData) => {
      try {
        setLoading(true);
        clearError();
        const updated = await quizService.updateQuestion(id, updatedData);

        setQuestions((prev) => prev.map((q) => (q.id === id ? updated : q)));
        setAllQuestions((prev) => prev.map((q) => (q.id === id ? updated : q)));

        return updated;
      } catch (err) {
        handleError("Kunde inte uppdatera frågan");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [clearError, handleError]
  );

  return {
    questions,
    allQuestions,
    loading,
    error,
    clearError,
    fetchAllQuestions,
    searchQuestionById,
    updateQuestion,
  };
};

export default useAdminQuestions;
