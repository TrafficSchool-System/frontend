const ExamStatsCard = ({ icon, label, value, variant = 'default' }) => {
  const variants = {
    default: 'border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100',
    success: 'border-green-300 bg-gradient-to-br from-green-50 to-green-100',
    danger: 'border-red-300 bg-gradient-to-br from-red-50 to-red-100',
    warning: 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100'
  };

  const textColors = {
    default: 'text-blue-700',
    success: 'text-green-700',
    danger: 'text-red-700',
    warning: 'text-yellow-700'
  };

  return (
    <div className={`
      relative overflow-hidden rounded-2xl shadow-lg border-2 
      ${variants[variant]} 
      p-6 transition-all duration-300 
      hover:shadow-xl hover:scale-105 hover:-translate-y-1
      backdrop-blur-sm
    `}>
      <div className="relative z-10">
        <div className="text-4xl mb-3 animate-bounce">{icon}</div>
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
          {label}
        </p>
        <p className={`text-4xl font-bold ${textColors[variant]} transition-all duration-300`}>
          {value}
        </p>
      </div>
      {/* Dekorativ gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16" />
    </div>
  );
};

export default ExamStatsCard;
