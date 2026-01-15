// src/pages/admin/AdminDashboardPage.jsx
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import StatsCard from "../../components/admin/dashboard/StatsCard";
import AdminInfoCard from "../../components/admin/dashboard/AdminInfoCard";
import AdminQuickActions from "../../components/admin/dashboard/AdminQuickActions";
import Button from "../../components/shared/ui/Button";
import Alert from "../../components/shared/ui/Alert";
import useAdminDashboardStats from "../../hooks/admin/useAdminDashboardStats";

const AdminDashboardPage = () => {
  const { totalUsers, activeExams, completedExams, loading, error,clearError } = useAdminDashboardStats();
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Användare",
      value: loading ? "…" : totalUsers,
      icon: "👥",
    },
    { title: "Aktiva Quizzes",
      value: loading ? "…" : activeExams, 
      icon: "📝" 
    },
    { title: "Genomförda Exams",
      value: loading ? "…" : completedExams, 
      icon: "🎓" 
    },
  ];

  return (
    <AdminLayout>

      {/* 🔴 FELMEDDELANDE */}
      {error && <Alert type="error" message={error} onClose={clearError} className="mb-2" />}
        

      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map((s, i) => (
          <StatsCard key={i} {...s} />
        ))}
      </div>

      <AdminInfoCard />

      <AdminQuickActions>
        <Button onClick={() => navigate("/admin/users")}>
          Hantera användare
        </Button>
        <Button onClick={() => navigate("/admin/excel-files")}>
          Hantera Excelfiler
        </Button>
      </AdminQuickActions>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
