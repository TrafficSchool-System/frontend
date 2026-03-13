import { useState, useEffect } from "react";
import { getSubscriptionHistory } from "../services/paymentService";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

/**
 * SubscriptionHistory Component
 * Visar användarens prenumerationshistorik med TailwindCSS
 */
export default function SubscriptionHistory({ userId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getSubscriptionHistory(userId);
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Laddar historik...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <span className="text-4xl mb-4 block">⚠️</span>
        <p className="text-red-600 font-semibold">Ett fel uppstod: {error}</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-gray-200">
        <span className="text-6xl mb-4 block">📜</span>
        <p className="text-gray-600 text-lg">
          Ingen prenumerationshistorik hittades.
        </p>
      </div>
    );
  }

  const getPackageIcon = (packageName) => {
    // packageName kommer som "7-DAYS", "30-DAYS" etc
    if (!packageName) return "📦";

    const name = packageName.toUpperCase();
    if (name.includes("DAY") && !name.includes("30")) {
      return "📅";
    } else if (name.includes("30") || name.includes("MONTH")) {
      return "📅";
    } else if (name.includes("WEEK")) {
      return "📆";
    }
    return "📦";
  };

  const getPackageLabel = (packageName) => {
    // packageName kommer som "7-DAYS", "30-DAYS" etc
    if (!packageName) return "Okänt paket";
    return packageName; // Returnera som det är, t.ex. "7-DAYS"
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-gray-200">
        <span className="text-3xl">📜</span>
        <h3 className="text-3xl font-bold text-gray-800">
          Prenumerationshistorik
        </h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Pakettyp
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Pris
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Startdatum
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Slutdatum
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {history.map((item) => (
              <tr
                key={item.id}
                className={`
                  transition-colors hover:bg-gray-50
                  ${!item.valid ? "opacity-60" : ""}
                `}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="flex items-center gap-2 font-medium text-gray-900">
                    <span className="text-2xl">
                      {getPackageIcon(item.packageName)}
                    </span>
                    {getPackageLabel(item.packageName)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                  {item.packagePrice || item.price} SEK
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {format(new Date(item.startDate), "dd MMM yyyy", {
                    locale: sv,
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {format(new Date(item.endDate), "dd MMM yyyy", {
                    locale: sv,
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${
                        item.valid
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    `}
                  >
                    {item.valid ? "Aktiv" : "Utgången"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className={`
              p-4 border-2 rounded-xl
              ${item.valid ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-2 font-bold text-gray-900">
                <span className="text-2xl">
                  {getPackageIcon(item.packageName)}
                </span>
                {getPackageLabel(item.packageName)}
              </span>
              <span
                className={`
                  px-3 py-1 rounded-full text-xs font-bold uppercase
                  ${
                    item.valid
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }
                `}
              >
                {item.valid ? "Aktiv" : "Utgången"}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Pris:</span>
                <span className="font-bold text-gray-900">
                  {item.packagePrice || item.price} SEK
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Start:</span>
                <span className="font-medium text-gray-900">
                  {format(new Date(item.startDate), "dd MMM yyyy", {
                    locale: sv,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Slut:</span>
                <span className="font-medium text-gray-900">
                  {format(new Date(item.endDate), "dd MMM yyyy", {
                    locale: sv,
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
