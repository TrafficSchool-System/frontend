// src/App.jsx
import "../styles/globals.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useMemo } from "react";

import LoadingSpinner from "../shared/components/ui/LoadingSpinner";
import Alert from "../shared/components/ui/Alert";
import GlobalErrorBoundary from "../shared/components/error/GlobalErrorBoundary"; // <-- Importera
import ScrollToTop from "../shared/components/ui/ScrollToTop";

// PAYMENT IMPORTS
import Paywall from "../features/payment/pages/Paywall";
import SubscriptionPage from "../features/payment/pages/SubscriptionPage";

// USER IMPORTS
import UserLayout from "../shared/components/layout/UserLayout";
import UserDashboardPage from "../features/user-dashboard/pages/UserDashboardPage";
import UserLoginPage from "../features/auth/pages/UserLoginPage";
import FinalExamPage from "../features/exam/pages/FinalExamPage";
import ExamResultsPage from "../features/exam/pages/ExamResultPage";

// QUIZ IMPORTS
import { QuizProvider } from "../features/quiz/context/QuizContext";
import SelectSubjectsPage from "../features/quiz/pages/SelectSubjectsPage";
import SelectLimitPage from "../features/quiz/pages/SelectLimitPage";
import ActiveQuizPage from "../features/quiz/pages/ActiveQuizPage";
import QuizResultsPage from "../features/quiz/pages/QuizResultsPage";
import QuizPracticeRedirect from "../features/quiz/pages/QuizPracticeRedirect";

// ADMIN IMPORTS
import AdminLoginPage from "../features/admin/auth/pages/AdminLoginPage";
import AdminDashboardPage from "../features/admin/dashboard/pages/AdminDashboardPage";
import PackageManagementPage from "../features/admin/package-management/pages/PackageManagementPage";
import ProtectedAdminRoute from "../features/admin/auth/guards/ProtectedAdminRoute";
import adminAuthService from "../features/admin/auth/services/adminAuthService";
import CompleteUserManagementPage from "../features/admin/user-management/pages/CompleteUserManagementPage";
import UserDetailViewPage from "../features/admin/user-management/pages/UserDetailViewPage";
import AdminExcelPage from "../features/admin/excel-management/pages/AdminExcelPage";

function App() {
  const { user, loading, error, login, logout, clearError } = useAuth();
  const navigate = useNavigate();

  // Memoize admin auth check
  const isAdminAuth = useMemo(() => {
    return adminAuthService.isAdminAuthenticated();
  }, []);

  /**
   * Subscription Status
   *
   * OPTIMERING: Använd user.hasActiveSubscription från backend direkt
   * Backend beräknar redan status korrekt: !cancelled && !isExpired()
   * Ingen extra API call behövs!
   *
   * Admin har alltid access (skippar subscription check)
   */
  const hasSubscription = useMemo(() => {
    if (!user) return false;
    if (user.role === "ADMIN") return true; // Admin har alltid access

    const hasActive = user.hasActiveSubscription === true;

    // ✅ DEBUG: Logga subscription status för troubleshooting
    console.log("🔍 Subscription Status Check:", {
      userId: user.id,
      email: user.email,
      role: user.role,
      hasActiveSubscription: user.hasActiveSubscription,
      hasSubscription: hasActive,
    });

    return hasActive;
  }, [user]);

  /**
   * När betalning är genomförd
   *
   * Uppdaterar user object i localStorage och state
   * Triggerar re-render som visar skyddat innehåll
   */
  const handleSubscriptionActive = async () => {
    console.log("✅ Betalning genomförd, uppdaterar subscription status...");

    try {
      // Hämta nuvarande user från localStorage
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

      // Uppdatera hasActiveSubscription
      const updatedUser = {
        ...currentUser,
        hasActiveSubscription: true,
      };

      // Spara tillbaka till localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Detta triggerar re-render i useAuth hook som läser från localStorage
      // Alternativt: Anropa login(updatedUser) om useAuth exponerar det

      console.log("✅ User uppdaterad - hasActiveSubscription = true");

      // Navigera till startsidan efter kort delay
      setTimeout(() => {
        window.location.href = "/"; // Full page reload för att säkerställa state-uppdatering
      }, 500);
    } catch (error) {
      console.error("❌ Fel vid uppdatering av subscription status:", error);
      // Fallback: Reload page
      window.location.href = "/";
    }
  };

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
                <CompleteUserManagementPage />
              </ProtectedAdminRoute>
            }
          />

          {/* ADMIN USER DETAIL VIEW */}
          <Route
            path="/admin/users/:userId"
            element={
              <ProtectedAdminRoute>
                <UserDetailViewPage />
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

          {/* ADMIN PACKAGE MANAGEMENT */}
          <Route
            path="/admin/packages"
            element={
              <ProtectedAdminRoute>
                <PackageManagementPage />
              </ProtectedAdminRoute>
            }
          />

          {/* USER ROUTES */}
          {user ? (
            // Enkel och tydlig routing: HAR prenumeration = full access, SAKNAR = endast Paywall
            !hasSubscription ? (
              // INGEN PRENUMERATION: Visa ENDAST Paywall (path="*" fångar ALLT)
              <Route
                path="*"
                element={
                  <Paywall
                    userId={user.id}
                    onSubscriptionActive={handleSubscriptionActive}
                  />
                }
              />
            ) : (
              // HAR PRENUMERATION: Full access till alla routes med UserLayout
              <Route
                key="user-routes"
                element={<UserLayout onLogout={logout} />}
              >
                <Route path="/" element={<UserDashboardPage user={user} />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                
                {/* FÖRNYA PRENUMERATION: Paywall för förnyelse */}
                <Route 
                  path="/renew" 
                  element={<Paywall userId={user.id} onSubscriptionActive={handleSubscriptionActive} />} 
                />

                {/* Quiz routes med QuizProvider */}
                <Route
                  path="/quiz/practice/*"
                  element={
                    <QuizProvider>
                      <Routes>
                        <Route index element={<QuizPracticeRedirect />} />
                        <Route
                          path="subjects"
                          element={<SelectSubjectsPage />}
                        />
                        <Route path="limit" element={<SelectLimitPage />} />
                        <Route path="active" element={<ActiveQuizPage />} />
                        <Route path="results" element={<QuizResultsPage />} />
                      </Routes>
                    </QuizProvider>
                  }
                />

                <Route path="/quiz/final" element={<FinalExamPage />} />
                <Route path="/results" element={<ExamResultsPage />} />
              </Route>
            )
          ) : (
            <>
              <Route
                path="/"
                element={<UserLoginPage onLoginSuccess={login} />}
              />
              <Route
                path="/register"
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
