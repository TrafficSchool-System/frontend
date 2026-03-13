/**
 * ==========================================
 * SUBSCRIPTION LIST (ADMIN VERSION)
 * ==========================================
 * Visar alla prenumerationer för en användare med admin-specifik data:
 * - Betalningskoppling (payment ID)
 * - Köpdatum vs startdatum
 * - Teknisk referens (subscription ID)
 * - Exakt tidsinformation (timmar)
 */

const SubscriptionList = ({ subscriptions }) => {
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Prenumerationer
        </h3>
        <p className="text-gray-500 text-center py-8">Inga prenumerationer</p>
      </div>
    );
  }

  // Funktion för att scrolla till motsvarande betalning
  const scrollToPayment = (paymentId) => {
    if (paymentId) {
      const paymentElement = document.getElementById(`payment-${paymentId}`);
      if (paymentElement) {
        paymentElement.scrollIntoView({ behavior: "smooth", block: "center" });
        // Highlight effekt
        paymentElement.classList.add(
          "ring-2",
          "ring-blue-500",
          "ring-offset-2",
        );
        setTimeout(() => {
          paymentElement.classList.remove(
            "ring-2",
            "ring-blue-500",
            "ring-offset-2",
          );
        }, 2000);
      }
    }
  };

  // Formatera tid mer användarvänligt
  const formatTimeRemaining = (hoursRemaining, daysRemaining) => {
    if (hoursRemaining <= 0) return "Utgått";
    if (hoursRemaining < 48) {
      return `${hoursRemaining}h`;
    }
    return `${daysRemaining} dagar`;
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        📋 Prenumerationer ({subscriptions.length})
      </h3>

      <div className="space-y-4">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            id={`subscription-${sub.id}`}
            className={`border rounded-lg p-4 transition-all ${
              sub.active
                ? sub.isExpiringSoon
                  ? "border-orange-300 bg-orange-50"
                  : "border-green-300 bg-green-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            {/* Header med namn och status */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">
                    {sub.packageName}
                  </h4>
                  <span className="text-xs text-gray-500 font-mono">
                    #{sub.id}
                  </span>
                </div>

                {/* Payment ID med klickbar länk */}
                {sub.paymentId && (
                  <button
                    onClick={() => scrollToPayment(sub.paymentId)}
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                  >
                    🔗 Betalning: {sub.paymentId.substring(0, 12)}...
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {sub.isExpiringSoon && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    ⚠️ Snart utgått
                  </span>
                )}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    sub.active
                      ? "bg-green-100 text-green-800"
                      : sub.isExpired
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {sub.active
                    ? "Aktiv"
                    : sub.isExpired
                      ? "Utgången"
                      : "Inaktiv"}
                </span>
              </div>
            </div>

            {/* Grid med all viktig data */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {/* Pris */}
              <div className="bg-white bg-opacity-60 rounded p-2">
                <p className="text-gray-600 text-xs mb-1">💰 Pris</p>
                <p className="font-medium text-gray-900">{sub.price} kr</p>
              </div>

              {/* Längd */}
              <div className="bg-white bg-opacity-60 rounded p-2">
                <p className="text-gray-600 text-xs mb-1">📅 Längd</p>
                <p className="font-medium text-gray-900">
                  {sub.validityDays} dagar ({sub.validityHours}h)
                </p>
              </div>

              {/* Tid kvar */}
              {sub.active && (
                <div className="bg-white bg-opacity-60 rounded p-2">
                  <p className="text-gray-600 text-xs mb-1">⏳ Tid kvar</p>
                  <p
                    className={`font-bold text-lg ${
                      sub.isExpiringSoon
                        ? "text-orange-600"
                        : sub.daysRemaining <= 7
                          ? "text-orange-500"
                          : "text-green-600"
                    }`}
                  >
                    {formatTimeRemaining(sub.hoursRemaining, sub.daysRemaining)}
                  </p>
                </div>
              )}

              {/* Köpdatum */}
              {sub.purchaseDate && (
                <div className="bg-white bg-opacity-60 rounded p-2">
                  <p className="text-gray-600 text-xs mb-1">🛒 Köpdatum</p>
                  <p className="font-medium text-gray-900 text-xs">
                    {new Date(sub.purchaseDate).toLocaleString("sv-SE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}

              {/* Startdatum */}
              <div className="bg-white bg-opacity-60 rounded p-2">
                <p className="text-gray-600 text-xs mb-1">▶️ Startdatum</p>
                <p className="font-medium text-gray-900 text-xs">
                  {new Date(sub.startDate).toLocaleString("sv-SE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Slutdatum */}
              <div className="bg-white bg-opacity-60 rounded p-2">
                <p className="text-gray-600 text-xs mb-1">🏁 Slutdatum</p>
                <p className="font-medium text-gray-900 text-xs">
                  {new Date(sub.endDate).toLocaleString("sv-SE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Utgångstid footer - visa för aktiva prenumerationer */}
            {sub.active && (
              <div
                className={`mt-3 pt-3 border-t -mx-4 -mb-4 px-4 py-3 rounded-b-lg ${
                  sub.isExpiringSoon
                    ? "border-orange-200 bg-orange-100/50"
                    : "border-green-200 bg-green-100/50"
                }`}
              >
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">
                      {sub.isExpiringSoon ? "⚠️" : "⏰"} Prenumerationen går ut
                    </p>
                    <p className="font-semibold text-gray-900">
                      {new Date(sub.endDate).toLocaleDateString("sv-SE", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {sub.hoursRemaining > 0 && (
                    <div className="text-right">
                      <p
                        className={`text-xs px-2 py-1 rounded ${
                          sub.isExpiringSoon
                            ? "bg-orange-200 text-orange-900"
                            : "bg-green-200 text-green-900"
                        }`}
                      >
                        {sub.hoursRemaining < 48
                          ? `${sub.hoursRemaining} timmar kvar`
                          : `${sub.daysRemaining} dagar kvar`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Visa även för utgångna prenumerationer */}
            {!sub.active && sub.isExpired && (
              <div className="mt-3 pt-3 border-t border-red-200 bg-red-50/50 -mx-4 -mb-4 px-4 py-3 rounded-b-lg">
                <p className="text-sm text-red-700">
                  ⚠️ Prenumerationen gick ut{" "}
                  {new Date(sub.endDate).toLocaleDateString("sv-SE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionList;
