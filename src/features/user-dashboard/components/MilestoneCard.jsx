const MilestoneCard = ({ milestone, isUnlocked }) => {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl border-2 p-6
      transition-all duration-300 hover:shadow-lg
      ${isUnlocked 
        ? `${milestone.color} border-green-400 hover:scale-105` 
        : 'bg-gray-100 border-gray-300 opacity-60 grayscale'
      }
    `}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`
          shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
          ${isUnlocked ? 'bg-white shadow-md' : 'bg-gray-200'}
        `}>
          {milestone.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {milestone.title}
          </h3>
          <p className="text-sm text-gray-600">
            {milestone.description}
          </p>
        </div>

        {/* Status badge */}
        {isUnlocked ? (
          <div className="shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl shadow-md">
            ✓
          </div>
        ) : (
          <div className="shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xl">
            🔒
          </div>
        )}
      </div>

      {/* Progress bar for locked items */}
      {!isUnlocked && milestone.progress !== undefined && (
        <div className="mt-4">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${milestone.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1 text-right">
            {milestone.progress}% klar
          </p>
        </div>
      )}

      {/* Decorative element */}
      {isUnlocked && (
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white opacity-20 rounded-full" />
      )}
    </div>
  );
};

export default MilestoneCard;