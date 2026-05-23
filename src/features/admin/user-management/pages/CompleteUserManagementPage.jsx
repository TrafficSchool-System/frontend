/**
 * ==========================================
 * COMPLETE USER MANAGEMENT PAGE
 * ==========================================
 * Använder den nya aggregerade datan från AdminService
 * Visar användare med prenumerationer, betalningar och statistik
 */

import { useState } from "react";
import AdminLayout from "../../shared/components/AdminLayout";
import Alert from "@shared/components/ui/Alert";
import useAllUsersWithDetails from "../hooks/useAllUsersWithDetails";
import ImprovedUsersTable from "../components/ImprovedUsersTable";
import CreateUserWithSubscriptionModal from "../components/CreateUserWithSubscriptionModal";
import userManagementService from "../services/userManagementService";

const CompleteUserManagementPage = () => {
  const { users, loading, error, clearError, refetch, deleteUser } =
    useAllUsersWithDetails();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [createError, setCreateError] = useState("");

  // Handle creation of user with subscription
  const handleCreateUser = async (userData) => {
    setCreateError("");
    setSuccessMessage("");

    try {
      const response =
        await userManagementService.createUserWithSubscription(userData);

      // Kolla om backend returnerade ett fel
      if (!response || response.status === "FAILED" || !response.user) {
        const errorMsg = response?.message || "Användaren kunde inte skapas";
        setCreateError(errorMsg);
        throw new Error(errorMsg);
      }

      // Visa success message
      setSuccessMessage(
        `✅ Användare ${response.user.firstName} ${response.user.lastName} skapades! ` +
          `Paket: ${response.packageName}. Magic link skickad till ${response.user.email}.`,
      );

      // Stäng modal
      setIsCreateModalOpen(false);

      // Uppdatera användarlistan
      await refetch();

      // Rensa success message efter 10 sekunder
      setTimeout(() => setSuccessMessage(""), 10000);
    } catch (err) {
      console.error("Failed to create user:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Kunde inte skapa användare";
      setCreateError(errorMsg);
      throw err; // Re-throw för att modal ska kunna hantera fel
    }
  };

  const stats = {
    totalUsers: users?.length || 0,
    activeSubscriptions:
      users?.reduce(
        (acc, u) => acc + (u.statistics?.activeSubscriptions || 0),
        0,
      ) || 0,
    successfulPayments:
      users?.reduce(
        (acc, u) => acc + (u.statistics?.successfulPayments || 0),
        0,
      ) || 0,
    totalRevenue:
      users?.reduce((acc, u) => acc + (u.statistics?.totalSpent || 0), 0) || 0,
  };

  return (
    <AdminLayout>
      {error && <Alert type="error" message={error} onClose={clearError} />}
      {createError && (
        <Alert
          type="error"
          message={createError}
          onClose={() => setCreateError("")}
        />
      )}
      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}

      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Användarhantering
            </h1>
            <p className="text-gray-600 mt-2">
              Komplett översikt över alla användare, prenumerationer och
              betalningar
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-sm hover:shadow-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Skapa användare
            </button>
            <button
              onClick={refetch}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Uppdatera
            </button>
          </div>
        </div>

        {/* Statistik cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Totalt användare */}
          <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-sm border border-blue-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30 -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-blue-500 rounded-xl">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-sm font-medium text-blue-700">
                Totalt användare
              </div>
              <div className="text-3xl font-bold text-blue-900 mt-2">
                {stats.totalUsers.toLocaleString("sv-SE")}
              </div>
            </div>
          </div>

          {/* Aktiva prenumerationer */}
          <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-sm border border-green-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-30 -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-green-500 rounded-xl">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-sm font-medium text-green-700">
                Aktiva prenumerationer
              </div>
              <div className="text-3xl font-bold text-green-900 mt-2">
                {stats.activeSubscriptions.toLocaleString("sv-SE")}
              </div>
            </div>
          </div>

          {/* Lyckade betalningar */}
          <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-sm border border-purple-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-30 -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-purple-500 rounded-xl">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-sm font-medium text-purple-700">
                Lyckade betalningar
              </div>
              <div className="text-3xl font-bold text-purple-900 mt-2">
                {stats.successfulPayments.toLocaleString("sv-SE")}
              </div>
            </div>
          </div>

          {/* Total intäkt */}
          <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-sm border border-orange-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-30 -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-orange-500 rounded-xl">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-sm font-medium text-orange-700">
                Total intäkt
              </div>
              <div className="text-3xl font-bold text-orange-900 mt-2">
                {stats.totalRevenue.toLocaleString("sv-SE")} kr
              </div>
            </div>
          </div>
        </div>

        {/* Tabell med förbättrad UI */}
        <ImprovedUsersTable
          users={users}
          loading={loading}
          onDelete={deleteUser}
        />

        {/* Create User Modal */}
        <CreateUserWithSubscriptionModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreateUser}
        />
      </div>
    </AdminLayout>
  );
};

export default CompleteUserManagementPage;
