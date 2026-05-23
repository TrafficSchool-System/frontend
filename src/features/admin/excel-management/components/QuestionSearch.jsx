import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const SUBJECTS = [
  { id: "all", label: "Alla ämnen" },
  { id: 1, label: "1 · Fordonskunskap" },
  { id: 2, label: "2 · Trafikregler" },
  { id: 3, label: "3 · Människan" },
  { id: 4, label: "4 · Miljö & Körteknik" },
  { id: 5, label: "5 · Trafiksäkerhet" },
];

const QuestionSearch = ({ onSearch, totalCount, filteredCount }) => {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("all");

  const trigger = (newText, newSubject) => onSearch(newText, newSubject);

  const handleTextChange = (e) => {
    setText(e.target.value);
    trigger(e.target.value, subject);
  };

  const handleSubjectChange = (id) => {
    setSubject(id);
    trigger(text, id);
  };

  const reset = () => {
    setText("");
    setSubject("all");
    trigger("", "all");
  };

  const hasFilter = text.trim() !== "" || subject !== "all";

  return (
    <div className="space-y-3 mb-5">
      {/* Text search */}
      <div className="relative max-w-xl">
        <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Sök på frågetext, rätt svar eller ID..."
          className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
        />
        {text && (
          <button
            onClick={reset}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Subject filter pills */}
      <div className="flex flex-wrap gap-2">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSubjectChange(s.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              subject === s.id
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {s.label}
          </button>
        ))}
        {hasFilter && (
          <button
            onClick={reset}
            className="px-3 py-1.5 rounded-full text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 transition-all flex items-center gap-1"
          >
            <XMarkIcon className="w-3 h-3" />
            Rensa filter
          </button>
        )}
      </div>

      {/* Result count — only shown when filtering */}
      {hasFilter && (
        <p className="text-xs text-gray-500">
          Visar{" "}
          <span className="font-semibold text-gray-800">{filteredCount}</span>{" "}
          av <span className="font-semibold text-gray-800">{totalCount}</span>{" "}
          frågor
        </p>
      )}
    </div>
  );
};

export default QuestionSearch;
