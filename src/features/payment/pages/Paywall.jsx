import { useState } from "react";
import PackageList from "../components/PackageList";
import PaymentFlow from "../components/PaymentFlow";
import authService from "@features/auth/services/authService";

/**
 * Paywall Page
 * Huvudsida för betalning - visas när användaren inte har en aktiv prenumeration
 * ELLER när användaren vill förnya sin prenumeration via /renew
 * Kombinerar PackageList och PaymentFlow
 */
export default function Paywall({ userId, onSubscriptionActive }) {
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Kolla om detta är en förnyelse (användare har/hade prenumeration)
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isRenewal = window.location.pathname === "/renew" || currentUser.hasActiveSubscription;

  // När användaren väljer ett paket
  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
  };

  // När betalningen är slutförd
  const handlePaymentComplete = (statusData) => {
    console.log("Betalning slutförd:", statusData);
    // Notifiera parent (App.jsx) att prenumeration är aktiv
    onSubscriptionActive();
  };

  // När användaren avbryter
  const handleCancel = () => {
    setSelectedPackage(null);
  };

  // Hantera utloggning
  const handleLogout = () => {
    if (confirm("Vill du logga ut? Du kan komma tillbaka och betala senare.")) {
      authService.logout();
      window.location.href = "/"; // Redirecta till startsidan
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="absolute right-0 top-0 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-all duration-200 flex items-center gap-2 border border-gray-200 hover:border-gray-300"
            title="Logga ut och betala senare"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logga ut</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isRenewal ? "Förnya din prenumeration" : "Välkommen till Trafikskolan"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isRenewal 
              ? "Välj ett paket och fortsätt använda alla funktioner" 
              : "Få tillgång till alla övningar, teorifrågor och provexamen"}
          </p>
        </div>

        {/* Content */}
        <div className="transition-all duration-300">
          {!selectedPackage ? (
            // Steg 1: Visa paketlista
            <PackageList onSelectPackage={handleSelectPackage} />
          ) : (
            // Steg 2: Visa betalningsflöde
            <PaymentFlow
              userId={userId}
              selectedPackage={selectedPackage}
              onPaymentComplete={handlePaymentComplete}
              onCancel={handleCancel}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="inline-block mb-2">
            {/* Placeholder för Swish-logotyp */}
            <img
              src="/src/assets/swish/swish-logo-primary-light.svg"
              alt="Swish"
              className="h-6"
            />
          </div>
          <p className="text-sm text-gray-500">
            Säker och enkel betalning med Swish
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Swish är en oberoende betaltjänst
          </p>
        </div>
      </div>
    </div>
  );
}
