import { useState } from "react"


const SfiHint = ({ sfiText }) => {
    const [visible, setVisible] = useState(false); 

    // Om det inte finns SFI-Text för frågan -> visa inget
    if(!sfiText) return null; 

    return (
        <div className="mb-4">

            {/* SFI Knapp */}
            <button
                onClick={ () => setVisible(!visible)}
                className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
                {visible ? "Dölj SFI-hjälp" : "Visa SFI-hjälp"}
            </button>

            {visible && (
                <div className="mt-3 p-3 border border-purple-400 bg-purple-50 rounded">
                    <p className="text-purple-900 font-semibold">Förklaring</p>
                    <p className="mt-1 text-purple-800">{sfiText}</p>

                </div>

            )}

        </div>
    );

};

export default SfiHint; 