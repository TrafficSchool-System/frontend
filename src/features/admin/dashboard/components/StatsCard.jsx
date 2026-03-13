const StatsCard = ({ title, value, description, icon, iconColor = "text-blue-600" }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        {icon && (
          <div className={`${iconColor} text-2xl`}>
            {icon}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mt-2">
        {value !== null && value !== undefined ? value : "-"}
      </p>
      {description && (
        <p className="text-gray-500 text-sm mt-2">{description}</p>
      )}
    </div>
  );
};

export default StatsCard;