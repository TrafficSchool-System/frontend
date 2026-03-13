/**
 * PackageCard Component
 * Visar ett enskilt prenumerationspaket med pris, beskrivning och köp-knapp
 */
export default function PackageCard({ package: pkg, onSelect, isSelected }) {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-lg p-6 
        transition-all duration-300 hover:shadow-xl hover:scale-105
        border-2 ${isSelected ? "border-blue-500" : "border-transparent"}
        flex flex-col h-full
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
          {pkg.packageType}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-6 flex-grow">{pkg.description}</p>

      {/* Details */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Giltighetstid:</span>
          <span className="font-semibold text-gray-900">
            {pkg.durationDays} dagar
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
          <span className="text-xl text-gray-500 ml-2">SEK</span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => onSelect(pkg)}
        className="
          w-full py-3 px-6 
          bg-gray-900 hover:bg-gray-800 
          text-white font-semibold rounded-xl 
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
        "
      >
        Betala med Swish · {pkg.price} SEK
      </button>

      {/* Swish info */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">Säker betalning med Swish</p>
      </div>
    </div>
  );
}
