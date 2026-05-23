/**
 * ==========================================
 * USER TABLE HEADER COMPONENT
 * ==========================================
 * Tabellhuvud med sorteringsmöjligheter
 */

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

const UserTableHeader = ({ onSort }) => {
  const columns = [
    { key: "userInfo.firstName", label: "Användare", sortable: true },
    { key: "userInfo.email", label: "E-post", sortable: true },
    { key: null, label: "Status", sortable: false },
    { key: "statistics.activeSubscriptions", label: "Prenumerationer", sortable: true },
    { key: "statistics.totalPayments", label: "Betalningar", sortable: true },
    { key: "statistics.totalSpent", label: "Spenderat", sortable: true },
    { key: null, label: "Åtgärder", sortable: false, align: "right" },
  ];

  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column, index) => (
          <th
            key={column.label + index}
            onClick={column.sortable ? () => onSort(column.key) : undefined}
            className={`px-6 py-4 text-${column.align || "left"} text-xs font-semibold text-gray-700 uppercase tracking-wider ${
              column.sortable ? "cursor-pointer hover:bg-gray-100 transition" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              {column.label}
              {column.sortable && (
                <ChevronUpDownIcon className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default UserTableHeader;
