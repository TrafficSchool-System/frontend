import { useState } from "react";
import {
  PencilIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import QuestionEditModal from "./QuestionEditModal";

const SUBJECT_NAMES = {
  1: "Fordonskunskap",
  2: "Trafikregler",
  3: "Människan",
  4: "Miljö & Körteknik",
  5: "Trafiksäkerhet",
};

const SUBJECT_COLORS = {
  1: "bg-blue-100 text-blue-700 border-blue-200",
  2: "bg-green-100 text-green-700 border-green-200",
  3: "bg-purple-100 text-purple-700 border-purple-200",
  4: "bg-orange-100 text-orange-700 border-orange-200",
  5: "bg-red-100 text-red-700 border-red-200",
};

const ScrollableQuestionList = ({ questions, onSave }) => {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [savedId, setSavedId] = useState(null); // flash feedback

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
        <MagnifyingGlassIcon className="w-12 h-12 mb-3 opacity-40" />
        <p className="text-base font-semibold text-gray-500">
          Inga frågor hittades
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Ladda upp en Excel-fil eller ändra sökfilter
        </p>
      </div>
    );
  }

  const handleSave = async (id, data) => {
    await onSave(id, data);
    setEditingQuestion(null);
    setSavedId(id);
    setTimeout(() => setSavedId(null), 2000);
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">
        <div className="overflow-x-auto max-h-[560px] overflow-y-auto">
          <table className="min-w-full">
            <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
              <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-4 py-3 w-16">ID</th>
                <th className="px-4 py-3 w-36">Ämne</th>
                <th className="px-4 py-3">Frågetext</th>
                <th className="px-4 py-3 w-44">Rätt svar</th>
                <th className="px-4 py-3 w-16 text-center">Bild</th>
                <th className="px-4 py-3 w-16 text-center">Språk</th>
                <th className="px-4 py-3 w-20 text-right pr-5">Åtgärd</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {questions.map((q, idx) => {
                const justSaved = savedId === q.id;
                return (
                  <tr
                    key={q.id}
                    onClick={() => setEditingQuestion(q)}
                    className={`group cursor-pointer transition-colors ${
                      justSaved
                        ? "bg-green-50"
                        : idx % 2 === 0
                          ? "bg-white hover:bg-blue-50/60"
                          : "bg-gray-50/40 hover:bg-blue-50/60"
                    }`}
                  >
                    {/* ID */}
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono">
                      {justSaved ? (
                        <span className="text-green-600 font-semibold">
                          ✓ {q.id}
                        </span>
                      ) : (
                        q.id
                      )}
                    </td>

                    {/* Subject badge */}
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium whitespace-nowrap ${
                          SUBJECT_COLORS[q.subject] ||
                          "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        {SUBJECT_NAMES[q.subject] || `Ämne ${q.subject}`}
                      </span>
                    </td>

                    {/* Question text */}
                    <td className="px-4 py-3 max-w-0 w-full">
                      <p className="text-sm text-gray-800 truncate">
                        {q.question}
                      </p>
                      {q.explanationForStudent && (
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          💬 {q.explanationForStudent}
                        </p>
                      )}
                    </td>

                    {/* Correct answer */}
                    <td className="px-4 py-3">
                      <span className="text-sm text-green-700 font-medium truncate block max-w-40">
                        {q.correctAnswer}
                      </span>
                    </td>

                    {/* Image indicator */}
                    <td className="px-4 py-3 text-center">
                      {q.image ? (
                        <span
                          title={q.image}
                          className="inline-flex items-center justify-center w-7 h-7 bg-indigo-50 border border-indigo-200 rounded-lg"
                        >
                          <PhotoIcon className="w-4 h-4 text-indigo-500" />
                        </span>
                      ) : (
                        <span className="text-gray-200">—</span>
                      )}
                    </td>

                    {/* Language */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-mono">
                        {q.lang || "SE"}
                      </span>
                    </td>

                    {/* Edit button */}
                    <td className="px-4 py-3 text-right pr-5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingQuestion(q);
                        }}
                        title="Redigera fråga"
                        className="inline-flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-400 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
                      >
                        <PencilIcon className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-200 text-xs text-gray-400 flex items-center justify-between">
          <span>
            Visar{" "}
            <span className="font-semibold text-gray-600">
              {questions.length}
            </span>{" "}
            {questions.length === 1 ? "fråga" : "frågor"}
          </span>
          <span>Klicka på en rad för att redigera</span>
        </div>
      </div>

      <QuestionEditModal
        question={editingQuestion}
        isOpen={!!editingQuestion}
        onClose={() => setEditingQuestion(null)}
        onSave={handleSave}
      />
    </>
  );
};

export default ScrollableQuestionList;
