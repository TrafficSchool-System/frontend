

const MilestoneCard = ({ milestone, isUnlocked }) => {
  return (
    <div className={`p-4 rounded-lg border-2 ${
      isUnlocked 
        ? `${milestone.color} border-green-400` 
        : 'bg-gray-50 border-gray-300 opacity-50'
    }`}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{milestone.icon}</span>
        <div className="flex-1">
          <h3 className="font-bold">{milestone.title}</h3>
          <p className="text-sm text-gray-600">{milestone.description}</p>
        </div>
        {isUnlocked && (
          <span className="text-2xl">✅</span>
        )}
      </div>
    </div>
  );
};

export default MilestoneCard;