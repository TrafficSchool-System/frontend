/**
 * ==========================================
 * PACKAGE FORM MODAL
 * ==========================================
 * Modal för att skapa eller redigera prenumerationspaket
 */

import { useState, useEffect } from "react";
import Modal from "@shared/components/ui/Modal";
import Button from "@shared/components/ui/Button";

const PackageFormModal = ({ isOpen, onClose, onSave, packageData = null }) => {
  const [formData, setFormData] = useState({
    packageType: "DAY",
    name: "",
    price: "",
    validityDays: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!packageData;

  // Fyll i formuläret om vi redigerar
  useEffect(() => {
    if (packageData) {
      setFormData({
        packageType: packageData.packageType || "DAY",
        name: packageData.name || "",
        price: packageData.price || "",
        validityDays: packageData.validityDays || "",
        description: packageData.description || "",
      });
    } else {
      // Reset vid nytt paket
      setFormData({
        packageType: "DAY",
        name: "",
        price: "",
        validityDays: "",
        description: "",
      });
    }
    setErrors({});
  }, [packageData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Rensa fel när användaren skriver
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Namn är obligatoriskt";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Pris måste vara större än 0";
    }

    if (!formData.validityDays || formData.validityDays <= 0) {
      newErrors.validityDays = "Varaktighet måste vara större än 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSave({
        ...formData,
        price: parseFloat(formData.price),
        validityDays: parseInt(formData.validityDays),
      });
      onClose();
    } catch (error) {
      console.error("Error saving package:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Redigera Paket" : "Skapa Nytt Paket"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Package Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pakettyp
          </label>
          <select
            name="packageType"
            value={formData.packageType}
            onChange={handleChange}
            disabled={isEditMode}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="DAY">Dagspaket</option>
            <option value="WEEK">Veckopaket</option>
            <option value="MONTH">Månadspaket</option>
          </select>
          {isEditMode && (
            <p className="mt-1 text-xs text-gray-500">
              Pakettyp kan inte ändras efter skapande
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Namn *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="T.ex. Dagspaket"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pris (kr) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="49.00"
            step="0.01"
            min="0"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        {/* Duration Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Varaktighet (dagar) *
          </label>
          <input
            type="number"
            name="validityDays"
            value={formData.validityDays}
            onChange={handleChange}
            placeholder="1"
            min="1"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.validityDays ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.validityDays && (
            <p className="mt-1 text-sm text-red-600">{errors.validityDays}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Beskrivning
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="T.ex. 24 timmars obegränsad tillgång"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Avbryt
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Sparar..."
              : isEditMode
                ? "Uppdatera"
                : "Skapa paket"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PackageFormModal;
