import { useState } from "react";

const ImageModal = ({ imageUrl, isOpen, onClose }) => {
  const [scale, setScale] = useState(1);

  if (!isOpen) return null;

  const handleClose = () => {
    setScale(1); // Återställ zoom
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Stäng-knapp */}
      <button
        className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-60"
        onClick={handleClose}
      >
        ✕
      </button>

      {/* Zoom-instruktion och kontroller */}
      <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-60 px-4 py-2 rounded-lg flex items-center gap-3">
        <span>💡 Scrolla för att zooma</span>
        <span className="text-gray-300">|</span>
        <span>Zoom: {Math.round(scale * 100)}%</span>
      </div>

      {/* Zoom-knappar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-60">
        <button
          className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setScale((s) => Math.max(0.5, s - 0.25));
          }}
        >
          −
        </button>
        <button
          className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setScale(1);
          }}
        >
          Reset
        </button>
        <button
          className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setScale((s) => Math.min(5, s + 0.25));
          }}
        >
          +
        </button>
      </div>

      {/* Bilden med zoom */}
      <img
        src={imageUrl}
        alt="Förstorad bild"
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform"
        style={{ transform: `scale(${scale})` }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const delta = e.deltaY > 0 ? -0.1 : 0.1;
          setScale((s) => Math.max(0.5, Math.min(5, s + delta)));
        }}
      />
    </div>
  );
};

export default ImageModal;