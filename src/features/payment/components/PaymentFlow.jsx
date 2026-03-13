import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { initiatePayment, getPaymentStatus } from "../services/paymentService";
import { usePaymentPolling } from "../hooks/usePaymentPolling";

/**
 * PaymentFlow Component
 * Hanterar hela betalningsflödet från initiering till slutfört
 */
export default function PaymentFlow({
  userId,
  selectedPackage,
  onPaymentComplete,
  onCancel,
}) {
  const [step, setStep] = useState("INPUT"); // INPUT, PENDING, PAID, ERROR
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Polling hook
  const { isPolling, startPolling } = usePaymentPolling(
    paymentData?.paymentId,
    handleStatusUpdate,
    step === "PENDING",
  );

  // När status uppdateras från polling
  function handleStatusUpdate(statusData) {
    setPaymentStatus(statusData);

    if (statusData.status === "PAID") {
      setStep("PAID");
      // Kort delay för att visa success innan navigation
      setTimeout(() => {
        onPaymentComplete(statusData);
      }, 1500); // 1.5 sekunder för att visa success-meddelande
    } else if (
      statusData.status === "ERROR" ||
      statusData.status === "CANCELLED" ||
      statusData.status === "EXPIRED"
    ) {
      setStep("ERROR");
      setError(statusData.errorMessage || "Betalningen misslyckades");
    }
  }

  // Initiera betalning
  const handleInitiatePayment = async () => {
    if (!phoneNumber) {
      setError("Ange ditt mobilnummer");
      return;
    }

    // Validera svenskt mobilnummer (enkel validering)
    const cleanPhone = phoneNumber.replace(/\s/g, "");
    const phoneRegex = /^07[0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setError("Ogiltigt mobilnummer. Format: 0701234567");
      return;
    }

    // Konvertera till internationellt format: 0701234567 -> 46701234567
    const internationalPhone = "46" + cleanPhone.substring(1);

    try {
      setError(null);
      const data = await initiatePayment({
        userId,
        packageId: selectedPackage.id,
        payerAlias: internationalPhone, // Swish kräver internationellt format
      });

      setPaymentData(data);
      setStep("PENDING");

      // Starta polling
      startPolling(getPaymentStatus);

      // Starta nedräkning till expiresAt
      startCountdown(data.expiresAt);
    } catch (err) {
      console.error("Kunde inte initiera betalning:", err);
      setError(err.response?.data?.message || "Kunde inte starta betalning");
    }
  };

  // Avbryt betalning
  const handleCancelPayment = async () => {
    // TODO: Implementera cancel-endpoint i backend
    // if (paymentData?.paymentId) {
    //   try {
    //     await cancelPayment(paymentData.paymentId);
    //   } catch (err) {
    //     console.error("Kunde inte avbryta betalning:", err);
    //   }
    // }
    onCancel();
  };

  // Nedräkning till utgångstid
  const startCountdown = (expiresAt) => {
    const interval = setInterval(() => {
      const now = new Date();
      const expires = new Date(expiresAt);
      const diff = expires - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeRemaining("Utgått");
        setStep("ERROR");
        setError("Betalningen har gått ut. Försök igen.");
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  // Rendering baserat på step
  if (step === "INPUT") {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Swish Header */}
        <div className="text-center mb-6">
          <div className="mb-4">
            {/* Placeholder för Swish-logotyp - ersätt med faktisk logotyp */}
            <img
              src="/src/assets/swish/swish-logo-primary-light.svg"
              alt="Swish"
              className="h-8"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Vill du betala med Swish?
          </h2>
          <p className="text-gray-600 mb-4">
            {selectedPackage.name} · {selectedPackage.description}
          </p>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <span className="text-3xl font-bold text-gray-900">
              {selectedPackage.price} SEK
            </span>
            <span className="text-gray-600 ml-2">
              · {selectedPackage.durationDays} dagar
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ditt mobilnummer för Swish
            </label>
            <input
              id="phoneNumber"
              type="tel"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-lg transition-colors"
              placeholder="0701234567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength={10}
            />
            <p className="mt-2 text-sm text-gray-500">
              Ange ditt mobilnummer kopplat till Swish (10 siffror)
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              className="w-full py-3 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors text-lg"
              onClick={handleInitiatePayment}
            >
              Betala med Swish
            </button>
            <button
              className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              onClick={onCancel}
            >
              Avbryt
            </button>
          </div>

          {/* Information om Swish */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Betalningen hanteras säkert av Swish, en oberoende betaltjänst.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === "PENDING") {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Swish Header */}
        <div className="text-center mb-6">
          <div className="mb-4">
            {/* Placeholder för Swish-logotyp */}
            <img
              src="/src/assets/swish/swish-logo-primary-light.svg"
              alt="Swish"
              className="h-8"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Slutför din betalning med Swish
          </h2>
          <p className="text-gray-600">
            Scanna QR-koden eller öppna Swish-appen på din mobil
          </p>
        </div>

        <div className="space-y-6">
          {/* QR-kod */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-5 rounded-lg shadow-md border-2 border-gray-200">
                <QRCode value={paymentData.qrCodeData} size={200} level="H" />
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              Scanna QR-koden i Swish-appen
            </p>
          </div>

          {/* Instruktioner */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">
              Så här betalar du:
            </h3>
            <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
              <li>Öppna Swish-appen på din mobil</li>
              <li>Scanna QR-koden ovan</li>
              <li>Godkänn betalningen i appen</li>
            </ol>
          </div>

          {/* Swish-knapp för mobil */}
          <div>
            <a
              href={paymentData.swishDeepLink}
              className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors text-lg"
            >
              <span>📱</span>
              <span>Öppna Swish-appen</span>
            </a>
          </div>

          {/* Betalningsinfo */}
          <div className="bg-white rounded-lg p-4 space-y-2 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Belopp att betala:</span>
              <span className="font-semibold text-gray-900">
                {selectedPackage.price} SEK
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tid kvar:</span>
              <span className="font-semibold text-gray-900 tabular-nums">
                {timeRemaining || "Laddar..."}
              </span>
            </div>
          </div>

          {/* Laddar-animation */}
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="text-gray-600">Väntar på bekräftelse från Swish...</p>
          </div>

          {/* Avbryt-knapp */}
          <button
            className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            onClick={handleCancelPayment}
          >
            Avbryt betalning
          </button>
        </div>
      </div>
    );
  }

  if (step === "PAID") {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Betalningen genomförd!
          </h2>
          <p className="text-gray-600 mb-4">
            Din betalning med Swish har slutförts
          </p>

          <div className="bg-green-50 rounded-lg p-4 space-y-1 mb-4 border border-green-200">
            <p className="text-gray-700">
              <span className="font-semibold">Paket:</span>{" "}
              {selectedPackage.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Belopp:</span>{" "}
              {selectedPackage.price} SEK
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Giltig i:</span>{" "}
              {selectedPackage.durationDays} dagar
            </p>
          </div>

          {/* Navigeringsindikator */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            <span>Tar dig till startsidan...</span>
          </div>
        </div>
      </div>
    );
  }

  if (step === "ERROR") {
    // Bestäm ikon och rubrik baserat på om det är timeout eller annat fel
    const isTimeout =
      error?.toLowerCase().includes("gick ut") ||
      error?.toLowerCase().includes("timeout") ||
      error?.toLowerCase().includes("utgått");

    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div
            className={`w-20 h-20 ${isTimeout ? "bg-orange-100" : "bg-red-100"} rounded-full flex items-center justify-center mx-auto mb-6`}
          >
            {isTimeout ? (
              <svg
                className="w-12 h-12 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isTimeout
              ? "Betalningen gick ut"
              : "Betalningen kunde inte genomföras"}
          </h2>
          <p
            className={`${isTimeout ? "text-orange-600" : "text-red-600"} mb-4`}
          >
            {error}
          </p>
          {isTimeout && (
            <p className="text-sm text-gray-600 mb-6">
              Swish-betalningen gick ut. Försök igen när du är redo.
            </p>
          )}

          <div className="flex gap-3">
            <button
              className="flex-1 py-3 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors"
              onClick={() => {
                setStep("INPUT");
                setError(null);
                setPaymentData(null);
              }}
            >
              Försök igen
            </button>
            <button
              className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              onClick={onCancel}
            >
              Tillbaka
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
