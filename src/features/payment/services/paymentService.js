import apiClient from "@lib/axios";
import {
  PAYMENT_ENDPOINTS,
  ADMIN_ENDPOINTS,
} from "@shared/constants/apiEndpoints";

/**
 * Payment Service
 * Hanterar alla API-anrop till payment-service och subscription-endpoints
 */

// -------------------------------------------------------
// 🔧 Utility Functions
// -------------------------------------------------------

/**
 * Transformera subscription från backend
 *
 * VIKTIGT: Backend (SubscriptionResponseDTO) skickar redan ALLA beräknade fields:
 * - valid (boolean): active && !expired - BACKEND'S SOURCE OF TRUTH
 * - active (boolean): !cancelled && !isExpired()
 * - expired/isExpired (boolean): Om subscription gått ut
 * - isExpiringSoon (boolean): Om < 7 dagar kvar
 * - daysRemaining (long): Dagar kvar (från hoursRemaining / 24)
 * - hoursRemaining (long): Exakt antal timmar kvar
 *
 * FRONTEND: Använd backend's beräkningar direkt - INGEN OVERRIDE!
 * Vi behöver INTE räkna om något - lita på backend.
 *
 * @param {Object} subscription - Subscription från backend
 * @returns {Object} - Subscription (passthrough, backend har redan allt)
 */
const transformSubscription = (subscription) => {
  if (!subscription) return null;

  // Backend skickar redan alla fields vi behöver!
  // LITA PÅ BACKEND - gör INGEN client-side override
  return {
    ...subscription,
    // Säkerställ att price finns (alias för packagePrice)
    price: subscription.price || subscription.packagePrice,
  };
};

// -------------------------------------------------------
// 📦 Package Operations
// -------------------------------------------------------

/**
 * Hämta alla aktiva paket
 * Används för att visa tillgängliga paket till användare
 */
export const getActivePackages = async () => {
  const response = await apiClient.get(PAYMENT_ENDPOINTS.PACKAGES);
  return response.data;
};

/**
 * Hämta specifikt paket via ID
 */
export const getPackageById = async (id) => {
  const response = await apiClient.get(PAYMENT_ENDPOINTS.PACKAGE_BY_ID(id));
  return response.data;
};

// -------------------------------------------------------
// 💳 Payment Operations
// -------------------------------------------------------

/**
 * Create new payment (initiate Swish payment)
 * RESTful: POST /api/payments (creating a payment resource)
 * @param {Object} paymentData - { userId, packageId, payerAlias }
 * @returns {Object} - { paymentId, swishToken, swishDeepLink, qrCodeData, expiresAt }
 */
export const initiatePayment = async (paymentData) => {
  const response = await apiClient.post(
    PAYMENT_ENDPOINTS.PAYMENT_CREATE,
    paymentData,
  );
  return response.data;
};

/**
 * Hämta betalningsstatus
 * Används för polling - anropa var 2-3 sekund tills status är PAID/ERROR/CANCELLED
 * @param {number} paymentId
 * @returns {Object} - { paymentId, status, amount, packageType, subscriptionId, errorMessage }
 */
export const getPaymentStatus = async (paymentId) => {
  const response = await apiClient.get(
    PAYMENT_ENDPOINTS.PAYMENT_STATUS(paymentId),
  );
  return response.data;
};

// -------------------------------------------------------
// 📅 Subscription Operations
// -------------------------------------------------------

/**
 * Hämta alla subscriptions för användare (aktiva + inaktiva)
 * @param {number} userId
 * @returns {Array} - Lista med alla subscriptions (transformerade med UI-fields)
 */
export const getUserSubscriptions = async (userId) => {
  const response = await apiClient.get(
    PAYMENT_ENDPOINTS.SUBSCRIPTION_USER(userId),
  );
  // Transformera varje subscription
  return response.data.map(transformSubscription);
};

/**
 * Hämta ENDAST aktiva subscriptions för användare
 * @param {number} userId
 * @returns {Array} - Lista med aktiva subscriptions (transformerade med UI-fields)
 */
export const getActiveSubscription = async (userId) => {
  const response = await apiClient.get(
    PAYMENT_ENDPOINTS.SUBSCRIPTION_ACTIVE(userId),
  );
  // Transformera varje subscription i listan
  return response.data.map(transformSubscription);
};

/**
 * Kontrollera om användare har giltig aktiv subscription
 * @param {number} userId
 * @returns {boolean} - true om minst en aktiv subscription finns
 */
export const checkSubscriptionValid = async (userId) => {
  try {
    const activeSubs = await getActiveSubscription(userId);
    return activeSubs && activeSubs.length > 0;
  } catch (error) {
    console.error("Fel vid check av subscription:", error);
    return false;
  }
};

