import InlineQuestionRow from "./InlineQuestionRow";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ScrollableQuestionList = ({ questions, onSave }) => {
  return (
    <div className="rounded-xl shadow-lg bg-white border border-gray-200">
      <div className="overflow-x-auto max-h-[600px] border-t border-gray-200">
        <table className="min-w-full table-auto border-collapse">
          <thead className="sticky top-0 bg-gray-50 z-10 border-b">
            <tr className="text-left text-sm font-semibold text-gray-700 uppercase">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3 min-w-[250px]">Fråga</th>
              <th className="px-4 py-3 min-w-[80px]">SFI</th>
              <th className="px-4 py-3 min-w-[150px]">Rätt</th>
              <th className="px-4 py-3 min-w-[150px]">Fel 1</th>
              <th className="px-4 py-3 min-w-[150px]">Fel 2</th>
              <th className="px-4 py-3 min-w-[150px]">Fel 3</th>
              <th className="px-4 py-3 min-w-[400px]">Förklaring</th>
              <th className="px-4 py-3 min-w-[150px]">Bild</th>
              <th className="px-4 py-3 min-w-[80px]">Ämne</th>
              <th className="px-4 py-3 min-w-[80px]">Språk</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {questions.map((q) => (
              <InlineQuestionRow key={q.id} question={q} onSave={onSave} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScrollableQuestionList;
