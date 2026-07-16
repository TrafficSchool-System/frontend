/**
 * ==========================================
 * USER DETAIL VIEW PAGE
 * ==========================================
 * Visar komplett information om en specifik användare
 */

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../shared/components/AdminLayout";
import LoadingSpinner from "@shared/components/ui/LoadingSpinner";
import Alert from "@shared/components/ui/Alert";
import useCompleteUserDetails from "../hooks/useCompleteUserDetails";
import SubscriptionSummary from "../components/SubscriptionSummary";
import PaymentSummary from "../components/PaymentSummary";
import UpdateUserModal from "../components/UpdateUserModal";
import userManagementService from "../services/userManagementService";

const UserDetailViewPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { userDetails, loading, error, clearError, refetch } =
    useCompleteUserDetails(userId);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateUser = async (updatedData) => {
    try {
      setIsUpdating(true);
      await userManagementService.updateUserInfo(userId, {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        personalNumber: updatedData.personalNumber,
        phoneNumber: updatedData.phoneNumber,
      });
      setUpdateSuccess(true);
      setIsEditModalOpen(false);
      await refetch(); // Uppdatera användardata
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      setUpdateError(
        err.response?.data?.message || "Kunde inte uppdatera användare",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner message="Laddar användarinformation..." fullScreen />
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Alert type="error" message={error} onClose={clearError} />
      </AdminLayout>
    );
  }

  if (!userDetails || !userDetails.userInfo) {
    return (
      <AdminLayout>
        <Alert type="warning" message="Användare hittades inte" />
      </AdminLayout>
    );
  }

  const { userInfo, subscriptions, payments, statistics } = userDetails;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Success/Error meddelanden */}
        {updateSuccess && (
          <Alert
            type="success"
            message="Användaren uppdaterades!"
            onClose={() => setUpdateSuccess(false)}
          />
        )}
        {updateError && (
          <Alert
            type="error"
            message={updateError}
            onClose={() => setUpdateError(null)}
          />
        )}

        {/* Header med tillbaka-knapp */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/users")}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            ← Tillbaka
          </button>
        </div>

        {/* Användarinformation */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              👤 Användarinformation
            </h3>
            <button
              onClick={() => setIsEditModalOpen(true)}
              disabled={isUpdating}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✏️ Redigera information
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">
                Användar-ID (kan ej ändras)
              </p>
              <p className="font-medium text-gray-900">{userInfo.id}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">E-post</p>
              <p className="font-medium text-gray-900">{userInfo.email}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Namn</p>
              <p className="font-medium text-gray-900">
                {userInfo.firstName || userInfo.lastName
                  ? `${userInfo.firstName || ""} ${userInfo.lastName || ""}`
                  : "(Inte angivet)"}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Personnummer</p>
              <p className="font-medium text-gray-900">
                {userInfo.personalNumber || "-"}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Telefonnummer</p>
              <p className="font-medium text-gray-900">
                {userInfo.phoneNumber || "-"}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">
                Registrerad (kan ej ändras)
              </p>
              <p className="font-medium text-gray-900">
                {new Date(userInfo.createdAt).toLocaleDateString("sv-SE")}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              💡 Tip: Klicka på "Redigera information" för att ändra användarens
              uppgifter. ID och registreringsdatum kan inte ändras.
            </p>
          </div>
        </div>

        {/* Prenumerationer */}
        <SubscriptionSummary
          subscriptions={subscriptions}
          statistics={statistics}
          onRefresh={refetch}
        />

        {/* Betalningar */}
        <PaymentSummary payments={payments} />
      </div>

      {/* Uppdateringsmodal */}
      <UpdateUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={{
          id: userInfo.id,
          firstName: userInfo.firstName ?? "",
          lastName: userInfo.lastName ?? "",
          email: userInfo.email,
          personalNumber: userInfo.personalNumber,
          phoneNumber: userInfo.phoneNumber,
          createdAt: userInfo.createdAt,
        }}
        onSave={handleUpdateUser}
      />
    </AdminLayout>
  );
};

export default UserDetailViewPage;
