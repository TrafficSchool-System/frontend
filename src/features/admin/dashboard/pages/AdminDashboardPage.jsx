/**
 * ==========================================
 * ADMIN DASHBOARD PAGE
 * ==========================================
 * Huvudsida för admin panel med översikt och snabbåtkomst
 *
 * FEATURES:
 * - Statistik-kort med klickbara länkar
 * - Admin-information
 * - Snabbåtgärder
 * - Välstrukturerad layout
 */

import { useNavigate } from "react-router-dom";
import AdminLayout from "../../shared/components/AdminLayout";
import StatCard from "@shared/components/ui/StatCard";
import Card from "@shared/components/ui/Card";
import Button from "@shared/components/ui/Button";
import Alert from "@shared/components/ui/Alert";
import PageHeader from "@shared/components/ui/PageHeader";
import useAdminDashboardStats from "../hooks/useAdminDashboardStats";

const AdminDashboardPage = () => {
  const {
    totalUsers,
    activeExams,
    completedExams,
    loading,
    error,
    clearError,
  } = useAdminDashboardStats();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <PageHeader
        title="Dashboard"
        description="Översikt över TrafficSchool Admin Panel"
        icon="📊"
      />

      {/* Felmeddelande */}
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={clearError}
          className="mb-6"
        />
      )}

      {/* Statistik-kort */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Totalt Användare"
          value={totalUsers}
          icon="👥"
          color="blue"
          loading={loading}
          description="Registrerade användare i systemet"
          onClick={() => navigate("/admin/users")}
        />

        <StatCard
          title="Aktiva Quizzes"
          value={activeExams}
          icon="📝"
          color="green"
          loading={loading}
          description="Pågående quiz-sessioner"
        />

        <StatCard
          title="Genomförda Exams"
          value={completedExams}
          icon="🎓"
          color="purple"
          loading={loading}
          description="Slutförda examinationer"
        />
      </div>

      {/* Snabbåtgärder Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Användarhantering */}
        <Card hover>
          <Card.Header
            title="Användarhantering"
            icon="👥"
            subtitle="Hantera användare och deras information"
          />
          <Card.Body>
            <p className="text-gray-600 mb-4">
              Visa, redigera och hantera alla användare i systemet. Se
              användarstatistik och prenumerationsstatus.
            </p>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => navigate("/admin/users")} fullWidth>
              Öppna Användarhantering →
            </Button>
          </Card.Footer>
        </Card>

        {/* Pakethantering */}
        <Card hover>
          <Card.Header
            title="Pakethantering"
            icon="📦"
            subtitle="Hantera prenumerationspaket"
          />
          <Card.Body>
            <p className="text-gray-600 mb-4">
              Skapa, redigera och hantera alla prenumerationspaket. Ställ in
              priser och funktioner.
            </p>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => navigate("/admin/packages")} fullWidth>
              Öppna Pakethantering →
            </Button>
          </Card.Footer>
        </Card>

        {/* Excel-filhantering */}
        <Card hover>
          <Card.Header
            title="Excel-filhantering"
            icon="📁"
            subtitle="Importera och hantera quiz-frågor"
          />
          <Card.Body>
            <p className="text-gray-600 mb-4">
              Ladda upp Excel-filer med quiz-frågor, visa och redigera
              importerade frågor.
            </p>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => navigate("/admin/excel-files")} fullWidth>
              Öppna Excel-hantering →
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
