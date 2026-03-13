import { useState, useEffect } from "react";
import Button from "@shared/components/ui/Button";

const UpdateUserModal = ({ isOpen, onClose, user, onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setEmail(user.email || "");
      setPersonalNumber(user.personalNumber || "");
      setPhoneNumber(user.phoneNumber || "");
      setErrors({});
    }
  }, [user]);

  if (!isOpen) return null;

  // Validering
  const validate = () => {
    let valid = true;
    const newErrors = {};
    const nameRegex = /^[A-Za-zÅÄÖåäö\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const personalNumberRegex = /^\d{6,8}-?\d{4}$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;

    // Förnamn
    if (!firstName.trim()) {
      newErrors.firstName = "Förnamn får inte vara tomt";
      valid = false;
    } else if (!nameRegex.test(firstName)) {
      newErrors.firstName = "Förnamn får endast innehålla bokstäver";
      valid = false;
    }

    // Efternamn
    if (!lastName.trim()) {
      newErrors.lastName = "Efternamn får inte vara tomt";
      valid = false;
    } else if (!nameRegex.test(lastName)) {
      newErrors.lastName = "Efternamn får endast innehålla bokstäver";
      valid = false;
    }

    // E-post
    if (!email.trim()) {
      newErrors.email = "E-post får inte vara tom";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Ange en giltig e-postadress";
      valid = false;
    }

    // Personnummer (valfritt men måste vara korrekt format om det anges)
    if (personalNumber.trim() && !personalNumberRegex.test(personalNumber)) {
      newErrors.personalNumber = "Format: ÅÅMMDD-XXXX eller ÅÅÅÅMMDD-XXXX";
      valid = false;
    }

    // Telefonnummer (valfritt men måste vara korrekt format om det anges)
    if (phoneNumber.trim() && !phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Ange ett giltigt telefonnummer";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      firstName,
      lastName,
      email,
      personalNumber: personalNumber.trim() || null,
      phoneNumber: phoneNumber.trim() || null,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Redigera användarinformation</h2>

        <div className="space-y-4">
          {/* Namn-sektion */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Förnamn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Anna"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Efternamn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Andersson"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* E-post */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-post <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="anna.andersson@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              ⚠️ OBS: Ändring av e-post kan påverka användarens inloggning
            </p>
          </div>

          {/* Personnummer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Personnummer
            </label>
            <input
              type="text"
              value={personalNumber}
              onChange={(e) => setPersonalNumber(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.personalNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="ÅÅMMDD-XXXX eller ÅÅÅÅMMDD-XXXX"
            />
            {errors.personalNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.personalNumber}
              </p>
            )}
          </div>

          {/* Telefonnummer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefonnummer
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+46 70 123 45 67"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Readonly fält - ID och Registreringsdatum */}
          {user && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Kan inte redigeras:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Användar-ID
                  </label>
                  <input
                    type="text"
                    value={user.id || "-"}
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Registrerad
                  </label>
                  <input
                    type="text"
                    value={
                      user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("sv-SE")
                        : "-"
                    }
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Avbryt
          </Button>
          <Button variant="primary" onClick={handleSave}>
            💾 Spara ändringar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
