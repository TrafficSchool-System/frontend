import { useEffect, useState } from "react";
import examService from "../services/examService";
import useError from "@shared/hooks/useError";

// -------------------------------------------------------
// 📌 Hjälpfunktion: hämtar ID för den inloggade användaren
// -------------------------------------------------------
const getCurrentUserId = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    const user = JSON.parse(userStr);
    return user?.id ?? null;
  } catch {
    return null;
  }
};

// -------------------------------------------------------
// 📌 useExamResults — Custom hook för att hämta alla provresultat
// -------------------------------------------------------
const useExamResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const { error, handleError, clearError } = useError();

  const fetchResults = async () => {
    const userId = getCurrentUserId();

    if (!userId) {
      handleError(null, "Du måste vara inloggad");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      clearError();

      const data = await examService.getAllExamResults(userId);
      setResults(data ?? []);
    } catch {
      handleError(error, "Kunde inte hämta dina provresultat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return {
    results,
    loading,
    error,
    clearError,
    refetch: fetchResults, // 👈 gör hooken komplett & flexibel
  };
};

export default useExamResults;
