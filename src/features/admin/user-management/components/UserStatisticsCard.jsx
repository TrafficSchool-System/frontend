/**
 * ==========================================
 * USER STATISTICS CARD
 * ==========================================
 * Visar användarstatistik i ett snyggt kort
 */

const UserStatisticsCard = ({ statistics }) => {
  if (!statistics) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Statistik</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Prenumerationer */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">Prenumerationer</p>
          <p className="text-2xl font-bold text-blue-600">
            {statistics.totalSubscriptions}
          </p>
          <p className="text-xs text-gray-500">
            {statistics.activeSubscriptions} aktiva
          </p>
        </div>

        {/* Betalningar */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">Betalningar</p>
          <p className="text-2xl font-bold text-green-600">
            {statistics.totalPayments}
          </p>
          <p className="text-xs text-gray-500">
            {statistics.successfulPayments} lyckade
          </p>
        </div>

        {/* Totalt spenderat */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">Totalt spenderat</p>
          <p className="text-2xl font-bold text-purple-600">
            {statistics.totalSpent?.toFixed(2)} kr
          </p>
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">Status</p>
          <p
            className={`text-2xl font-bold ${
              statistics.hasActiveSubscription
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            {statistics.hasActiveSubscription ? "✓ Aktiv" : "✗ Inaktiv"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserStatisticsCard;
