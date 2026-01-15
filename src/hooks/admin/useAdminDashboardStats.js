// src/hooks/admin/useAdminDashboardStats.js
import { useEffect, useState } from "react";
import userService from "../../services/user/userService";
import examService from "../../services/user/examService";
import useError from "../useError";

const useAdminDashboardStats = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [activeExams, setActiveExams] = useState(null);
  const [completedExams, setCompletedExams] = useState(null);
  const [loading, setLoading] = useState(true);

  const { error, handleError, clearError } = useError();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, examCounts] = await Promise.all([
          userService.getTotalUsers(),
          examService.getExamCounts(),
        ]);

        setTotalUsers(users);
        setActiveExams(examCounts.activeExams);
        setCompletedExams(examCounts.completedExams);
      } catch (err) {
        handleError(err, "Kunde inte hämta admin-statistik");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [handleError]);

  return {
    totalUsers,
    activeExams,
    completedExams,
    loading,
    error,
    clearError,
  };
};

export default useAdminDashboardStats;
