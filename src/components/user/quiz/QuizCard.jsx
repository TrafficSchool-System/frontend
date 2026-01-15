import { useState } from "react";
import SfiHint from "./sfiHint";
import quizService from "../../../services/user/quizService";

const QuizCard = ({
  question,
  selectedAnswer,
  onSelect,
  showAnswerFeedback = true,
}) => {
  // Säkerhetskontroll: om frågan eller svaren saknas visa laddningsruta
  if (!question || !question.answers) {
    return (
      <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
        <div className="flex items-center justify-center gap-3 text-gray-500">
          <span className="text-2xl animate-pulse">⏳</span>
          <p className="text-lg">Laddar fråga...</p>
        </div>
      </div>
    );
  }

  // Bestämmer om användaren har låst sitt svar och inte får ändra
  // Gäller endast om ett svar är valt och vi visar feedback
  const answerLocked =
    selectedAnswer !== undefined &&
    selectedAnswer !== null &&
    showAnswerFeedback;

  // Hämta bild-URL via service
  const imageUrl = quizService.getImageUrl(question.image);

  // State för bild-modal och zoom
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [scale, setScale] = useState(1);

  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="bg-linear-to-r from-blue-50 to-purple-50 p-6 border-b-2 border-gray-100">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-20 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
            ID: {question.id}
          </div>
          <h2 className="text-xl font-bold text-gray-800 leading-relaxed flex-1">
            {question.question}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <SfiHint sfiText={question.sfi} />

        {/* Visa bild om den finns */}
        {imageUrl && (
          <div className="mb-6">
            {/* Thumbnail som man kan klicka på */}
            <img
              src={imageUrl}
              alt="Fråga bild"
              className="w-full rounded-xl shadow-lg border-2 border-gray-200 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => setIsImageOpen(true)}
              onError={(e) => {
                e.target.style.display = "none";
                console.error("Kunde inte ladda bild:", question.image);
              }}
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              🔍 Klicka på bilden för att förstora
            </p>
          </div>
        )}

        {/* Modal för fullskärmsbild */}
        {isImageOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setIsImageOpen(false);
              setScale(1); // Återställ zoom när modal stängs
            }}
          >
            {/* Stäng-knapp */}
            <button
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-60"
              onClick={() => {
                setIsImageOpen(false);
                setScale(1);
              }}
            >
              ✕
            </button>

            {/* Zoom-instruktion och kontroller */}
            <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-60 px-4 py-2 rounded-lg flex items-center gap-3">
              <span>💡 Scrolla för att zooma</span>
              <span className="text-gray-300">|</span>
              <span>Zoom: {Math.round(scale * 100)}%</span>
            </div>

            {/* Zoom-knappar */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-60">
              <button
                className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setScale((s) => Math.max(0.5, s - 0.25));
                }}
              >
                −
              </button>
              <button
                className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setScale(1);
                }}
              >
                Reset
              </button>
              <button
                className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setScale((s) => Math.min(5, s + 0.25));
                }}
              >
                +
              </button>
            </div>

            {/* Bilden med zoom */}
            <img
              src={imageUrl}
              alt="Förstorad bild"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform"
              style={{ transform: `scale(${scale})` }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                setScale((s) => Math.max(0.5, Math.min(5, s + delta)));
              }}
            />
          </div>
        )}

        {/* Answer Options */}
        <div className="space-y-3">
          {/* Loopa igenom alla svarsalternativ */}
          {question.answers.map((ans, i) => {
            // Bestäm stil när feedback visas
            let answerStyle = "";
            let iconDisplay = null;

            if (showAnswerFeedback && selectedAnswer) {
              // Grönt för rätt svar
              if (i === question.correctAnswerIndex) {
                answerStyle = "bg-green-50 border-green-400 hover:bg-green-100";
                iconDisplay = <span className="text-2xl">✓</span>;
              }
              // Rött för fel svar
              else if (ans === selectedAnswer) {
                answerStyle = "bg-red-50 border-red-400 hover:bg-red-100";
                iconDisplay = <span className="text-2xl">✗</span>;
              }
            }

            const isSelected = selectedAnswer === ans;

            return (
              <label
                key={i}
                className={`
                  flex items-center gap-4 p-4 border-2 rounded-xl transition-all duration-300
                  ${
                    answerLocked
                      ? "cursor-not-allowed"
                      : "cursor-pointer hover:shadow-md hover:scale-[1.02]"
                  }
                  ${
                    isSelected && !showAnswerFeedback
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }
                  ${answerStyle}
                `}
              >
                {/* Custom Radio Button */}
                <div className="relative shrink-0">
                  <input
                    type="radio"
                    name={`answer-${question.id}`}
                    checked={isSelected}
                    onChange={() => onSelect(ans)}
                    disabled={answerLocked}
                    className="sr-only"
                  />
                  <div
                    className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                    ${
                      isSelected
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300 bg-white"
                    }
                    ${!answerLocked && "group-hover:border-blue-400"}
                  `}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>

                {/* Answer Text */}
                <span
                  className={`flex-1 text-lg ${
                    isSelected ? "font-semibold" : "font-medium"
                  } text-gray-800`}
                >
                  {ans}
                </span>

                {/* Feedback Icon */}
                {iconDisplay && <div className="shrink-0">{iconDisplay}</div>}
              </label>
            );
          })}
        </div>

        {/* Visa förklaring när:
            ✓ feedback är påslagen
            ✓ svaret är låst
            ✓ frågan har en förklarings-text */}

        {showAnswerFeedback &&
          answerLocked &&
          question.explinationForStudent && (
            <div className="mt-6 p-5 bg-linear-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl shadow-md">
              <div className="flex items-start gap-3">
                <span className="text-3xl shrink-0">💡</span>
                <div>
                  <h3 className="font-bold text-blue-800 text-lg mb-2">
                    Förklaring:
                  </h3>
                  <p className="text-blue-900 leading-relaxed">
                    {question.explinationForStudent}
                  </p>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default QuizCard;
