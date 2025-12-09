import { useNavigate } from "react-router-dom";
import adminAuthService from "../../../services/admin/adminAuthService";
import AdminHeader from "../dashboard/AdminHeader";

const AdminLayout = ({ children, adminUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminAuthService.logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader adminUser={adminUser} onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;