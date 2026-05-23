/**
 * SwishPaymentInstructions Component
 * Ger kunder instruktioner om hur de betalar med Swish genom QR-kod
 * Följer Swish varumärkesriktlinjer
 */
export default function SwishPaymentInstructions() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
      {/* Header med Swish logotyp placeholder */}
      <div className="text-center mb-6">
        <img
          src="/src/assets/swish/swish-logo-primary-light.svg"
          alt="Swish"
          className="h-10 mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Betala enkelt och säkert med Swish
        </h2>
        <p className="text-gray-600">
          Följ dessa steg för att slutföra din betalning
        </p>
      </div>

      {/* Instruktioner */}
      <div className="space-y-6">
        {/* Steg 1 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
            1
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              Öppna Swish-appen på din mobil
            </h3>
            <p className="text-gray-600 text-sm">
              Se till att du har Swish-appen installerad och inloggad
            </p>
          </div>
        </div>

        {/* Steg 2 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
            2
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              Scanna QR-koden
            </h3>
            <p className="text-gray-600 text-sm">
              Använd kameran i Swish-appen för att scanna QR-koden som visas
            </p>
          </div>
        </div>

        {/* Steg 3 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
            3
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              Godkänn betalningen
            </h3>
            <p className="text-gray-600 text-sm">
              Kontrollera beloppet och bekräfta betalningen i Swish-appen
            </p>
          </div>
        </div>

        {/* Steg 4 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
            ✓
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Klart!</h3>
            <p className="text-gray-600 text-sm">
              Du får en bekräftelse när betalningen är genomförd
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">
          💡 Bra att veta
        </h4>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Betalningen tar vanligtvis bara några sekunder</li>
          <li>Du behöver ha Swish-appen installerad på din telefon</li>
          <li>Betalningen är säker och krypterad</li>
          <li>Du kan också öppna Swish direkt från din mobil</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Betalningen hanteras säkert av Swish, en oberoende betaltjänst.
        </p>
      </div>
    </div>
  );
}
