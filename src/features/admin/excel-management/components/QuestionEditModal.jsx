import { useState, useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Modal from "@shared/components/ui/Modal";
import Button from "@shared/components/ui/Button";

const SUBJECT_NAMES = {
  1: "Fordonskunskap",
  2: "Trafikregler",
  3: "Människan i trafiken",
  4: "Miljö & Körteknik",
  5: "Trafiksäkerhet",
};

const SUBJECT_COLORS = {
  1: "bg-blue-100 text-blue-800 border-blue-200",
  2: "bg-green-100 text-green-800 border-green-200",
  3: "bg-purple-100 text-purple-800 border-purple-200",
  4: "bg-orange-100 text-orange-800 border-orange-200",
  5: "bg-red-100 text-red-800 border-red-200",
};

// ─────────────────────────────────────────────────────────────
// Small reusable field components (defined outside to avoid re-renders)
// ─────────────────────────────────────────────────────────────

const FieldLabel = ({ children, required }) => (
  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
    {children}
    {required && <span className="text-red-500 ml-0.5">*</span>}
  </label>
);

const TextInput = ({
  value,
  onChange,
  disabled,
  className = "",
  placeholder,
}) => (
  <input
    type="text"
    value={value ?? ""}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    placeholder={placeholder}
    className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 ${className}`}
  />
);

const TextArea = ({
  value,
  onChange,
  rows = 3,
  disabled,
  hint,
  placeholder,
  resizable = false,
}) => (
  <div>
    <textarea
      rows={rows}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 ${resizable ? "resize-y min-h-[80px]" : "resize-none"}`}
    />
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

// ─────────────────────────────────────────────────────────────
// Main modal
// ─────────────────────────────────────────────────────────────

const QuestionEditModal = ({ question, isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({});
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Sync form when question prop changes (new question selected)
  useEffect(() => {
    if (question) {
      setForm({ ...question });
      setConfirming(false);
      setImageError(false);
    }
  }, [question]);

  if (!question) return null;

  const set = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSaveClick = () => setConfirming(true);

  const handleConfirm = async () => {
    setSaving(true);
    try {
      await onSave(question.id, form);
      setConfirming(false);
      onClose();
    } catch {
      // Error handled by the parent hook
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (!confirming) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={null} size="large">
      {/* ── Custom header ── */}
      <div className="-mx-6 -mt-4 px-6 py-4 bg-linear-to-r from-gray-50 to-blue-50 border-b border-gray-200 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">
              ✏️
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">
                Redigera fråga
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-xs text-gray-400 font-mono">
                  ID #{question.id}
                </span>
                {question.excelId && (
                  <span className="text-xs text-gray-400 font-mono">
                    Excel-ID: {question.excelId}
                  </span>
                )}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                    SUBJECT_COLORS[question.subject] ||
                    "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {SUBJECT_NAMES[question.subject] ||
                    `Ämne ${question.subject}`}
                </span>
              </div>
            </div>
          </div>
          {!confirming && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors text-2xl leading-none shrink-0 mt-1"
              aria-label="Stäng"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* ── Confirmation banner ── */}
      {confirming && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 mb-6 flex items-start gap-4">
          <div className="shrink-0 w-11 h-11 bg-amber-100 rounded-full flex items-center justify-center">
            <ExclamationTriangleIcon className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Är du säker på att du vill spara ändringarna?
            </h3>
            <p className="text-sm text-gray-600">
              Du är på väg att uppdatera fråga{" "}
              <span className="font-semibold">#{question.id}</span>. Ändringarna
              sparas direkt i databasen och påverkar kommande prov.
            </p>
          </div>
        </div>
      )}

      {/* ── Form ── */}
      <div
        className={`space-y-6 transition-opacity ${confirming ? "opacity-50 pointer-events-none select-none" : ""}`}
      >
        {/* Frågetext */}
        <div>
          <FieldLabel required>Frågetext</FieldLabel>
          <TextArea
            value={form.question}
            onChange={set("question")}
            rows={3}
            disabled={confirming}
            placeholder="Skriv frågan här..."
          />
        </div>

        {/* ── Svarsalternativ ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-5 bg-gray-800 rounded text-white text-xs flex items-center justify-center font-bold">
              A
            </span>
            <span className="text-sm font-bold text-gray-700">
              Svarsalternativ
            </span>
          </div>

          <div className="space-y-3">
            {/* Correct answer */}
            <div>
              <FieldLabel required>
                <span className="text-green-700">✓ Rätt svar</span>
              </FieldLabel>
              <input
                type="text"
                value={form.correctAnswer ?? ""}
                onChange={(e) => set("correctAnswer")(e.target.value)}
                disabled={confirming}
                placeholder="Det korrekta svaret..."
                className="w-full border-2 border-green-300 bg-green-50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:opacity-60"
              />
            </div>

            {/* Wrong answers — stacked vertically for full readability */}
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <FieldLabel>
                  <span className="text-red-600">✗ Fel svar {n}</span>
                </FieldLabel>
                <input
                  type="text"
                  value={form[`wrongAnswer${n}`] ?? ""}
                  onChange={(e) => set(`wrongAnswer${n}`)(e.target.value)}
                  disabled={confirming}
                  placeholder={`Felaktigt svar ${n}...`}
                  className="w-full border border-red-200 bg-red-50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all disabled:opacity-60"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Förklaring */}
        <div>
          <FieldLabel>Förklaring till eleven</FieldLabel>
          <TextArea
            value={form.explanationForStudent}
            onChange={set("explanationForStudent")}
            rows={4}
            disabled={confirming}
            hint="Visas för eleven efter att de svarat fel på provet."
            placeholder="Förklara varför det rätta svaret är korrekt..."
            resizable
          />
        </div>

        {/* Ämne + Språk */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <FieldLabel required>Ämne</FieldLabel>
            <select
              value={form.subject ?? ""}
              onChange={(e) => set("subject")(parseInt(e.target.value))}
              disabled={confirming}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-500"
            >
              {Object.entries(SUBJECT_NAMES).map(([id, name]) => (
                <option key={id} value={id}>
                  {id} — {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel>Språk</FieldLabel>
            <select
              value={form.lang ?? "SE"}
              onChange={(e) => set("lang")(e.target.value)}
              disabled={confirming}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="SE">🇸🇪 Svenska (SE)</option>
              <option value="EN">🇬🇧 English (EN)</option>
            </select>
          </div>
        </div>

        {/* Bild */}
        <div>
          <FieldLabel>Bild-URL</FieldLabel>
          <TextInput
            value={form.image}
            onChange={(val) => {
              set("image")(val);
              setImageError(false);
            }}
            disabled={confirming}
            placeholder="https://..."
          />
          {form.image && !imageError && (
            <div className="mt-3 relative inline-block">
              <img
                src={form.image}
                alt="Fråga bild"
                className="max-h-40 rounded-xl border border-gray-200 shadow-sm"
                onError={() => setImageError(true)}
              />
              <span className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                Förhandsvisning
              </span>
            </div>
          )}
          {form.image && imageError && (
            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
              ⚠ Bilden kunde inte laddas — kontrollera URL:en
            </p>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="-mx-6 -mb-4 mt-8 px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <button
          onClick={confirming ? () => setConfirming(false) : onClose}
          className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors"
          disabled={saving}
        >
          {confirming ? "← Gå tillbaka" : "Avbryt"}
        </button>

        <div className="flex items-center gap-3">
          {!confirming ? (
            <Button variant="primary" onClick={handleSaveClick}>
              Spara ändringar
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => setConfirming(false)}
                disabled={saving}
              >
                Nej, gå tillbaka
              </Button>
              <button
                onClick={handleConfirm}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm min-w-[130px] justify-center"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sparar...
                  </>
                ) : (
                  "✓ Ja, spara"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default QuestionEditModal;
