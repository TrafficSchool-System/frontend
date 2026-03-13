/**
 * ==========================================
 * USE ALL USERS WITH DETAILS HOOK
 * ==========================================
 * Custom hook för att hämta alla användare med komplett information
 */

import { useState, useEffect, useCallback, useRef } from "react";
import userManagementService from "../services/userManagementService";
import useError from "@shared/hooks/useError";

const useAllUsersWithDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useError();
  const mountedRef = useRef(true);

  const fetchAllUsers = useCallback(async () => {
    if (!mountedRef.current) return;

    setLoading(true);
    clearError();

    try {
      console.log("🔍 Fetching all users with details...");
      const data = await userManagementService.getAllUsersWithDetails();
      console.log("✅ Users received:", data);

      if (mountedRef.current) {
        setUsers(data);
      }
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      if (mountedRef.current) {
        handleError(err, "Kunde inte hämta användare");
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [handleError, clearError]);

  const deleteUser = useCallback(
    async (userId) => {
      try {
        console.log("🗑️ Deleting user:", userId);
        await userManagementService.deleteUser(userId);
        console.log("✅ User deleted successfully");

        // Ta bort användaren från listan
        if (mountedRef.current) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => {
              const id = user.userInfo?.id || user.id;
              return id !== userId;
            }),
          );
        }
      } catch (err) {
        console.error("❌ Error deleting user:", err);
        handleError(err, "Kunde inte ta bort användare");
        throw err;
      }
    },
    [handleError],
  );

  useEffect(() => {
    mountedRef.current = true;
    fetchAllUsers();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchAllUsers]);

  return {
    users,
    loading,
    error,
    clearError,
    refetch: fetchAllUsers,
    deleteUser,
  };
};

export default useAllUsersWithDetails;
