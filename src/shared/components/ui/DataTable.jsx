/**
 * ==========================================
 * DATA TABLE COMPONENT
 * ==========================================
 * Återanvändbar tabell-komponent för datalistor
 *
 * FEATURES:
 * - Responsiv design
 * - Sorterbara kolumner
 * - Action buttons per rad
 * - Empty state
 * - Loading state
 *
 * ANVÄNDNING:
 * <DataTable
 *   columns={[
 *     { key: 'name', label: 'Namn', sortable: true },
 *     { key: 'email', label: 'Email' },
 *     { key: 'actions', label: 'Åtgärder', align: 'right' }
 *   ]}
 *   data={users}
 *   renderCell={(item, column) => {
 *     if (column.key === 'actions') {
 *       return <Button>Edit</Button>
 *     }
 *     return item[column.key]
 *   }}
 *   emptyMessage="Inga användare hittades"
 * />
 */

import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const DataTable = ({
  columns = [],
  data = [],
  renderCell,
  onRowClick,
  emptyMessage = "Ingen data att visa",
  loading = false,
  striped = true,
  hoverable = true,
  className = "",
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Sortering
  const handleSort = (key) => {
    if (!columns.find((col) => col.key === key)?.sortable) return;

    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-8">
        <LoadingSpinner message="Laddar data..." />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12">
        <div className="text-center">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-gray-600 text-lg">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-x-auto bg-white rounded-lg border border-gray-200 ${className}`}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`
                  px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider
                  ${column.sortable ? "cursor-pointer hover:bg-gray-100 select-none" : ""}
                  ${column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left"}
                `}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  <span>{column.label}</span>
                  {column.sortable && (
                    <span className="text-gray-400">
                      {sortConfig.key === column.key
                        ? sortConfig.direction === "asc"
                          ? "↑"
                          : "↓"
                        : "↕"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={`bg-white divide-y divide-gray-200 ${striped ? "divide-y" : ""}`}
        >
          {sortedData.map((item, index) => (
            <tr
              key={item.id || index}
              className={`
                ${striped && index % 2 === 1 ? "bg-gray-50" : ""}
                ${hoverable ? "hover:bg-gray-100 cursor-pointer" : ""}
                transition-colors duration-150
              `}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`
                    px-6 py-4 whitespace-nowrap text-sm text-gray-900
                    ${column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left"}
                  `}
                >
                  {renderCell ? renderCell(item, column) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
