import { useState } from "react";

/**
 * Custom hook för att polla betalningsstatus
 * Anropar getPaymentStatus var 3:e sekund tills betalningen är klar
 *
 * @param {number} paymentId - ID för betalningen som ska pollas
 * @param {function} onStatusChange - Callback när status ändras
 * @param {boolean} enabled - Om polling ska vara aktiverad
 */
export const usePaymentPolling = (
  paymentId,
  onStatusChange,
  enabled = true,
) => {
  const [isPolling, setIsPolling] = useState(false);

  // Starta polling
  const startPolling = async (statusCheckFn) => {
    if (!paymentId || !enabled) return;

    setIsPolling(true);

    const interval = setInterval(async () => {
      try {
        const statusData = await statusCheckFn(paymentId);

        // Anropa callback med ny status
        onStatusChange(statusData);

        // Stoppa polling om betalningen är klar
        if (
          statusData.status === "PAID" ||
          statusData.status === "ERROR" ||
          statusData.status === "CANCELLED"
        ) {
          clearInterval(interval);
          setIsPolling(false);
        }
      } catch (error) {
        console.error("Polling error:", error);
        clearInterval(interval);
        setIsPolling(false);
      }
    }, 3000); // Var 3:e sekund

    // Cleanup när komponenten unmountas
    return () => {
      clearInterval(interval);
      setIsPolling(false);
    };
  };

  return { isPolling, startPolling };
};
