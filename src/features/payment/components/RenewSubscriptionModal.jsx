import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

/**
 * RenewSubscriptionModal Component
 * Modal för att förnya prenumeration med Swish
 *
 * @param {Object} subscription - Aktiv prenumeration
 * @param {Object} paymentData - Swish payment data (token, deeplink, qr-kod)
 * @param {Function} onClose - Callback när modal stängs
 */
export default function RenewSubscriptionModal({
  subscription,
  paymentData,
  onClose,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(paymentData.swishToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwishDeeplink = () => {
    window.location.href = paymentData.swishDeepLink;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          {/* Placeholder för Swish-logotyp */}
          <img
            src="/src/assets/swish/swish-logo-primary-light.svg"
            alt="Swish"
            className="h-8 mb-3"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            Förnya prenumeration
          </h2>
        </div>

        {/* Subscription Summary */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-3 border border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Paket:</span>
            <strong className="text-lg text-gray-800">
              {subscription.packageName}
            </strong>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Belopp att betala:</span>
            <strong className="text-lg text-gray-900">
              {subscription.price} SEK
            </strong>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Giltighetstid:</span>
            <strong className="text-lg text-gray-800">
              {subscription.durationDays} dagar
            </strong>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Vill du betala med Swish?
          </h3>
          <p className="text-gray-600 text-sm">
            Scanna QR-koden i Swish-appen eller öppna appen direkt från mobilen.
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-6 bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
          <div className="bg-white p-4 rounded-lg">
            <QRCodeSVG
              value={paymentData.qrCodeData}
              size={200}
              level="M"
              includeMargin={true}
            />
          </div>
        </div>

        {/* Swish Button for Mobile */}
        <button
          onClick={handleSwishDeeplink}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg mb-6 flex items-center justify-center gap-2"
        >
          <span>📱</span>
          <span>Öppna Swish-appen</span>
        </button>

        {/* Swish Token */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2 font-medium">Swish-token:</p>
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <code className="flex-1 text-sm font-mono text-gray-800 break-all">
              {paymentData.swishToken}
            </code>
            <button
              onClick={handleCopyToken}
              title="Kopiera token"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium min-w-[70px]"
            >
              {copied ? "✓ Kopierad" : "📋 Kopiera"}
            </button>
          </div>
        </div>

        {/* Expiry Notice */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6 flex items-center gap-2">
          <span className="text-orange-600 text-xl">⏱️</span>
          <p className="text-sm text-orange-800 font-medium">
            Betalningen går ut om 3 minuter
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900">
            <strong>OBS:</strong> När betalningen är genomförd aktiveras din nya
            prenumeration automatiskt. Du kommer att omdirigeras tillbaka när
            betalningen är klar.
          </p>
        </div>

        {/* Swish disclaimer */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 text-center">
            Betalningen hanteras säkert av Swish, en oberoende betaltjänst.
          </p>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
        >
          Avbryt
        </button>
      </div>
    </div>
  );
}
