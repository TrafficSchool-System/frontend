import { useNavigate } from "react-router-dom";
import adminAuthService from "../../../services/admin/adminAuthService";
import AdminHeader from "../dashboard/AdminHeader";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/ui/LoadingSpinner";

const AdminLayout = ({ children}) => {
  const [adminUser, setAdminUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const validate = async () => {
      const valid = await adminAuthService.validateAdminToken(); 

      if(!valid){
        navigate("/admin/login"); 
        return;
      }
      setAdminUser(adminAuthService.getAdminUser()); 
      setLoading(false); 
    };
    validate();
  }, [navigate]); 

  if (loading) {
    return <LoadingSpinner message="Validerar admin..."/>; 
  }

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