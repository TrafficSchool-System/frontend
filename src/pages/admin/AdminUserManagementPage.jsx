// src/pages/admin/AdminUserManagementPage.jsx
import AdminLayout from "../../components/admin/layout/AdminLayout";
import AdminUsersTable from "../../components/admin/userManagement/AdminUserTable";
import LoadingSpinner from "../../components/shared/ui/LoadingSpinner";
import useAdminUsers from "../../hooks/admin/useAdminUsers";
import Alert from "../../components/shared/ui/Alert";

const AdminUserManagementPage = () => {
  const { users, loading, error, clearError, deleteUser, updateUser } = useAdminUsers();

  if (loading) return <LoadingSpinner message="Laddar användare..." />;
  return (
    <AdminLayout>

      {/* 🔴 FELMEDDELANDE */}
      {error && <Alert type="error" message={error} onClose={clearError} />}

      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Hantera användare</h1>
        <p className="text-gray-600">
          Här kan du se alla användare, uppdatera information eller ta bort dem.
        </p>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <AdminUsersTable
            users={users}
            onDelete={deleteUser}
            onUpdate={updateUser}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUserManagementPage;
