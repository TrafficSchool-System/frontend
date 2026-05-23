/**
 * ==========================================
 * ADMIN EXCEL MANAGEMENT PAGE
 * ==========================================
 */

import { useEffect, useMemo } from "react";
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

const SUBJECT_META = [
  {
    id: 1,
    label: "Fordonskunskap",
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    id: 2,
    label: "Trafikregler",
    color: "bg-green-50 border-green-200 text-green-700",
  },
  {
    id: 3,
    label: "Människan",
    color: "bg-purple-50 border-purple-200 text-purple-700",
  },
  {
    id: 4,
    label: "Miljö & Körtek",
    color: "bg-orange-50 border-orange-200 text-orange-700",
  },
  {
    id: 5,
    label: "Trafiksäkerhet",
    color: "bg-red-50 border-red-200 text-red-700",
  },
];

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
    allQuestions,
    loading: questionLoading,
    error: questionError,
    clearError: clearQuestionError,
    fetchAllQuestions,
    filterQuestions,
    updateQuestion,
  } = useAdminQuestions();

  useEffect(() => {
    fetchAllQuestions();
  }, [fetchAllQuestions]);

  // Count questions per subject from the unfiltered list
  const subjectCounts = useMemo(() => {
    const counts = {};
    SUBJECT_META.forEach((s) => (counts[s.id] = 0));
    allQuestions.forEach((q) => {
      if (counts[q.subject] !== undefined) counts[q.subject]++;
    });
    return counts;
  }, [allQuestions]);

  return (
    <AdminLayout>
      <PageHeader
        title="Fråghantering"
        description="Ladda upp Excel-filer och hantera quiz-frågor"
        icon="📁"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Frågor" },
        ]}
      />

      {/* Errors */}
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
      {questionError && (
        <Alert
          type="error"
          message={questionError}
          onClose={clearQuestionError}
          className="mb-6"
        />
      )}

      {/* ── Excel upload card ── */}
      <Card className="mb-8">
        <Card.Header
          title="Excel-filer"
          subtitle="Importera frågor via .xlsx — varje fil kan innehålla hundratals frågor"
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

      {/* ── Questions card ── */}
      <Card>
        <Card.Header
          title="Frågebank"
          subtitle="Visa, sök och redigera alla importerade frågor"
          icon="✏️"
        />
        <Card.Body>
          {/* Subject stats row */}
          {!questionLoading && allQuestions.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-7">
              {/* Total */}
              <div className="col-span-1 bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-gray-800">
                  {allQuestions.length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                  Totalt
                </p>
              </div>
              {/* Per subject */}
              {SUBJECT_META.map((s) => (
                <div
                  key={s.id}
                  className={`border rounded-xl p-3 text-center ${s.color}`}
                >
                  <p className="text-2xl font-bold">{subjectCounts[s.id]}</p>
                  <p className="text-xs mt-0.5 font-medium truncate">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Search & filter */}
          <QuestionSearch
            onSearch={filterQuestions}
            totalCount={allQuestions.length}
            filteredCount={questions.length}
          />

          {/* List */}
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
