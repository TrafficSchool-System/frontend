import { useState, useEffect, useRef } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";

const InlineQuestionRow = ({ question, onSave }) => {
  const [editingCell, setEditingCell] = useState(null); // fält som redigeras
  const [form, setForm] = useState({ ...question }); // hela raden
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // success/error
  const inputRef = useRef(null);

  // Håll form synkroniserad om question ändras från server
  useEffect(() => {
    setForm({ ...question });
  }, [question]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [editingCell]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Spara hela raden istället för bara ett fält
  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(question.id, form); // skicka hela raden
      setStatus({ type: "success" });
      setEditingCell(null);
      setTimeout(() => setStatus(null), 1500);
    } catch {
      setStatus({ type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const cellStyle =
    "px-3 py-2 break-words align-top relative hover:bg-gray-50 transition-colors";

  const renderCell = (field, type = "text", minWidth = "150px") => {
    const isEditing = editingCell === field;
    const isStatus = status && editingCell === null && status.type;

    return (
      <td
        className={`${cellStyle} min-w-[${minWidth}]`}
        onClick={() => !isEditing && setEditingCell(field)}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type={type}
            value={form[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            onBlur={handleSave} // autosave på blur
            className="w-full bg-transparent border-b border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        ) : (
          <div className="flex items-center justify-between">
            <span className="truncate">{form[field]}</span>
            <PencilIcon className="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {isStatus && (
          <span
            className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
              status.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          />
        )}
      </td>
    );
  };

  return (
    <tr className="border-b group">
      <td className={cellStyle}>{question.id}</td>
      {renderCell("question", "text", "250px")}
      {renderCell("sfi", "text", "80px")}
      {renderCell("correctAnswer", "text", "150px")}
      {renderCell("wrongAnswer1", "text", "150px")}
      {renderCell("wrongAnswer2", "text", "150px")}
      {renderCell("wrongAnswer3", "text", "150px")}
      {renderCell("explanationForStudent", "text", "400px")}
      {renderCell("image", "text", "150px")}
      {renderCell("subject", "number", "80px")}
      {renderCell("lang", "text", "80px")}
    </tr>
  );
};

export default InlineQuestionRow;
