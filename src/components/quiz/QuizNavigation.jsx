const QuizNavigation = ({
  currentIndex,
  total,
  onNext,
  onPrev,
  isLastQuestion,
  onFinish,
  allAnswered,
  isCurrentAnswered
}) => {
  return (
    <div className="flex justify-between mt-6">

      {/* Föregående */}
      <button
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition cursor-pointer"
      >
        Föregående
      </button>

      {/* Nästa eller Rätta prov */}
      {isLastQuestion ? (
        <button
          onClick={onFinish}
          disabled={!allAnswered}
          className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 hover:bg-green-700 cursor-pointer"
        >
          Rätta prov
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!isCurrentAnswered}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 cursor-pointer"
        >
          Nästa
        </button>
      )}

    </div>
  );
};

export default QuizNavigation;
