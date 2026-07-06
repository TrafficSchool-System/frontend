import { useRef, useState } from "react";
import Button from "@shared/components/ui/Button";

const ExcelFileUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null); // { type: 'success'|'error', messages: [] }
  const fileInputRef = useRef(null);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadResult(null);
    try {
      const message = await onUpload(selectedFile);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setUploadResult({ type: "success", messages: [message ?? "Uppladdning lyckades!"] });
    } catch (err) {
      // Extrahera felmeddelanden från backend-svaret
      let messages = [];
      if (err?.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        messages = err.response.data.errors;
      } else if (err?.response?.data?.message) {
        messages = [err.response.data.message];
      } else if (err?.message) {
        messages = [err.message];
      } else {
        messages = ["Uppladdningen misslyckades. Försök igen."];
      }
      setUploadResult({ type: "error", messages });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-6 space-y-3">
      <div className="flex items-center gap-3">
        {/* GÖMD file-input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Välj fil */}
        <Button variant="secondary" onClick={openFileDialog} disabled={uploading}>
          Välj fil
        </Button>

        {/* Visa valt filnamn */}
        {selectedFile && (
          <span className="text-sm text-gray-600">{selectedFile.name}</span>
        )}

        {/* Ladda upp */}
        <Button
          variant="primary"
          disabled={!selectedFile || uploading}
          onClick={handleUpload}
        >
          {uploading ? "Laddar upp..." : "Ladda upp"}
        </Button>

        {/* Hjälptext */}
        <div className="ml-4">
          <p className="text-xs text-gray-500">
            💡 <span className="font-semibold">Tips:</span> Excel-filen ska
            innehålla 31 kolumner med frågor och fullständiga URL:er till bilder
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Format: <code className="bg-gray-100 px-1 rounded">.xlsx</code> med
            bild-URL:er i kolumn 28
          </p>
        </div>
      </div>

      {/* Inline succémeddelande */}
      {uploadResult?.type === "success" && (
        <div className="p-3 bg-green-50 border border-green-300 rounded-lg text-green-800 text-sm font-medium">
          ✅ {uploadResult.messages[0]}
        </div>
      )}

      {/* Inline felmeddelande */}
      {uploadResult?.type === "error" && (
        <div className="p-3 bg-red-50 border border-red-300 rounded-lg">
          <p className="text-red-800 font-semibold text-sm mb-1">
            ⚠️ Uppladdningen misslyckades:
          </p>
          <ul className="list-disc ml-5 text-red-700 text-sm space-y-0.5">
            {uploadResult.messages.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExcelFileUpload;
