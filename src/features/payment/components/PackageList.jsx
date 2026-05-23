import { useState, useEffect } from "react";
import { getActivePackages } from "../services/paymentService";
import PackageCard from "./PackageCard";

/**
 * PackageList Component
 * Hämtar och visar alla aktiva prenumerationspaket
 */
export default function PackageList({ onSelectPackage }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      setLoading(true);
      const data = await getActivePackages();
      setPackages(data);
      setError(null);
    } catch (err) {
      console.error("Kunde inte hämta paket:", err);
      setError("Kunde inte ladda tillgängliga paket. Försök igen senare.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laddar tillgängliga paket...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-xl">
        <div className="text-center">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadPackages}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Försök igen
          </button>
        </div>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
        <div className="text-center">
          <p className="text-yellow-800">Inga paket är tillgängliga just nu.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Välj ditt paket
        </h2>
        <p className="text-gray-600">Få tillgång till alla övningar och prov</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} package={pkg} onSelect={onSelectPackage} />
        ))}
      </div>
    </div>
  );
}
