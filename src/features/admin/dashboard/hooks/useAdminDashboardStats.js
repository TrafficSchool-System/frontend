// src/hooks/admin/useAdminDashboardStats.js
import { useEffect, useState } from "react";
import userService from "@features/user-dashboard/services/userService";
import examService from "@features/exam/services/examService";
import useError from "@shared/hooks/useError";

const useAdminDashboardStats = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [activeExams, setActiveExams] = useState(null);
  const [completedExams, setCompletedExams] = useState(null);
  const [loading, setLoading] = useState(true);

  const { error, handleError, clearError } = useError();

  useEffect(() => {
    const fetchStats = async () => {
      const [usersResult, examResult] = await Promise.allSettled([
        userService.getTotalUsers(),
        examService.getExamCounts(),
      ]);

      if (usersResult.status === "fulfilled") {
        setTotalUsers(usersResult.value);
      }
      if (examResult.status === "fulfilled") {
        setActiveExams(examResult.value.activeExams ?? 0);
        setCompletedExams(examResult.value.completedExams ?? 0);
      }

      const anyFailed =
        usersResult.status === "rejected" || examResult.status === "rejected";
      if (anyFailed) {
        handleError(
          null,
          "En eller flera tjänster svarar inte just nu — statistiken kan vara ofullständig.",
        );
      }

      setLoading(false);
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
