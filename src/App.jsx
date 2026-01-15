// src/App.jsx
import "./styles/globals.css";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/user/useAuth";
import { useMemo } from "react";

import LoadingSpinner from "./components/shared/ui/LoadingSpinner";
import Alert from "./components/shared/ui/Alert";
import GlobalErrorBoundary from "./components/shared/error/GlobalErrorBoundary"; // <-- Importera
import ScrollToTop from "./components/shared/ui/ScrollToTop";

// USER IMPORTS
import UserLayout from "./components/user/layout/UserLayout";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import UserLoginPage from "./pages/user/UserLoginPage";
import QuizPage from "./pages/user/QuizPage";
import FinalExamPage from "./pages/user/FinalExamPage";
import ExamResultsPage from "./pages/user/ExamResultPage";

// ADMIN IMPORTS
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ProtectedAdminRoute from "./components/admin/auth/ProtectedAdminRoute";
import adminAuthService from "./services/admin/adminAuthService";
import AdminActionsPage from "./pages/admin/AdminUserManagementPage";
import AdminExcelPage from "./pages/admin/AdminExcelPage";

function App() {
  const { user, loading, error, login, logout, clearError } = useAuth();

  // Memoize admin auth check
  const isAdminAuth = useMemo(() => {
    return adminAuthService.isAdminAuthenticated();
  }, []);

  // Loading state
  if (loading) {
    return <LoadingSpinner message="Startar" fullScreen={true} />;
  }

  // Error state från useAuth-hook
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-4">
          <Alert message={error} type="error" onClose={clearError} />
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Försök igen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GlobalErrorBoundary>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* ADMIN DASHBOARD - Protected route */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />

          {/* ADMIN ACTIONS (User Management) */}
          <Route
            path="/admin/users"
            element={
              <ProtectedAdminRoute>
                <AdminActionsPage />
              </ProtectedAdminRoute>
            }
          />

          {/* ADMIN EXCEL PAGE (Excel Management) */}
          <Route
            path="/admin/excel-files"
            element={
              <ProtectedAdminRoute>
                <AdminExcelPage />
              </ProtectedAdminRoute>
            }
          />

          {/* USER ROUTES */}
          {user ? (
            <Route element={<UserLayout onLogout={logout} />}>
              <Route path="/" element={<UserDashboardPage user={user} />} />
              <Route path="/quiz/practice" element={<QuizPage />} />
              <Route path="/quiz/final" element={<FinalExamPage />} />
              <Route path="/results" element={<ExamResultsPage />} />
            </Route>
          ) : (
            <>
              <Route
                path="/"
                element={<UserLoginPage onLoginSuccess={login} />}
              />
              <Route
                path="*"
                element={<UserLoginPage onLoginSuccess={login} />}
              />
            </>
          )}
        </Routes>
      </div>
    </GlobalErrorBoundary>
  );
}

export default App;