/**
 * Hämta subscription-detaljer för en användare
 * Returnerar första AKTIVA subscriptionen om den finns, annars null
 *
 * VIKTIGT: Returnerar ENDAST aktiva subscriptions.
 * Om användaren inte har aktiv subscription, returneras null.
 * Detta säkerställer att SubscriptionPage inte visas för användare utan prenumeration.
 *
 * @param {number} userId
 * @returns {Object|null} - Aktiv subscription-objekt eller null
 */
export const getSubscriptionDetails = async (userId) => {
  try {
    const activeSubs = await getActiveSubscription(userId);
    if (activeSubs && activeSubs.length > 0) {
      // Returnera första aktiva subscription
      return activeSubs[0];
    }

    // Om ingen aktiv subscription finns, returnera null
    // Vi vill INTE visa utgångna subscriptions här
    console.log("ℹ️ Ingen aktiv subscription hittad för userId:", userId);
    return null;
  } catch (error) {
    console.error("Fel vid hämtning av subscription details:", error);
    return null;
  }
};

/**
 * Hämta specifik subscription via ID
 * @param {number} subscriptionId
 * @returns {Object} - Subscription-objekt (transformerad med UI-fields)
 */
export const getSubscriptionById = async (subscriptionId) => {
  const response = await apiClient.get(
    PAYMENT_ENDPOINTS.SUBSCRIPTION_BY_ID(subscriptionId),
  );
  return transformSubscription(response.data);
};

/**
 * Hämta subscription-historik för en användare
 * Returnerar alla subscriptions (aktiva + inaktiva) sorterade efter datum
 * @param {number} userId
 * @returns {Array} - Lista med alla subscriptions (transformerade med UI-fields)
 */
export const getSubscriptionHistory = async (userId) => {
  const response = await apiClient.get(
    PAYMENT_ENDPOINTS.SUBSCRIPTION_USER(userId),
  );

  // Sortera efter startDate (senaste först) och transformera varje subscription
  const subscriptions = response.data || [];
  return subscriptions
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .map(transformSubscription);
};

/**
 * Förnya prenumeration genom att skapa ny betalning
 * @param {Object} renewData - { userId, subscriptionId, newPackageId }
 * @returns {Object} - Payment data för Swish
 */
export const renewSubscription = async (renewData) => {
  // För förnyelse skapar vi en ny betalning mot samma eller nytt paket
  const { userId, newPackageId, subscriptionId } = renewData;

  // Om inget nytt paket anges, använd samma paket som nuvarande subscription
  let packageId = newPackageId;

  if (!packageId && subscriptionId) {
    try {
      const subscription = await getSubscriptionById(subscriptionId);
      packageId = subscription.packageId;
    } catch (error) {
      console.error("Kunde inte hämta subscription för förnyelse:", error);
      throw new Error("Kunde inte hitta paket för förnyelse");
    }
  }

  if (!packageId) {
    throw new Error("Inget paket-ID angivet för förnyelse");
  }

  // Hämta användarens telefonnummer från localStorage eller kräv input
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const phoneNumber = user.phoneNumber;

  if (!phoneNumber) {
    throw new Error("Telefonnummer saknas. Kontakta support.");
  }

  // Initiera en ny betalning
  return await initiatePayment({
    userId,
    packageId,
    phoneNumber,
  });
};

// -------------------------------------------------------
// �‍💼 Admin Operations
// -------------------------------------------------------

/**
 * Hämta alla betalningar - ADMIN
 * @returns {Array} - Alla betalningar i systemet
 */
export const getAllPayments = async () => {
  const response = await apiClient.get(ADMIN_ENDPOINTS.PAYMENTS);
  return response.data;
};

/**
 * Hämta subscriptions för en användare - ADMIN
 * @param {number} userId
 * @returns {Array} - Användarens subscriptions
 */
export const getAdminUserSubscriptions = async (userId) => {
  // Använd getUserDetailsForAdmin istället som inkluderar subscriptions
  const userDetails = await getUserDetailsForAdmin(userId);
  return userDetails.subscriptions || [];
};

/**
 * Hämta komplett användarinfo med payments & subscriptions - ADMIN
 * @returns {Array} - Alla användare med komplett info
 */
export const getAllUsersWithDetails = async () => {
  const response = await apiClient.get(ADMIN_ENDPOINTS.USERS);
  return response.data;
};

/**
 * Hämta specifik användares kompletta info - ADMIN
 * @param {number} userId
 * @returns {Object} - Användarinfo, subscriptions, payments, statistics
 */
export const getUserDetailsForAdmin = async (userId) => {
  const response = await apiClient.get(ADMIN_ENDPOINTS.USER_DETAILS(userId));
  return response.data;
};
