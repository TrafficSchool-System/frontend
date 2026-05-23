/**
 * ==========================================
 * CREATE USER WITH SUBSCRIPTION MODAL
 * ==========================================
 * Modal för admin att skapa ny användare med tilldelat paket
 * Användaren får magic link via email för att sätta lösenord
 * Betalning skapas automatiskt som MANUAL (admin-skapad)
 */

import { useState, useEffect } from "react";
import Button from "@shared/components/ui/Button";
import packageService from "../../package-management/services/packageService";

const CreateUserWithSubscriptionModal = ({ isOpen, onClose, onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [packageId, setPackageId] = useState("");
  const [errors, setErrors] = useState({});
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Hämta paket när modal öppnas
  useEffect(() => {
    if (isOpen) {
      fetchPackages();
      // Reset form när modal öppnas
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPersonalNumber("");
    setPhoneNumber("");
    setPackageId("");
    setErrors({});
  };

  const fetchPackages = async () => {
    setLoadingPackages(true);
    try {
      const data = await packageService.getAllPackages();

      // Admin kan tilldela ALLA paket (både aktiva och inaktiva)
      // Användaren betalar inte via Swish, så det spelar ingen roll om paketet är "aktivt" för köp
      setPackages(data);

      // Om det bara finns ett paket, välj det automatiskt
      if (data.length === 1) {
        setPackageId(data[0].id);
      }
    } catch (error) {
      console.error("❌ Failed to fetch packages:", error);
      setErrors({ packages: "Kunde inte hämta paket. Försök igen." });
    } finally {
      setLoadingPackages(false);
    }
  };

  if (!isOpen) return null;

  // Validering
  const validate = () => {
    let valid = true;
    const newErrors = {};
    const nameRegex = /^[A-Za-zÅÄÖåäö\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    // Personnummer (obligatoriskt - backend kräver 12 siffror)
    if (!personalNumber.trim()) {
      newErrors.personalNumber = "Personnummer får inte vara tomt";
      valid = false;
    } else {
      const digitsOnly = personalNumber.replace(/\D/g, "");
      if (digitsOnly.length !== 12) {
        newErrors.personalNumber = "Personnummer måste vara exakt 12 siffror";
        valid = false;
      }
    }

    // Telefonnummer (obligatoriskt - backend kräver 10 siffror)
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Telefonnummer får inte vara tomt";
      valid = false;
    } else {
      const digitsOnly = phoneNumber.replace(/\D/g, "");
      if (digitsOnly.length !== 10) {
        newErrors.phoneNumber = "Telefonnummer måste vara exakt 10 siffror";
        valid = false;
      }
    }

    // Paket
    if (!packageId) {
      newErrors.packageId = "Du måste välja ett paket";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);

    // Normalisera personnummer och telefonnummer för backend
    const normalizedPersonalNumber = personalNumber.replace(/\D/g, "");
    const normalizedPhoneNumber = phoneNumber.replace(/\D/g, "");

    const userData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      personalNumber: normalizedPersonalNumber,
      phoneNumber: normalizedPhoneNumber,
      packageId: parseInt(packageId, 10),
    };

    try {
      await onSave(userData);
      resetForm();
      onClose();
    } catch (error) {
      // Felhantering hanteras av parent component
      console.error("Failed to create user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPackage = packages.find(
    (pkg) => pkg.id === parseInt(packageId, 10),
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Skapa ny användare med paket
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Användaren får ett mejl med magic link för att sätta lösenord.
            <br />
            Ingen betalning krävs - prenumerationen aktiveras automatiskt.
          </p>
        </div>

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
                disabled={submitting}
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
                disabled={submitting}
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
              disabled={submitting}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              💌 Magic link för lösenordsinställning skickas till denna adress
            </p>
          </div>

          {/* Personnummer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Personnummer <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={personalNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Endast siffror
                setPersonalNumber(value);
              }}
              maxLength={12}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.personalNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="199201011234 (12 siffror)"
              disabled={submitting}
            />
            {errors.personalNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.personalNumber}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Obligatoriskt • 12 siffror, inga bindestreck
            </p>
          </div>

          {/* Telefonnummer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefonnummer <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Endast siffror
                setPhoneNumber(value);
              }}
              maxLength={10}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0701234567 (10 siffror)"
              disabled={submitting}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Obligatoriskt • 10 siffror, inga mellanslag eller bindestreck
            </p>
          </div>

          {/* Paket-val */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Välj paket <span className="text-red-500">*</span>
            </label>
            {loadingPackages ? (
              <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                Laddar paket...
              </div>
            ) : packages.length === 0 ? (
              <div className="w-full px-3 py-2 border border-red-300 rounded-lg bg-red-50 text-red-600">
                ⚠️ Inga paket hittades. Skapa ett paket först via
                Pakethantering.
              </div>
            ) : (
              <select
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.packageId ? "border-red-500" : "border-gray-300"
                }`}
                disabled={submitting}
              >
                <option value="">-- Välj ett paket --</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - {pkg.price} kr
                    {pkg.validityDays && ` (${pkg.validityDays} dagar)`}
                    {pkg.validityHours && ` (${pkg.validityHours} timmar)`}
                    {pkg.isActive === false && " [INAKTIVT]"}
                  </option>
                ))}
              </select>
            )}
            {errors.packageId && (
              <p className="text-red-500 text-xs mt-1">{errors.packageId}</p>
            )}
            {errors.packages && (
              <p className="text-red-500 text-xs mt-1">{errors.packages}</p>
            )}
          </div>

          {/* Paket-förhandsvisning */}
          {selectedPackage && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                📦 Valt paket: {selectedPackage.name}
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Pris:</span>{" "}
                  <span className="font-semibold text-gray-900">
                    {selectedPackage.price} kr
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Giltighetstid:</span>{" "}
                  <span className="font-semibold text-gray-900">
                    {selectedPackage.validityDays
                      ? `${selectedPackage.validityDays} dagar`
                      : selectedPackage.validityHours
                        ? `${selectedPackage.validityHours} timmar`
                        : "Livstid"}
                  </span>
                </div>
              </div>
              {selectedPackage.description && (
                <p className="text-sm text-gray-700 mt-2">
                  {selectedPackage.description}
                </p>
              )}
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-xs text-blue-700">
                  ✅ Prenumerationen aktiveras automatiskt utan betalning
                </p>
              </div>
            </div>
          )}

          {/* Info-box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Vad händer när du skapar användaren?
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>1️⃣ Användarkonto skapas med angivna uppgifter</li>
              <li>2️⃣ Magic link skickas till användarens e-post</li>
              <li>3️⃣ Betalning registreras som "MANUAL" (admin-skapad)</li>
              <li>4️⃣ Prenumerationen aktiveras direkt</li>
              <li>
                5️⃣ Användaren kan logga in via magic link och sätta lösenord
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Avbryt
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={submitting || loadingPackages || packages.length === 0}
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Skapar användare...
              </>
            ) : (
              <>✨ Skapa användare med paket</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserWithSubscriptionModal;
