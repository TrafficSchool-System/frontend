/**
 * ==========================================
 * ADMIN EXCEL MANAGEMENT PAGE
 * ==========================================
 * Sida för att hantera Excel-filer och quiz-frågor
 *
 * FEATURES:
 * - Ladda upp Excel-filer med quiz-frågor
 * - Lista och ta bort Excel-filer
 * - Visa alla importerade frågor
 * - Sök och redigera individuella frågor
 */

import { useEffect } from "react";
import AdminLayout from "../../shared/components/AdminLayout";
import PageHeader from "@shared/components/ui/PageHeader";
import Card from "@shared/components/ui/Card";
import ExcelFileList from "../components/ExcelFileList";
import ExcelFileUpload from "../components/ExcelFileUpload";
import ScrollableQuestionList from "../components/ScrollableQuestionList";
import QuestionSearch from "../components/QuestionSearch";
import useExcelFiles from "../hooks/useExcelFiles";
import useAdminQuestions from "../hooks/useAdminQuestions";
import LoadingSpinner from "@shared/components/ui/LoadingSpinner";
import Alert from "@shared/components/ui/Alert";

const AdminExcelPage = () => {
  const {
    files,
    loading: excelLoading,
    error: excelError,
    clearError: clearExcelError,
    uploadFile,
    deleteFile,
  } = useExcelFiles();

  const {
    questions,
    loading: questionLoading,
    error: questionError,
    clearError: clearQuestionError,
    fetchAllQuestions,
    searchQuestionById,
    updateQuestion,
  } = useAdminQuestions();

  // Visa alla frågor initialt
  useEffect(() => {
    fetchAllQuestions();
  }, [fetchAllQuestions]);

  return (
    <AdminLayout>
      <PageHeader
        title="Excel-filhantering"
        description="Ladda upp och hantera quiz-frågor från Excel-filer"
        icon="📁"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Excel-filer" },
        ]}
      />

      {/* Excel Errors */}
      {excelError && (
        <Alert type="error" onClose={clearExcelError} className="mb-6">
          <ul className="list-disc ml-4">
            {(Array.isArray(excelError) ? excelError : [excelError]).map(
              (e, i) => (
                <li key={i}>{e}</li>
              ),
            )}
          </ul>
        </Alert>
      )}

      {/* Question Errors */}
      {questionError && (
        <Alert
          type="error"
          message={questionError}
          onClose={clearQuestionError}
          className="mb-6"
        />
      )}

      {/* Excel Section */}
      <Card className="mb-8">
        <Card.Header
          title="Hantera Excel-filer"
          subtitle="Ladda upp och ta bort Excel-filer med quiz-frågor"
          icon="📤"
        />
        <Card.Body>
          {excelLoading ? (
            <LoadingSpinner message="Hämtar Excel-filer..." />
          ) : (
            <div className="space-y-6">
              <ExcelFileUpload onUpload={uploadFile} />
              <ExcelFileList files={files} onDelete={deleteFile} />
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Questions Section */}
      <Card>
        <Card.Header
          title="Redigera frågor"
          subtitle="Sök och redigera importerade quiz-frågor"
          icon="✏️"
        />
        <Card.Body>
          {/* Search */}
          <div className="mb-6">
            <QuestionSearch
              onSearch={searchQuestionById}
              onReset={fetchAllQuestions}
            />
          </div>

          {/* Questions List */}
          {questionLoading ? (
            <LoadingSpinner message="Hämtar frågor..." />
          ) : (
            <ScrollableQuestionList
              questions={questions}
              onSave={updateQuestion}
            />
          )}
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default AdminExcelPage;
