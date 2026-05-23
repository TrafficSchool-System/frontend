/**
 * ==========================================
 * SUBSCRIPTION SUMMARY (PROFESSIONAL ADMIN VIEW)
 * ==========================================
 * Visar endast relevant prenumerationsinformation för admins:
 * - Nuvarande status (aktiv/utgången)
 * - Senaste  prenumeration
 * - Enkel historik-knapp för detaljer
 *
 * Design principles:
 * - Information hierarchy: Most important first
 * - Progressive disclosure: Details on demand
 * - Clean & scannable: No technical clutter
 */

import { useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  CalendarIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const SubscriptionSummary = ({ subscriptions, statistics }) => {
  const [showHistory, setShowHistory] = useState(false);

  // Ingen prenumeration alls
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCardIcon className="w-5 h-5" />
            Prenumerationsstatus
          </h3>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircleIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-1">
              Ingen prenumeration
            </p>
            <p className="text-sm text-gray-500">
              Användaren har aldrig köpt någon prenumeration
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Sortera: Aktiva först, sedan senaste först
  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    if (a.active && !b.active) return -1;
    if (!a.active && b.active) return 1;
    return new Date(b.startDate) - new Date(a.startDate);
  });

  const currentSubscription = sortedSubscriptions[0];
  const hasHistory = subscriptions.length > 1;
  const activeCount = statistics?.activeSubscriptions || 0;
  const totalCount = statistics?.totalSubscriptions || subscriptions.length;

  // Beräkna återstående tid
  const getRemainingTime = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffMs = end - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: "Utgått", color: "text-red-600" };
    if (diffDays === 0) return { text: "Utgår idag", color: "text-orange-600" };
    if (diffDays === 1) return { text: "1 dag kvar", color: "text-orange-600" };
    if (diffDays <= 7)
      return { text: `${diffDays} dagar kvar`, color: "text-orange-600" };
    return { text: `${diffDays} dagar kvar`, color: "text-green-600" };
  };

  const formatDate = (dateString) => {
    // Behandla datum som UTC och konvertera till lokal tid
    const utcDate = new Date(
      dateString + (dateString.endsWith("Z") ? "" : "Z"),
    );
    return utcDate.toLocaleDateString("sv-SE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    // Behandla datum som UTC och konvertera till lokal tid
    const utcDate = new Date(
      dateString + (dateString.endsWith("Z") ? "" : "Z"),
    );
    return utcDate.toLocaleString("sv-SE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const remaining = currentSubscription.active
    ? getRemainingTime(currentSubscription.endDate)
    : null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <CreditCardIcon className="w-5 h-5" />
              Prenumerationsstatus
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {activeCount > 0 ? (
                <span className="text-green-700 font-medium">
                  {activeCount} aktiv{activeCount > 1 ? "a" : ""}
                </span>
              ) : (
                <span className="text-gray-600">Ingen aktiv prenumeration</span>
              )}{" "}
              • {totalCount} totalt
            </p>
          </div>

          {activeCount > 0 ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-green-800">
                Aktiv
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
              <XCircleIcon className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">
                Inaktiv
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Nuvarande/Senaste prenumeration */}
      <div className="p-6">
        <div
          className={`rounded-lg p-4 ${
            currentSubscription.active
              ? "bg-green-50 border-2 border-green-200"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          {/* Paketnamn och status */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-1">
                {currentSubscription.packageName}
              </h4>
              <p className="text-sm text-gray-600">
                {currentSubscription.validityDays} dagar •{" "}
                {currentSubscription.packagePrice?.toLocaleString("sv-SE")} kr
              </p>
            </div>
            {currentSubscription.active && remaining && (
              <div className="text-right">
                <div className={`text-sm font-semibold ${remaining.color}`}>
                  {remaining.text}
                </div>
              </div>
            )}
          </div>

          {/* Datum information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Startade</p>
                <p className="font-medium text-gray-900">
                  {formatDateTime(currentSubscription.startDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">
                  {currentSubscription.active ? "Utgår" : "Utgick"}
                </p>
                <p className="font-medium text-gray-900">
                  {formatDateTime(currentSubscription.endDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Avbruten status */}
          {currentSubscription.cancelled && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-orange-700 font-medium">
                ⚠️ Prenumerationen har avbrutits
              </p>
            </div>
          )}
        </div>

        {/* Historik-knapp */}
        {hasHistory && (
          <div className="mt-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium text-gray-700"
            >
              <span>
                📜 Visa historik ({subscriptions.length - 1}{" "}
                {subscriptions.length - 1 === 1 ? "tidigare" : "tidigare"})
              </span>
              {showHistory ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>

            {/* Historik lista (kollapsbar) */}
            {showHistory && (
              <div className="mt-4 space-y-3">
                {sortedSubscriptions.slice(1).map((sub, index) => (
                  <div
                    key={sub.id}
                    className="rounded-lg p-4 bg-gray-50 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="text-sm font-semibold text-gray-900">
                          {sub.packageName}
                        </h5>
                        <p className="text-xs text-gray-600 mt-1">
                          {sub.validityDays} dagar •{" "}
                          {sub.packagePrice?.toLocaleString("sv-SE")} kr
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                        {sub.active ? "Aktiv" : "Utgått"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>{formatDate(sub.startDate)}</span>
                      <span>→</span>
                      <span>{formatDateTime(sub.endDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionSummary;
