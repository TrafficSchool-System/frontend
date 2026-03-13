import quizService from "../../quiz/services/quizService";

const ExamResultQuestion = ({ question, userAnswer, isCorrect, index }) => {
  const correctAnswer = question.answers[question.correctAnswerIndex];
  const imageUrl = quizService.getImageUrl(question.image);

  return (
    <div
      className={`
            relative overflow-hidden rounded-2xl border-2 p-6 mb-4
            transition-all duration-300 hover:shadow-xl
            ${
              isCorrect
                ? "bg-linear-to-br from-green-50 to-green-100 border-green-400"
                : "bg-linear-to-br from-red-50 to-red-100 border-red-400"
            }
        `}
    >
      {/* Top badge and question */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`
                            flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg
                            ${
                              isCorrect
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }
                        `}
            >
              {index + 1}
            </span>
            <h3 className="font-bold text-xl text-gray-800">
              {question.question}
            </h3>
          </div>
        </div>

        <span
          className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-lg shadow-md
                    ${
                      isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
                `}
        >
          {isCorrect ? "✓" : "✗"}
          <span className="hidden sm:inline">{isCorrect ? "Rätt" : "Fel"}</span>
        </span>
      </div>

      {/* Question image */}
      {imageUrl && (
        <div className="mb-4">
          <img
            src={imageUrl}
            alt="Frågebild"
            className="w-full max-w-md rounded-xl shadow-md mx-auto border-2 border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.open(imageUrl, "_blank")}
            onError={(e) => {
              e.target.style.display = "none";
              console.error("Kunde inte ladda bild:", question.image);
            }}
          />
          <p className="text-xs text-gray-500 mt-2 text-center">
            🔍 Klicka på bilden för att se den i fullskärm
          </p>
        </div>
      )}

      {/* Answers section */}
      <div className="space-y-3">
        {/* User answer */}
        <div
          className={`
                    flex items-start gap-3 p-4 rounded-xl
                    ${isCorrect ? "bg-green-100" : "bg-red-100"}
                `}
        >
          <span className="text-2xl">{isCorrect ? "👤" : "❌"}</span>
          <div className="flex-1">
            <p className="font-semibold text-sm text-gray-600 uppercase tracking-wide mb-1">
              Ditt svar
            </p>
            <p
              className={`font-bold text-lg ${
                isCorrect ? "text-green-700" : "text-red-700"
              }`}
            >
              {userAnswer || "Inget svar"}
            </p>
          </div>
        </div>

        {/* Correct answer (only if wrong) */}
        {!isCorrect && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-green-100">
            <span className="text-2xl">✅</span>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-600 uppercase tracking-wide mb-1">
                Rätt svar
              </p>
              <p className="font-bold text-lg text-green-700">
                {correctAnswer}
              </p>
            </div>
          </div>
        )}

        {/* Explanation (only if wrong and exists) */}
        {!isCorrect && question.explinationForStudent && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-100 border-2 border-blue-300">
            <span className="text-2xl">💡</span>
            <div className="flex-1">
              <p className="font-semibold text-blue-700 mb-2">Förklaring:</p>
              <p className="text-blue-800 leading-relaxed">
                {question.explinationForStudent}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Decorative element */}
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white opacity-10 rounded-full" />
    </div>
  );
};

export default ExamResultQuestion;
