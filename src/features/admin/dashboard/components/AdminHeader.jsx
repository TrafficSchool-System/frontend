/**
 * ==========================================
 * ADMIN HEADER
 * ==========================================
 * Header med navigation och användarinfo för admin panel
 */

import { useNavigate, useLocation } from "react-router-dom";

const AdminHeader = ({ adminUser, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/users", label: "Användare", icon: "👥" },
    { path: "/admin/packages", label: "Paket", icon: "📦" },
    { path: "/admin/excel-files", label: "Excel-filer", icon: "📁" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top Row: Title and Logout */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-blue-600">🎓</span>
              TrafficSchool Admin
            </h1>
            {adminUser && (
              <p className="text-sm text-gray-600 mt-1">
                Välkommen,{" "}
                <span className="font-medium">
                  {adminUser.firstName} {adminUser.lastName}
                </span>
              </p>
            )}
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium flex items-center gap-2 shadow-sm"
          >
            <span>🚪</span>
            Logga ut
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex gap-2 border-t border-gray-200 pt-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                px-4 py-2 rounded-lg transition font-medium flex items-center gap-2
                ${
                  isActive(item.path)
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
