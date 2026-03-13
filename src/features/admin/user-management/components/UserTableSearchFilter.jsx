/**
 * ==========================================
 * USER TABLE SEARCH FILTER COMPONENT
 * ==========================================
 * Sök- och filtreringskontroller för användartabellen
 */

import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

const UserTableSearchFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  totalUsers,
  activeUsersCount,
  inactiveUsersCount,
  filteredCount,
  onClearFilters,
}) => {
  const hasActiveFilters = searchTerm || statusFilter !== "all";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sökfält */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Sök användare (namn eller e-post)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer"
          >
            <option value="all">Alla användare ({totalUsers})</option>
            <option value="active">
              Aktiva prenumerationer ({activeUsersCount})
            </option>
            <option value="inactive">Inaktiva ({inactiveUsersCount})</option>
          </select>
        </div>
      </div>

      {/* Resultat räknare */}
      {hasActiveFilters && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-gray-600">
            Visar{" "}
            <span className="font-semibold text-gray-900">{filteredCount}</span>{" "}
            av{" "}
            <span className="font-semibold text-gray-900">{totalUsers}</span>{" "}
            användare
          </p>
          <button
            onClick={onClearFilters}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Rensa filter
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTableSearchFilter;
