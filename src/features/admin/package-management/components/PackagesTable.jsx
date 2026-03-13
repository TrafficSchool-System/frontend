/**
 * ==========================================
 * PACKAGES TABLE
 * ==========================================
 * Tabell för att visa och hantera prenumerationspaket
 */

import Button from "@shared/components/ui/Button";

const PackagesTable = ({ packages, onEdit, onToggleActive }) => {
  if (!packages || packages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Inga paket hittades</p>
      </div>
    );
  }

  const getPackageTypeName = (type) => {
    const types = {
      DAY: "Dag",
      WEEK: "Vecka",
      MONTH: "Månad",
    };
    return types[type] || type;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Namn
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Typ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pris
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Varaktighet
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Åtgärder
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {packages.map((pkg) => (
            <tr key={pkg.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {pkg.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {pkg.name}
                </div>
                <div className="text-sm text-gray-500">
                  {pkg.description || "-"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {getPackageTypeName(pkg.packageType)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {pkg.price} kr
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {pkg.durationDays} {pkg.durationDays === 1 ? "dag" : "dagar"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    pkg.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {pkg.active ? "Aktiv" : "Inaktiv"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => onEdit(pkg)}
                  >
                    Redigera
                  </Button>
                  <Button
                    variant={pkg.active ? "danger" : "success"}
                    size="small"
                    onClick={() => onToggleActive(pkg)}
                  >
                    {pkg.active ? "Inaktivera" : "Aktivera"}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackagesTable;
