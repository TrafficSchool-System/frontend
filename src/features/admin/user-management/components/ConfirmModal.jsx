import Button from "@shared/components/ui/Button";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "Ta bort",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">Bekräfta</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Avbryt
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
