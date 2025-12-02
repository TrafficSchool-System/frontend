const FinalExamIntro = ({ durationMinutes, onStart }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Slutprov</h1>

      <p className="mb-4">
        Du har <strong>{durationMinutes} minuter</strong> på dig att genomföra provet.
      </p>

      <p className="text-gray-600 mb-4">
        När du klickar på <strong>Starta provet</strong> börjar timern direkt.
      </p>

      <button
        onClick={onStart}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Starta provet
      </button>
    </div>
  );
};

export default FinalExamIntro;