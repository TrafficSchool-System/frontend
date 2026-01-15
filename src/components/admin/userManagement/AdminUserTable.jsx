import { useState } from "react";
import Button from "../../shared/ui/Button";
import UpdateUserModal from "./UpdateUserModal";
import ConfirmModal from "./ConfirmModal";
import Alert from "../../shared/ui/Alert";

const AdminUsersTable = ({ users, onDelete, onUpdate }) => {
  // ===== STATE =====
  const [selectedUser, setSelectedUser] = useState(null);

  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [alert, setAlert] = useState({
    message: "",
    type: "info"
  });

  // ===== UPDATE =====
  const openUpdate = (user) => {
    setSelectedUser(user);
    setUpdateOpen(true);
  };

  const closeUpdate = () => {
    setSelectedUser(null);
    setUpdateOpen(false);
  };

  const handleUpdateSave = async (updatedData) => {
    try {
      await onUpdate(selectedUser.id, updatedData);

      setAlert({
        message: "Användaren uppdaterades korrekt",
        type: "success"
      });

      closeUpdate();
    } catch (err) {
      setAlert({
        message:
          err?.response?.data?.message ||
          "Fel vid uppdatering av användare",
        type: "error"
      });
    }
  };

  // ===== DELETE =====
  const openDeleteConfirm = (user) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const closeDeleteConfirm = () => {
    setSelectedUser(null);
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await onDelete(selectedUser.id);

      setAlert({
        message: "Användaren har tagits bort",
        type: "success"
      });

      closeDeleteConfirm();
    } catch (err) {
      setAlert({
        message:
          err?.response?.data?.message ||
          "Fel vid borttagning av användare",
        type: "error"
      });
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">

      {/* ===== ALERT ===== */}
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "info" })}
          className="mb-4"
        />
      )}

      {/* ===== UPDATE MODAL ===== */}
      <UpdateUserModal
        isOpen={updateOpen}
        onClose={closeUpdate}
        user={selectedUser}
        onSave={handleUpdateSave}
      />

      {/* ===== DELETE CONFIRM MODAL ===== */}
      <ConfirmModal
        isOpen={deleteOpen}
        onClose={closeDeleteConfirm}
        onConfirm={handleDeleteConfirm}
        message={`Är du säker på att du vill ta bort ${selectedUser?.firstName} ${selectedUser?.lastName}?`}
      />

      {/* ===== TABLE ===== */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Namn</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Åtgärder</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                Inga användare hittades.
              </td>
            </tr>
          )}

          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2 text-sm text-gray-700">{user.id}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-4 py-2 text-sm text-right flex gap-2 justify-end flex-wrap">
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => openUpdate(user)}
                >
                  Uppdatera
                </Button>

                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => openDeleteConfirm(user)}
                >
                  Ta bort
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable;
