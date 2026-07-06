import { useState, useEffect, useCallback } from "react";
import quizService from "@features/quiz/services/quizService";
import useError from "@shared/hooks/useError"; // importera din error hook

const useExcelFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { error, handleError, clearError } = useError(); // använd hooken

  // Hämta alla Excel-filer
  const fetchFiles = useCallback(async () => {
    setLoading(true);
    clearError(); // rensa tidigare fel
    try {
      const data = await quizService.getAllExcelFiles();
      setFiles(data);
    } catch (err) {
      handleError(err); // Låt backend-felen visas
    } finally {
      setLoading(false);
    }
  }, [handleError, clearError]);

  // Ladda upp Excel-fil
  const uploadFile = useCallback(
    async (file, dryRun = false) => {
      setLoading(true);
      try {
        const message = await quizService.uploadExcelFile(file, dryRun);
        await fetchFiles(); // uppdatera listan
        return message;
      } catch (err) {
        // Kasta vidare – ExcelFileUpload-komponenten visar felet inline
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchFiles]
  );

  // Ta bort Excel-fil
  const deleteFile = useCallback(
    async (id) => {
      setLoading(true);
      clearError();
      try {
        const message = await quizService.deleteExcelFile(id);
        await fetchFiles(); // uppdatera listan
        return message;
      } catch (err) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchFiles, handleError, clearError]
  );

  // Hämta filerna direkt när hooken används
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    files,
    loading,
    error,
    clearError, // för Alert onClose
    fetchFiles,
    uploadFile,
    deleteFile,
  };
};

export default useExcelFiles;
