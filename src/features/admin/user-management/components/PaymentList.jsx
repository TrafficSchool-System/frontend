/**
 * ==========================================
 * PAYMENT LIST (ADMIN VERSION)
 * ==========================================
 * Visar alla betalningar för en användare
 * ID-märkta rader för att kunna scrollas till från SubscriptionList
 */

const PaymentList = ({ payments }) => {
  if (!payments || payments.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💳 Betalningar
        </h3>
        <p className="text-gray-500 text-center py-8">Inga betalningar</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      case "EXPIRED":
        return "bg-gray-100 text-gray-800";
      case "DECLINED":
        return "bg-orange-100 text-orange-800";
      case "ERROR":
        return "bg-red-100 text-red-800";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "PAID":
        return "Betald";
      case "PENDING":
        return "Väntar";
      case "FAILED":
        return "Misslyckad";
      case "EXPIRED":
        return "Utgången";
      case "DECLINED":
        return "Nekad";
      case "ERROR":
        return "Fel";
      case "CANCELLED":
        return "Avbruten";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        💳 Betalningar ({payments.length})
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Datum
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Belopp
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Metod
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Transaktion ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                id={`payment-${payment.id}`}
                className="hover:bg-gray-50 transition-all"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {new Date(payment.createdAt).toLocaleString("sv-SE")}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.amount} kr
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {payment.paymentMethod || "-"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}
                  >
                    {getStatusText(payment.status)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">
                  {payment.transactionId || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentList;
