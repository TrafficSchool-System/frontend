import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminAuthService from "../services/adminAuthService";
import AdminLoginForm from "../components/AdminLoginForm";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  // Kolla om redan inloggad vid mount
  useEffect(() => {
    if (adminAuthService.isAdminAuthenticated()) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  // Handler för lyckad login
  const handleLoginSuccess = async (username, password) => {
    await adminAuthService.loginAdmin(username, password);
    console.log("✅ Admin login successful");
    navigate("/admin/dashboard");
  };

  // Handler för login-fel (valfritt)
  const handleLoginError = (error) => {
    console.error("❌ Admin login failed:", error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-traffic-yellow to-traffic-black">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Logga in med ditt admin-konto</p>
        </div>

        {/* Login Form Component */}
        <AdminLoginForm
          onLoginSuccess={handleLoginSuccess}
          onLoginError={handleLoginError}
        />

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Inte admin?{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Gå till användar-inloggning
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
