import React from "react";
import Button from "@shared/components/ui/Button";

const QuestionLimitSelector = ({ limit, setLimit, onConfirm }) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        {/* Header med ikon */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">📝</div>
          <h2 className="text-2xl font-bold text-gray-800">
            Välj antal frågor
          </h2>
        </div>

        {/* Modern input med större stil */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Antal frågor
          </label>
          <div className="relative">
            <input
              type="number"
              value={limit || ""}
              min={1}
              max={100}
              onChange={(e) =>
                setLimit(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full text-center text-3xl font-bold px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-traffic-yellow focus:ring-2 focus:ring-traffic-yellow focus:ring-opacity-50 transition-all"
              placeholder="10"
            />
            <div className="text-center mt-2 text-sm text-gray-500">
              Rekommenderat: 10-30 frågor
            </div>
          </div>
        </div>

        {/* Starta knapp */}
        <Button
          variant="primary"
          onClick={onConfirm}
          disabled={!limit || limit < 1}
          className="w-full text-lg"
        >
          {limit && limit > 0
            ? `Starta quiz med ${limit} frågor`
            : "Ange antal frågor"}
        </Button>
      </div>
    </div>
  );
};

export default QuestionLimitSelector;
