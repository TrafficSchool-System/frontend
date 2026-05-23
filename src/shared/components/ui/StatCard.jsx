/**
 * ==========================================
 * STAT CARD COMPONENT
 * ==========================================
 * Komponent för att visa statistik med ikon och värde
 * Används på dashboard och översiktssidor
 *
 * ANVÄNDNING:
 * <StatCard
 *   title="Totalt antal användare"
 *   value={150}
 *   icon="👥"
 *   trend={{ value: 12, direction: "up" }}
 *   color="blue"
 * />
 */

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  color = "blue",
  loading = false,
  onClick,
}) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
    gray: "bg-gray-50 text-gray-600",
  };

  const trendClasses = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-gray-600",
  };

  const isClickable = !!onClick;

  return (
    <div
      className={`
        bg-white rounded-lg p-6 border border-gray-200
        ${isClickable ? "cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all duration-200" : "shadow"}
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>

          {loading ? (
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-900">
              {value !== null && value !== undefined ? value : "-"}
            </p>
          )}

          {description && (
            <p className="text-sm text-gray-500 mt-2">{description}</p>
          )}

          {trend && !loading && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm font-medium ${trendClasses[trend.direction]}`}
            >
              <span>
                {trend.direction === "up"
                  ? "↑"
                  : trend.direction === "down"
                    ? "↓"
                    : "→"}
              </span>
              <span>{trend.value}%</span>
              <span className="text-gray-500 font-normal ml-1">
                vs föregående period
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}
          >
            <span className="text-2xl">{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
