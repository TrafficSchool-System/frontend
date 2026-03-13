import { format } from "date-fns";
import { sv } from "date-fns/locale";

/**
 * SubscriptionCard Component
 * Visar användarens aktiva prenumeration med TailwindCSS
 */
export default function SubscriptionCard({ subscription, onRenew }) {
  if (!subscription) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-gray-200">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Ingen aktiv prenumeration
        </h3>
        <p className="text-gray-600 mb-6">
          Du har ingen aktiv prenumeration just nu.
        </p>
        <button
          onClick={() => (window.location.href = "/renew")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
        >
          Köp prenumeration
        </button>
      </div>
    );
  }

  const {
    packageName,
    price,
    startDate,
    endDate,
    active,
    valid,
    daysRemaining,
    isExpiringSoon,
    isExpired,
  } = subscription;

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-lg p-8 border-2 
        ${isExpired ? "border-red-500 bg-red-50" : isExpiringSoon ? "border-orange-500 bg-orange-50" : "border-gray-200"}
        transition-all duration-300
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-gray-200">
        <h3 className="text-3xl font-bold text-gray-800">{packageName}</h3>
        <span
          className={`
            px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide
            ${valid ? "bg-green-500 text-white" : "bg-red-500 text-white"}
          `}
        >
          {valid ? "Aktiv" : "Utgången"}
        </span>
      </div>

      {/* Info Grid */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600 font-semibold">Pris:</span>
          <span className="text-gray-900 font-bold">{price} SEK</span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600 font-semibold">Startdatum:</span>
          <span className="text-gray-900">
            {format(new Date(startDate), "dd MMMM yyyy 'kl.' HH:mm", {
              locale: sv,
            })}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600 font-semibold">Utgångsdatum:</span>
          <span
            className={`font-bold ${isExpiringSoon ? "text-orange-600" : "text-gray-900"}`}
          >
            {format(new Date(endDate), "dd MMMM yyyy 'kl.' HH:mm", {
              locale: sv,
            })}
          </span>
        </div>

        {/* Visa "Dagar kvar" endast för aktiva subscriptions med > 0 dagar */}
        {valid && daysRemaining > 0 && (
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-600 font-semibold">Dagar kvar:</span>
            <span
              className={`font-bold text-2xl ${isExpiringSoon ? "text-orange-600" : "text-green-600"}`}
            >
              {daysRemaining} {daysRemaining === 1 ? "dag" : "dagar"}
            </span>
          </div>
        )}
      </div>

      {/* Varningar */}
      {isExpiringSoon && valid && (
        <div className="mb-6 p-4 bg-orange-100 border-l-4 border-orange-500 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <p className="text-orange-800 font-semibold">
              Din prenumeration utgår om {daysRemaining}{" "}
              {daysRemaining === 1 ? "dag" : "dagar"}!
            </p>
          </div>
        </div>
      )}

      {!valid && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">❌</span>
            <p className="text-red-800 font-semibold">
              Din prenumeration har utgått. Du kommer omdirigeras till
              betalningssidan.
            </p>
          </div>
        </div>
      )}

      {/* Förnya-knapp ENDAST för utgående (inte utgångna) */}
      {isExpiringSoon && valid && (
        <button
          onClick={onRenew}
          className="
            w-full py-4 px-6 
            bg-gradient-to-r from-orange-500 to-orange-600 
            hover:from-orange-600 hover:to-orange-700
            text-white font-bold text-lg rounded-xl 
            transition-all duration-300 transform hover:scale-105
            shadow-lg hover:shadow-xl
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
          "
        >
          ⚠️ Förnya innan det är för sent
        </button>
      )}
    </div>
  );
}
