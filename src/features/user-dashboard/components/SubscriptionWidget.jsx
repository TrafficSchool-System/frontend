import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

/**
 * SubscriptionWidget Component
 * Visar prenumerationsstatus på dashboard med utgångsdatum
 */
const SubscriptionWidget = ({ subscription }) => {
  const navigate = useNavigate();

  // Ingen prenumeration
  if (!subscription) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">⚠️</span>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">
              Ingen aktiv prenumeration
            </h3>
            <p className="text-gray-600 text-sm">
              Du behöver en prenumeration för att använda alla funktioner
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/subscription")}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Köp prenumeration
        </button>
      </div>
    );
  }

  const {
    packageName,
    endDate,
    valid,
    daysRemaining,
    isExpiringSoon,
    isExpired,
  } = subscription;

  // Utgången prenumeration
  if (isExpired) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-red-300">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">❌</span>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">
              Prenumeration utgången
            </h3>
            <p className="text-sm text-gray-600">{packageName}</p>
          </div>
        </div>
        <div className="mb-4 p-3 bg-red-100 rounded-lg border-l-4 border-red-500">
          <p className="text-sm text-red-800">
            <strong>Utgick:</strong>{" "}
            {format(new Date(endDate), "dd MMMM yyyy", { locale: sv })}
          </p>
        </div>
        <button
          onClick={() => navigate("/subscription")}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          🔄 Förnya prenumeration
        </button>
      </div>
    );
  }

  // Utgår snart
  if (isExpiringSoon) {
    return (
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg p-6 border-2 border-orange-300">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">⚠️</span>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">
              Prenumeration utgår snart
            </h3>
            <p className="text-sm text-gray-600">{packageName}</p>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="text-gray-600 font-medium">Utgår om:</span>
            <span className="text-orange-600 font-bold text-lg">
              {daysRemaining} {daysRemaining === 1 ? "dag" : "dagar"}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="text-gray-600 font-medium">Utgångsdatum:</span>
            <span className="text-gray-900 font-semibold">
              {format(new Date(endDate), "dd MMM yyyy", { locale: sv })}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate("/subscription")}
          className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          ⚡ Förnya nu
        </button>
      </div>
    );
  }

  // Aktiv prenumeration
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">✅</span>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">
            Aktiv prenumeration
          </h3>
          <p className="text-sm text-gray-600">{packageName}</p>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center p-3 bg-white rounded-lg">
          <span className="text-gray-600 font-medium">Dagar kvar:</span>
          <span className="text-green-600 font-bold text-lg">
            {daysRemaining} {daysRemaining === 1 ? "dag" : "dagar"}
          </span>
        </div>
        <div className="flex justify-between items-center p-3 bg-white rounded-lg">
          <span className="text-gray-600 font-medium">Utgår:</span>
          <span className="text-gray-900 font-semibold">
            {format(new Date(endDate), "dd MMMM yyyy", { locale: sv })}
          </span>
        </div>
      </div>
      <button
        onClick={() => navigate("/subscription")}
        className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
      >
        Hantera prenumeration →
      </button>
    </div>
  );
};

export default SubscriptionWidget;
