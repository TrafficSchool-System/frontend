import { Navigate } from "react-router-dom";
import adminAuthService from "../../../services/admin/adminAuthService";

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = adminAuthService.isAdminAuthenticated();

  if (!isAuthenticated) {
    // Admin inte inloggad → Redirect till login
    return <Navigate to="/admin/login" replace />;
  }

  // Admin inloggad → Visa sidan
  return children;
};

export default ProtectedAdminRoute;