/**
 * ==========================================
 * PAYMENT SUMMARY (PROFESSIONAL ADMIN VIEW)
 * ==========================================
 * Professional payment overview for admin dashboard:
 * - Revenue summary at the top
 * - Recent payments shown by default
 * - Expandable full history
 * - Clean, scannable design
 */

import { useState } from "react";
import {
  CreditCardIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const PaymentSummary = ({ payments }) => {
  const [showAllPayments, setShowAllPayments] = useState(false);

  // Ingen betalning
  if (!payments || payments.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            💳 Betalningar
          </h3>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCardIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-1">Inga betalningar</p>
            <p className="text-sm text-gray-500">
              Användaren har inte gjort några betalningar än
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Beräkna statistik
  const totalRevenue = payments.reduce(
    (sum, p) => sum + (p.status === "PAID" ? p.amount : 0),
    0,
  );
  const successfulPayments = payments.filter((p) => p.status === "PAID").length;
  const failedPayments = payments.filter(
    (p) =>
      p.status === "FAILED" || p.status === "DECLINED" || p.status === "ERROR",
  ).length;
  const pendingPayments = payments.filter((p) => p.status === "PENDING").length;

  // Status mappings
  const getStatusIcon = (status) => {
    switch (status) {
      case "PAID":
        return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case "PENDING":
        return <ClockIcon className="w-4 h-4 text-yellow-600" />;
      default:
        return <XCircleIcon className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "FAILED":
      case "DECLINED":
      case "ERROR":
        return "bg-red-100 text-red-800";
      case "CANCELLED":
      case "EXPIRED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    const texts = {
      PAID: "Betald",
      PENDING: "Väntar",
      FAILED: "Misslyckad",
      EXPIRED: "Utgången",
      DECLINED: "Nekad",
      ERROR: "Fel",
      CANCELLED: "Avbruten",
    };
    return texts[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("sv-SE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Sortera: senaste först
  const sortedPayments = [...payments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  // Visa bara de 5 senaste om inte "visa alla" är aktiverad
  const displayedPayments = showAllPayments
    ? sortedPayments
    : sortedPayments.slice(0, 5);
  const hasMore = payments.length > 5;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header med sammanfattning */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            💳 Betalningar
          </h3>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-purple-200">
            <span className="text-sm text-gray-600">Total intäkt:</span>
            <span className="text-lg font-bold text-purple-700">
              {totalRevenue.toLocaleString("sv-SE")} kr
            </span>
          </div>
        </div>

        {/* Snabb statistik */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-600 font-medium">
                Godkända
              </span>
            </div>
            <p className="text-lg font-bold text-green-700">
              {successfulPayments}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <XCircleIcon className="w-4 h-4 text-red-600" />
              <span className="text-xs text-gray-600 font-medium">
                Misslyckade
              </span>
            </div>
            <p className="text-lg font-bold text-red-700">{failedPayments}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <ClockIcon className="w-4 h-4 text-yellow-600" />
              <span className="text-xs text-gray-600 font-medium">Väntar</span>
            </div>
            <p className="text-lg font-bold text-yellow-700">
              {pendingPayments}
            </p>
          </div>
        </div>
      </div>

      {/* Betalningslista */}
      <div className="p-6">
        <div className="space-y-3">
          {displayedPayments.map((payment) => (
            <div
              key={payment.id}
              id={`payment-${payment.id}`}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
            >
              {/* Vänster: Datum & Metod */}
              <div className="flex items-center gap-4">
                {getStatusIcon(payment.status)}
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {payment.amount.toLocaleString("sv-SE")} kr
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {formatDate(payment.createdAt)} •{" "}
                    {payment.paymentMethod || "Okänd metod"}
                  </p>
                </div>
              </div>

              {/* Höger: Status & Transaction ID */}
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}
                >
                  {getStatusText(payment.status)}
                </span>
                {payment.transactionId && (
                  <p className="text-xs text-gray-500 mt-1 font-mono">
                    {payment.transactionId.substring(0, 16)}...
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* "Visa fler" knapp */}
        {hasMore && (
          <button
            onClick={() => setShowAllPayments(!showAllPayments)}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium text-gray-700"
          >
            <span>
              {showAllPayments
                ? "Visa färre"
                : `Visa alla ${payments.length} betalningar`}
            </span>
            {showAllPayments ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentSummary;
