import { useRef, useState } from "react";
import Button from "@shared/components/ui/Button";

const ExcelFileUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      await onUpload(selectedFile);
      // Rensa fil-input vid lyckad uppladdning
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      // Fel hanteras redan av useExcelFiles hooken
      // Vi behöver bara fånga felet här så det inte propagerar
    }
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      {/* GÖMD file-input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx, .xls, .zip"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Välj fil */}
      <Button variant="secondary" onClick={openFileDialog}>
        Välj fil
      </Button>

      {/* Visa valt filnamn */}
      {selectedFile && (
        <span className="text-sm text-gray-600">{selectedFile.name}</span>
      )}

      {/* Ladda upp */}
      <Button variant="primary" disabled={!selectedFile} onClick={handleUpload}>
        Ladda upp
      </Button>

      {/* Hjälptext för ZIP-format */}
      <div className="ml-4">
        <p className="text-xs text-gray-500">
          💡 <span className="font-semibold">Tips:</span> Ladda upp ZIP-fil med
          Excel + bilder för att importera frågor med bilder
        </p>
        <p className="text-xs text-gray-400 mt-1">
          ZIP-struktur:{" "}
          <code className="bg-gray-100 px-1 rounded">questions.xlsx</code> +{" "}
          <code className="bg-gray-100 px-1 rounded">images/</code> mapp
        </p>
      </div>
    </div>
  );
};

export default ExcelFileUpload;
