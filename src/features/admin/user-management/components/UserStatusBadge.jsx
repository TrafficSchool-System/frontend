/**
 * ==========================================
 * USER STATUS BADGE COMPONENT
 * ==========================================
 * Visar användarens prenumerationsstatus
 */

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const UserStatusBadge = ({ statistics }) => {
  const hasActiveSubscription = statistics?.hasActiveSubscription;
  const expirationDate = statistics?.nearestExpirationDate;

  // Kontrollera om datumet har passerat (jämför bara datum, inte tid)
  const isExpired = expirationDate
    ? (() => {
        const expDate = new Date(expirationDate);
        const today = new Date();
        
        // Sätt tid till midnight för båda datumen för att jämföra bara datum
        expDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        
        return expDate < today;
      })()
    : false;

  return (
    <div>
      <div className="flex items-center gap-2">
        {hasActiveSubscription ? (
          <>
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Aktiv
            </span>
          </>
        ) : (
          <>
            <XCircleIcon className="w-5 h-5 text-gray-400" />
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              Inaktiv
            </span>
          </>
        )}
      </div>
      {expirationDate && (
        <div className="text-xs text-gray-500 mt-1 ml-7">
          {isExpired ? "Utgick: " : "Går ut: "}
          {new Date(expirationDate).toLocaleDateString("sv-SE")}
        </div>
      )}
    </div>
  );
};

export default UserStatusBadge;
