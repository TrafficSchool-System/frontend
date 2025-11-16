
const QuizSubjectSelector = ({ subjectId, setSubjectId}) => {

    return(
        <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Välj ämne:</label>
            <select
                value={subjectId || ""}
                onChange={(e) => setSubjectId(Number(e.target.value))}
                className="w-full p-3 border rounded-lg shadow-sm"
            >
                <option value="" disabled>
                    -- Välj ämne --
                </option>

                <option value={1}>🚗 Fordonskunskap</option>
                <option value={2}>📘 Trafikregler</option>
                <option value={3}>🧠 Människan</option>
                <option value={4}>🌍 Miljö & Körteknik</option>
                <option value={5}>⚠️ Trafiksäkerhet</option>
            </select>
        </div>
    );
}; 

export default QuizSubjectSelector; 