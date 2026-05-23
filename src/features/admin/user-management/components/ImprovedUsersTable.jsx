/**
 * ==========================================
 * IMPROVED USERS TABLE (REFACTORED)
 * ==========================================
 * Modern users table with search, filter, sorting, and better UI
 * Refaktoriserad och uppdelad i mindre komponenter
 */

import { useState, useMemo } from "react";
import ConfirmModal from "./ConfirmModal";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import NoResultsState from "./NoResultsState";
import UserTableSearchFilter from "./UserTableSearchFilter";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";

const ImprovedUsersTable = ({ users, loading, onDelete }) => {
  // State för sökning, filtrering och sortering
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "userInfo.email",
    direction: "asc",
  });

  // State för delete-bekräftelse
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Helper funktion för att hämta nested värden
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj) || "";
  };

  // Beräkna användarkategorier
  const activeUsersCount = users?.filter(
    (u) => u.statistics?.hasActiveSubscription,
  ).length;
  const inactiveUsersCount = users?.filter(
    (u) => !u.statistics?.hasActiveSubscription,
  ).length;

  // Sökning, filtrering och sortering
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users || [];

    // Sökning
    if (searchTerm) {
      filtered = filtered.filter((user) => {
        const userInfo = user.userInfo || user;
        const fullName =
          `${userInfo.firstName || ""} ${userInfo.lastName || ""}`.toLowerCase();
        const email = userInfo.email?.toLowerCase() || "";
        const search = searchTerm.toLowerCase();

        return fullName.includes(search) || email.includes(search);
      });
    }

    // Filtrering på status
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => {
        const hasActive = user.statistics?.hasActiveSubscription;
        return statusFilter === "active" ? hasActive : !hasActive;
      });
    }

    // Sortering
    filtered.sort((a, b) => {
      const aVal = getNestedValue(a, sortConfig.key);
      const bVal = getNestedValue(b, sortConfig.key);

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, searchTerm, statusFilter, sortConfig]);

  // Hantera sortering
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Hantera borttagning
  const handleDeleteClick = (user) => {
    const userInfo = user.userInfo || user;
    setUserToDelete(userInfo);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete && onDelete) {
      try {
        await onDelete(userToDelete.id);

        // Success feedback
        setDeleteModalOpen(false);
        setUserToDelete(null);

        // Ge användaren visuell feedback
        // (Du kan lägga till en toast notification här om du vill)
      } catch (err) {
        console.error("❌ Error deleting user:", err);

        // Visa detaljerat felmeddelande till användaren
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Kunde inte radera användaren. Försök igen.";

        alert(`Fel vid radering av användare:\n\n${errorMessage}`);

        setDeleteModalOpen(false);
        setUserToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  // Loading state
  if (loading) {
    return <LoadingState message="Hämtar användare..." />;
  }

  // Empty state
  if (!users || users.length === 0) {
    return (
      <EmptyState
        message="Inga användare hittades"
        description="Det finns inga användare i systemet än."
      />
    );
  }

  const hasActiveFilters = searchTerm || statusFilter !== "all";
  const hasNoResults = filteredAndSortedUsers.length === 0 && hasActiveFilters;

  return (
    <div className="space-y-6">
      {/* Bekräftelsedialog för borttagning */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`Är du säker på att du vill ta bort användaren ${userToDelete?.firstName || ""} ${userToDelete?.lastName || ""}? Detta kan inte ångras.`}
        confirmText="Ta bort"
      />

      {/* Sök och filter */}
      <UserTableSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        totalUsers={users.length}
        activeUsersCount={activeUsersCount}
        inactiveUsersCount={inactiveUsersCount}
        filteredCount={filteredAndSortedUsers.length}
        onClearFilters={handleClearFilters}
      />

      {/* Tabell */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <UserTableHeader onSort={handleSort} />
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedUsers.map((user) => (
                <UserTableRow
                  key={user.userInfo?.id || user.id}
                  user={user}
                  onDelete={handleDeleteClick}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Inget resultat */}
        {hasNoResults && <NoResultsState />}
      </div>
    </div>
  );
};

export default ImprovedUsersTable;
