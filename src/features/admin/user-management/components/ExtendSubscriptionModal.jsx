import { useState } from "react";
import userManagementService from "../services/userManagementService";

export default function ExtendSubscriptionModal({ subscriptionUserId, onExtended }) {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExtend = async () => {
    setLoading(true);
    setError(null);
    try {
      await userManagementService.extendSubscription(subscriptionUserId, days);
      setOpen(false);
      onExtended?.();
    } catch (err) {
      setError(err?.response?.data?.message ?? "Något gick fel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        ✏️ Förläng plan
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Förläng prenumeration</h3>

            <label className="block text-sm text-gray-600 mb-1">Antal dagar</label>
            <input
              type="number"
              min={1}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Avbryt
              </button>
              <button
                onClick={handleExtend}
                disabled={loading || days < 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Förlänger..." : "Förläng"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}