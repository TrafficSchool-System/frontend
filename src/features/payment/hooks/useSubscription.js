import { useState, useEffect } from "react";
import {
  getSubscriptionDetails,
  renewSubscription,
} from "../services/paymentService";

/**
 * Custom hook för hantering av prenumerationer
 * @param {number} userId - User ID
 * @returns {Object} - Subscription data och funktioner
 */
export const useSubscription = (userId) => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Hämta prenumerationsdata
   */
  const fetchSubscription = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubscriptionDetails(userId);
      setSubscription(data);
    } catch (err) {
      setError(err.response?.data?.message || "Kunde inte hämta prenumeration");
      console.error("Error fetching subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Förnya prenumeration
   * @param {number|null} newPackageId - Optional: ID för nytt paket att uppgradera till
   * @returns {Object} - Swish payment data (token, deeplink, qr-kod)
   */
  const renew = async (newPackageId = null) => {
    try {
      const renewData = {
        userId: userId,
        subscriptionId: subscription.id,
        newPackageId: newPackageId,
      };

      const paymentData = await renewSubscription(renewData);
      return paymentData; // Returnerar { paymentId, swishToken, swishDeepLink, qrCodeData, expiresAt }
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Kunde inte förnya prenumeration",
      );
    }
  };

  /**
   * Ladda prenumerationsdata när komponenten mountar
   */
  useEffect(() => {
    if (userId) {
      fetchSubscription();
    }
  }, [userId]);

  return {
    subscription,
    loading,
    error,
    renewSubscription: renew,
    refetch: fetchSubscription,
  };
};
