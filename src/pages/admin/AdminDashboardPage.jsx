import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminAuthService from "../../services/admin/adminAuthService";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import StatsCard from "../../components/admin/dashboard/StatsCard";
import AdminInfoCard from "../../components/admin/dashboard/AdminInfoCard";
import LoadingSpinner from "../../components/shared/ui/LoadingSpinner";

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateAdmin = async () => {
      // Validera token mot backend
      const validAdmin = await adminAuthService.validateAdminToken();
      
      if (!validAdmin) {
        // Token ogiltig → Kicka ut till login
        navigate("/admin/login");
        return;
      }

      // Token giltig → Hämta admin user
      const admin = adminAuthService.getAdminUser();
      setAdminUser(admin);
      setLoading(false);
    };

    validateAdmin();
  }, [navigate]);

  if (loading) {
    return <LoadingSpinner message="Validerar admin-session..." />;
  }

  if (!adminUser) {
    return null; // Navigate kommer köra
  }

  // Stats data (kommer från backend senare)
  const stats = [
    {
      title: "Totalt Användare",
      value: null,
      description: "Data kommer snart",
      icon: "👥",
      iconColor: "text-blue-600"
    },
    {
      title: "Aktiva Quizzes",
      value: null,
      description: "Data kommer snart",
      icon: "📝",
      iconColor: "text-green-600"
    },
    {
      title: "Genomförda Exams",
      value: null,
      description: "Data kommer snart",
      icon: "🎓",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <AdminLayout adminUser={adminUser}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Admin Info */}
      <AdminInfoCard adminUser={adminUser} />
    </AdminLayout>
  );
};

export default AdminDashboard;