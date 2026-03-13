/**
 * ==========================================
 * USE COMPLETE USER DETAILS HOOK
 * ==========================================
 * Custom hook för att hämta komplett användarinformation
 */

import { useState, useEffect, useCallback } from "react";
import userManagementService from "../services/userManagementService";
import useError from "@shared/hooks/useError";

const useCompleteUserDetails = (userId) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useError();

  const fetchUserDetails = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    clearError();

    try {
      const data = await userManagementService.getCompleteUserDetails(userId);
      setUserDetails(data);
    } catch (err) {
      handleError(err, "Kunde inte hämta användarinformation");
    } finally {
      setLoading(false);
    }
  }, [userId, handleError, clearError]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return {
    userDetails,
    loading,
    error,
    clearError,
    refetch: fetchUserDetails,
  };
};

export default useCompleteUserDetails;
