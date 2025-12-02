import React from "react";

const QuestionLimitSelector = ({ limit, setLimit, onConfirm }) => {
  return (
    <div className="p-6 max-w-md mx-auto border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Välj antal frågor</h2>
      
      <label className="block mb-4">
        Hur många frågor vill du ha?
        <input
          type="number"
          value={limit}
          min={1}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="ml-2 border rounded px-2 py-1 w-20"
        />
      </label>

      <button
        onClick={onConfirm}
        className="px-4 py-2 bg-traffic-yellow text-traffic-black rounded hover:bg-traffic-yellow-hover"
      >
        Starta quiz
      </button>
    </div>
  );
};

export default QuestionLimitSelector;
