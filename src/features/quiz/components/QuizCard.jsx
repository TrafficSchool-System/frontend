import { useState } from "react";
import SfiHint from "./SfiHint";
import quizService from "../services/quizService";
import ImageModal from "@shared/components/ui/ImageModal";

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

        {/* Modal för fullskärmsbild */}
        <ImageModal
          imageUrl={imageUrl}
          isOpen={isImageOpen}
          onClose={() => setIsImageOpen(false)}
        />

        {/* Layout: bild + svar sida vid sida på desktop, staplade på mobil */}
        <div className={`flex gap-6 ${imageUrl ? "flex-col md:flex-row" : "flex-col"}`}>

          {/* Bild (vänster kolumn på desktop) */}
          {imageUrl && (
            <div className="md:w-2/5 shrink-0">
              <img
                src={imageUrl}
                alt="Fråga bild"
                className="w-full max-h-44 md:max-h-80 object-contain rounded-xl shadow-lg border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setIsImageOpen(true)}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                🔍 Klicka på bilden för att förstora
              </p>
            </div>
          )}

          {/* Svarsalternativ (höger kolumn på desktop) */}
          <div className="flex-1">
            <div className="space-y-3">
              {question.answers.map((ans, i) => {
                let answerStyle = "";
                let iconDisplay = null;

                if (showAnswerFeedback && selectedAnswer) {
                  if (i === question.correctAnswerIndex) {
                    answerStyle = "bg-green-50 border-green-400 hover:bg-green-100";
                    iconDisplay = <span className="text-2xl">✓</span>;
                  } else if (ans === selectedAnswer) {
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
                      ${answerLocked ? "cursor-not-allowed" : "cursor-pointer hover:shadow-md hover:scale-[1.02]"}
                      ${isSelected && !showAnswerFeedback ? "border-blue-500 bg-blue-50" : "border-gray-200"}
                      ${answerStyle}
                    `}
                  >
                    <div className="relative shrink-0">
                      <input
                        type="radio"
                        name={`answer-${question.id}`}
                        checked={isSelected}
                        onChange={() => onSelect(ans)}
                        disabled={answerLocked}
                        className="sr-only"
                      />
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                        ${isSelected ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"}
                      `}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </div>
                    <span className={`flex-1 text-lg ${isSelected ? "font-semibold" : "font-medium"} text-gray-800`}>
                      {ans}
                    </span>
                    {iconDisplay && <div className="shrink-0">{iconDisplay}</div>}
                  </label>
                );
              })}
            </div>

            {/* Förklaring */}
            {showAnswerFeedback && answerLocked && question.explinationForStudent && (
              <div className="mt-4 p-4 bg-linear-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl shadow-md">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">💡</span>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-1">Förklaring:</h3>
                    <p className="text-blue-900 leading-relaxed">{question.explinationForStudent}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
