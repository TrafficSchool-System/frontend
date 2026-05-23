import { useState, useCallback } from "react";

const useError = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback((err, customMessage) => {
    if (customMessage) {
      setError(Array.isArray(customMessage) ? customMessage : [customMessage]);
    } else if (Array.isArray(err)) {
      setError(err);
    } else if (
      err?.response?.data?.errors &&
      Array.isArray(err.response.data.errors)
    ) {
      setError(err.response.data.errors);
    } else if (err?.response?.data?.message) {
      setError([err.response.data.message]);
    } else if (err?.message) {
      setError([err.message]);
    } else {
      setError(["Något gick fel"]);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { error, handleError, clearError };
};

export default useError;
