const ExamResultSummary = ({ score, total, passed, timeTaken }) => {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className={`p-6 rounded-lg mb-6 ${passed ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'}`}>
      <h2 className="text-3xl font-bold mb-4">
        {passed ? '🎉 Grattis! Du är GODKÄND!' : '😔 Tyvärr, du blev UNDERKÄND'}
      </h2>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-gray-600">Poäng</p>
          <p className="text-2xl font-bold">{score} / {total}</p>
        </div>
        <div>
          <p className="text-gray-600">Procent</p>
          <p className="text-2xl font-bold">{percentage}%</p>
        </div>
        <div>
          <p className="text-gray-600">Tid</p>
          <p className="text-2xl font-bold">{timeTaken} min</p>
        </div>
      </div>

      <p className="mt-4 text-center text-gray-700">
        {passed 
          ? 'Du klarade provet! 70% eller mer rätt krävs för godkänt.' 
          : 'Du behöver minst 70% rätt för att bli godkänd. Fortsätt öva!'}
      </p>
    </div>
  );
};

export default ExamResultSummary;