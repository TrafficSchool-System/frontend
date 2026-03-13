import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "../hooks/useSubscription";
import SubscriptionCard from "../components/SubscriptionCard";
import SubscriptionHistory from "../components/SubscriptionHistory";
import LoadingSpinner from "@shared/components/ui/LoadingSpinner";
import Alert from "@shared/components/ui/Alert";

/**
 * SubscriptionPage Component
 * Huvudsida för att visa och hantera prenumerationer
 */
export default function SubscriptionPage() {
  // Hämta userId från localStorage
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const navigate = useNavigate();

  const { subscription, loading, error } = useSubscription(userId);

  /**
   * SÄKERHETSKONTROLL: Redirect om ingen subscription
   * 
   * Detta är en extra säkerhet ifall routing misslyckas.
   * Normalt ska användare utan prenumeration ALDRIG nå denna sida pga App.jsx routing.
   * Men om de gör det (t.ex. direktlänk), redirecta till startsidan som visar Paywall.
   */
  useEffect(() => {
    if (!loading && subscription === null) {
      console.warn(
        "⚠️ SubscriptionPage: Ingen subscription hittad, redirectar till startsida..."
      );
      // Användaren ska inte vara här utan prenumeration
      window.location.href = "/";
    }
  }, [subscription, loading, navigate]);

  /**
   * SYNKRONISERA localStorage med subscription status
   * 
   * Uppdatera hasActiveSubscription baserat på backend's valid-status.
   * Detta säkerställer att localStorage alltid är synkat med senaste data.
   */
  useEffect(() => {
    if (!loading && subscription) {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (currentUser) {
        const hasActiveFromBackend = subscription.valid === true;
        
        // Uppdatera endast om status har ändrats
        if (currentUser.hasActiveSubscription !== hasActiveFromBackend) {
          currentUser.hasActiveSubscription = hasActiveFromBackend;
          localStorage.setItem("user", JSON.stringify(currentUser));
          console.log(
            "🔄 localStorage synkad: hasActiveSubscription =",
            hasActiveFromBackend
          );
          
          // Om subscription blev ogiltig (utgick), redirecta till startsida
          if (!hasActiveFromBackend) {
            console.log(
              "⚠️ Subscription utgången, redirectar till startsida..."
            );
            setTimeout(() => {
              window.location.href = "/";
            }, 1500);
          }
        }
      }
    }
  }, [subscription, loading]);

  /**
   * Hantera förnyelse av prenumeration
   * Redirectar till /renew där Paywall visas för att välja paket och betala
   */
  const handleRenew = () => {
    console.log("🔄 Redirectar till förnyelsesida...");
    navigate("/renew");
  };

  if (loading) {
    return <LoadingSpinner message="Laddar prenumeration..." fullScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Alert message={error} type="error" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">💳</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Min prenumeration
            </h1>
          </div>
          <p className="text-lg text-gray-600 pl-16">
            Hantera och förnya din prenumeration
          </p>
        </div>

        {/* Subscription Card */}
        <div className="mb-8">
          <SubscriptionCard subscription={subscription} onRenew={handleRenew} />
        </div>

        {/* Subscription History */}
        <SubscriptionHistory userId={userId} />
      </div>
    </div>
  );
}
