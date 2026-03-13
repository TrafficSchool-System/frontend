const ExamScoreCard = ({ icon, label, value, variant = 'default' }) => {
  const variants = {
    default: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300',
    success: 'bg-gradient-to-br from-green-50 to-green-100 border-green-300',
    danger: 'bg-gradient-to-br from-red-50 to-red-100 border-red-300',
    info: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300'
  };

  const textColors = {
    default: 'text-gray-800',
    success: 'text-green-800',
    danger: 'text-red-800',
    info: 'text-blue-800'
  };

  return (
    <div className={`
      relative overflow-hidden rounded-xl border-2 p-6
      ${variants[variant]}
      transition-all duration-300 hover:shadow-lg hover:scale-105
    `}>
      <div className="text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className={`text-3xl font-bold ${textColors[variant]}`}>
          {value}
        </p>
      </div>
      {/* Dekorativ cirkel */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white opacity-20 rounded-full" />
    </div>
  );
};

export default ExamScoreCard;
