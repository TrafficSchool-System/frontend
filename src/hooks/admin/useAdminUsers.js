import { useState, useEffect, useCallback, useRef } from "react";
import userService from "../../services/user/userService";
import useError from "../useError";

const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useError();


  // Hämta alla användare
  const mountedRef = useRef(false);

  const fetchUsers = useCallback(async () => {
  if (!mountedRef.current) return;
  setLoading(true);
  clearError(); // Rensa eventuellt tidigare fel
  try {
    const data = await userService.getAllUsers();
    if (mountedRef.current) setUsers(data);
  } catch (err) {
    if (mountedRef.current) handleError(err, "Kunde inte hämta användare");
  } finally {
    if (mountedRef.current) setLoading(false);
  }
}, [handleError, clearError]);

  // Ta bort användare
  const deleteUser = async (id) => {
    try {
      await userService.deleteUser(id);
      fetchUsers(); // refresh
    } catch (err) {
      handleError(err, "Kunde inte radera användare");
      throw err;
    }
  };

  // Uppdatera användare
  const updateUser = async (id, updatedData) => {
    try {
      await userService.updateUser(id, updatedData);
      fetchUsers(); // refresh
    } catch (err) {
      handleError(err, "Kunde inte uppdatera användare");
      throw err;
    }
  };

  // Initiera fetch vid mount
  useEffect(() => {
    mountedRef.current = true;
    fetchUsers();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    clearError,
    fetchUsers,
    deleteUser,
    updateUser,
  };
};

export default useAdminUsers;
