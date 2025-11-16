
const QuizCard = ({ question, selectedAnswer, onSelect }) => {
    const answerLocked = selectedAnswer !== null; // true när ett svar är valt

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border mb-6">

        {/* Fråga i carden */}
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>

        {/* Bild i carden */}
      {question.image && (
        <img
          src={question.image}
          alt="Fråga bild"
          className="w-full rounded-lg mb-4 shadow"
        />
      )}

        {/* Svaren i carden */}
      <div className="space-y-3">
        {question.answers.map((ans, i) => {
          let bgColor = "";
          if (selectedAnswer) {
            if (i === question.correctAnswerIndex) bgColor = "bg-green-200";
            else if (ans === selectedAnswer) bgColor = "bg-red-200";
          }

          return (
            <label
              key={i}
              className={`flex items-center p-3 border rounded-lg
              ${answerLocked ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:bg-gray-50"}
              ${bgColor}`}
            >
              <input
                type="radio"
                name={`answer-${question.id}`}
                checked={selectedAnswer === ans}
                onChange={() => !answerLocked && onSelect(ans)}
                disabled={answerLocked}
                className="mr-3"
              />
              {ans}
            </label>
          );
        })}
      </div>

      {/* Förklaring visas när användaren valt ett svar */}
      {answerLocked && question.explinationForStudent && (
        <div className="mt-5 p-4 bg-blue-50 border-1-4 border-blue-400 rounded">
            <h3 className="font-semibold text-blue-700 mb-1">Förklaring:</h3>
            <p className="text-blue-800">{question.explinationForStudent}</p>

        </div>

      )}
    </div>
  );
};

export default QuizCard;
