/**
 * ==========================================
 * PACKAGE MANAGEMENT PAGE
 * ==========================================
 * Admin-sida för att hantera prenumerationspaket
 *
 * FEATURES:
 * - Lista alla paket
 * - Redigera paket
 * - Aktivera/inaktivera paket
 * - Visa paketstatistik
 */

import { useState, useEffect } from "react";
import AdminLayout from "../../shared/components/AdminLayout";
import PageHeader from "@shared/components/ui/PageHeader";
import DataTable from "@shared/components/ui/DataTable";
import StatCard from "@shared/components/ui/StatCard";
import Badge from "@shared/components/ui/Badge";
import Button from "@shared/components/ui/Button";
import LoadingSpinner from "@shared/components/ui/LoadingSpinner";
import Alert from "@shared/components/ui/Alert";
import PackageFormModal from "../components/PackageFormModal";
import ConfirmModal from "../../user-management/components/ConfirmModal";
import packageService from "../services/packageService";

const PackageManagementPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Hämta packages vid mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const data = await packageService.getAllPackages();
      setPackages(data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Kunde inte hämta paket. Försök igen senare.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePackage = async (packageData) => {
    try {
      await packageService.createPackage(packageData);
      setSuccess("Paket skapades framgångsrikt!");
      await fetchPackages();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Kunde inte skapa paket");
      throw err;
    }
  };

  const handleEditPackage = async (packageData) => {
    try {
      await packageService.updatePackage(selectedPackage.id, packageData);
      setSuccess("Paket uppdaterades framgångsrikt!");
      await fetchPackages();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Kunde inte uppdatera paket");
      throw err;
    }
  };

  const handleDeletePackage = (pkg) => {
    setSelectedPackage(pkg);
    setConfirmAction({
      type: "delete",
      message: `Är du säker på att du vill ta bort paketet "${pkg.name}"? Detta går inte att ångra. Befintliga användare med detta paket kan påverkas.`,
      confirmText: "Ta bort",
    });
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await packageService.deletePackage(selectedPackage.id);
      setSuccess("Paket togs bort framgångsrikt!");
      await fetchPackages();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Kunde inte ta bort paket. Försök igen.",
      );
    } finally {
      setIsConfirmModalOpen(false);
      setSelectedPackage(null);
      setConfirmAction(null);
    }
  };

  const handleToggleActive = (pkg) => {
    setSelectedPackage(pkg);
    setConfirmAction({
      type: pkg.active ? "deactivate" : "activate",
      message: pkg.active
        ? `Är du säker på att du vill inaktivera "${pkg.name}"? Paketet kommer inte längre att visas för kunder.`
        : `Är du säker på att du vill aktivera "${pkg.name}"? Paketet kommer att bli tillgängligt för kunder.`,
      confirmText: pkg.active ? "Inaktivera" : "Aktivera",
    });
    setIsConfirmModalOpen(true);
  };

  const handleConfirmToggle = async () => {
    try {
      const newActiveStatus = confirmAction.type === "activate";
      await packageService.togglePackageStatus(
        selectedPackage.id,
        newActiveStatus,
      );

      setSuccess(
        confirmAction.type === "deactivate"
          ? "Paket inaktiverades framgångsrikt!"
          : "Paket aktiverades framgångsrikt!",
      );
      await fetchPackages();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Kunde inte uppdatera paketstatus. Försök igen.",
      );
    } finally {
      setIsConfirmModalOpen(false);
      setSelectedPackage(null);
      setConfirmAction(null);
    }
  };

  const handleConfirmAction = async () => {
    if (confirmAction?.type === "delete") {
      await handleConfirmDelete();
    } else {
      await handleConfirmToggle();
    }
  };

  const openEditModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsEditModalOpen(true);
  };

  // Kolumndefinitioner
  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Paketnamn", sortable: true },
    { key: "price", label: "Pris", sortable: true },
    { key: "validityDays", label: "Giltighetstid", sortable: true },
    { key: "active", label: "Status" },
    { key: "actions", label: "Åtgärder", align: "right" },
  ];

  // Render cell-innehåll
  const renderCell = (pkg, column) => {
    switch (column.key) {
      case "price":
        return `${pkg.price} kr`;

      case "validityDays":
        return `${pkg.validityDays} dagar`;

      case "active":
        return (
          <Badge variant={pkg.active ? "success" : "error"}>
            {pkg.active ? "Aktiv" : "Inaktiv"}
          </Badge>
        );

      case "actions":
        return (
          <div className="flex gap-2 justify-end">
            <Button
              variant="secondary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                openEditModal(pkg);
              }}
            >
              Redigera
            </Button>
            <Button
              variant={pkg.active ? "danger" : "primary"}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleActive(pkg);
              }}
            >
              {pkg.active ? "Inaktivera" : "Aktivera"}
            </Button>
            <Button
              variant="danger"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleDeletePackage(pkg);
              }}
            >
              Ta bort
            </Button>
          </div>
        );

      default:
        return pkg[column.key];
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner message="Laddar paket..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Pakethantering"
        description="Hantera prenumerationspaket och priser"
        icon="📦"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Paket" },
        ]}
        actions={
          <Button onClick={() => setIsCreateModalOpen(true)}>
            + Skapa nytt paket
          </Button>
        }
      />

      {/* Alerts – visa fel enbart när det finns paket (t.ex. vid misslyckad redigering) */}
      {error && packages.length > 0 && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}
      {success && (
        <Alert
          type="success"
          message={success}
          onClose={() => setSuccess(null)}
          className="mb-6"
        />
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Totalt Antal Paket"
          value={packages.length}
          icon="📦"
          color="blue"
        />
        <StatCard
          title="Aktiva Paket"
          value={packages.filter((p) => p.active).length}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Inaktiva Paket"
          value={packages.filter((p) => !p.active).length}
          icon="❌"
          color="red"
        />
      </div>

      {/* Packages Table or empty state */}
      {!loading && packages.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Inga paket tillagda ännu
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            {error
              ? "Det gick inte att ansluta till pakettjänsten just nu. Försök igen eller skapa ett nytt paket."
              : "Inga prenumerationspaket finns i systemet. Kom igång genom att skapa ditt första paket."}
          </p>
          <div className="flex gap-3 justify-center">
            {error && (
              <button
                onClick={fetchPackages}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Försök igen
              </button>
            )}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              + Skapa nytt paket
            </button>
          </div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={packages}
          renderCell={renderCell}
          emptyMessage="Inga paket hittades i systemet"
          striped
          hoverable
        />
      )}

      {/* Create Package Modal */}
      <PackageFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreatePackage}
        packageData={null}
      />

      {/* Edit Package Modal */}
      <PackageFormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPackage(null);
        }}
        onSave={handleEditPackage}
        packageData={selectedPackage}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setSelectedPackage(null);
          setConfirmAction(null);
        }}
        onConfirm={handleConfirmAction}
        message={confirmAction?.message || ""}
        confirmText={confirmAction?.confirmText || "Bekräfta"}
      />
    </AdminLayout>
  );
};

export default PackageManagementPage;
