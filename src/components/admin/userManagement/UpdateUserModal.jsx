import { useState, useEffect } from "react";
import Button from "../../shared/ui/Button";

const UpdateUserModal = ({ isOpen, onClose, user, onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setErrors({ firstName: "", lastName: "" });
    }
  }, [user]);

  if (!isOpen) return null;

  // Validering: bara bokstäver och mellanslag
  const validate = () => {
    let valid = true;
    const newErrors = { firstName: "", lastName: "" };
    const nameRegex = /^[A-Za-zÅÄÖåäö\s]+$/;

    if (!firstName.trim()) {
      newErrors.firstName = "Förnamn får inte vara tomt";
      valid = false;
    } else if (!nameRegex.test(firstName)) {
      newErrors.firstName = "Förnamn får endast innehålla bokstäver";
      valid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Efternamn får inte vara tomt";
      valid = false;
    } else if (!nameRegex.test(lastName)) {
      newErrors.lastName = "Efternamn får endast innehålla bokstäver";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validate()) return;
    // Skicka med email som readonly
    onSave({ firstName, lastName, email: user.email });
    // Parent decides when to close after successful save
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Uppdatera användare</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-gray-700">Förnamn</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${errors.firstName ? "border-red-500" : ""}`}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Efternamn</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${errors.lastName ? "border-red-500" : ""}`}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between gap-2">
          <Button variant="secondary" onClick={onClose}>
            Avbryt
          </Button>
          <Button variant="secondary" onClick={handleSave}>
            Spara
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
