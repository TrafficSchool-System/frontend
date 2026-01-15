import { useEffect, useState } from "react";
import examService from "../../services/user/examService";
import useError from "../useError"; // importera vår egna error hook

const getCurrentUserId = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr).id;
  }
  return null;
};

const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const { error, handleError, clearError } = useError(); // använd error hook

  useEffect(() => {
    const fetchDashboardData = async () => {
      const userId = getCurrentUserId();
      if (!userId) {
        handleError(null, "Du måste vara inloggad"); // custom message
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [statsData, resultsData] = await Promise.all([
          examService.getExamStats(userId),
          examService.getAllExamResults(userId)
        ]);

        setStats(statsData);
        setRecentResults(resultsData.slice(0, 5));
      } catch (err) {
        handleError(err, "Kunde inte ladda dashboard"); // custom message
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [handleError]);

  return { stats, recentResults, loading, error, clearError }; // clearError för Alert
};

export default useDashboard;
