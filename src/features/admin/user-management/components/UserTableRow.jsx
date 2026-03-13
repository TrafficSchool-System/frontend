/**
 * ==========================================
 * USER TABLE ROW COMPONENT
 * ==========================================
 * Rad i användartabellen med all användarinformation
 */

import { useNavigate } from "react-router-dom";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import UserAvatar from "./UserAvatar";
import UserStatusBadge from "./UserStatusBadge";

const UserTableRow = ({ user, onDelete }) => {
  const navigate = useNavigate();
  const userInfo = user.userInfo || user;
  const statistics = user.statistics || {};

  const handleRowClick = () => {
    navigate(`/admin/users/${userInfo.id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(user);
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    navigate(`/admin/users/${userInfo.id}`);
  };

  return (
    <tr
      className="hover:bg-gray-50 transition cursor-pointer"
      onClick={handleRowClick}
    >
      {/* Användare */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <UserAvatar firstName={userInfo.firstName} email={userInfo.email} />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {userInfo.firstName || userInfo.lastName
                ? `${userInfo.firstName || ""} ${userInfo.lastName || ""}`.trim()
                : "(Namn saknas)"}
            </div>
            <div className="text-xs text-gray-500">ID: {userInfo.id}</div>
          </div>
        </div>
      </td>

      {/* E-post */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{userInfo.email}</div>
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <UserStatusBadge statistics={statistics} />
      </td>

      {/* Prenumerationer */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          <span className="font-semibold text-blue-600">
            {statistics?.activeSubscriptions || 0}
          </span>{" "}
          aktiva
        </div>
        <div className="text-xs text-gray-500">
          av {statistics?.totalSubscriptions || 0} totalt
        </div>
      </td>

      {/* Betalningar */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          <span className="font-semibold">
            {statistics?.totalPayments || 0}
          </span>{" "}
          betalningar
        </div>
        <div className="text-xs text-gray-500">
          {statistics?.successfulPayments || 0} genomförda
        </div>
      </td>

      {/* Totalt spenderat */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">
          {statistics?.totalSpent
            ? `${statistics.totalSpent.toLocaleString("sv-SE")} kr`
            : "0 kr"}
        </div>
      </td>

      {/* Åtgärder */}
      <td
        className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleViewClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium"
            title="Visa detaljer"
          >
            <EyeIcon className="w-4 h-4" />
            Visa
          </button>
          <button
            onClick={handleDeleteClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition font-medium"
            title="Ta bort"
          >
            <TrashIcon className="w-4 h-4" />
            Ta bort
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
