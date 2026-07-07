/**
 * ==========================================
 * ADMIN EXCEL MANAGEMENT PAGE
 * ==========================================
 */

import { useEffect, useMemo, useState } from "react";
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
    fetchFiles,
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

  const [uploadFeedback, setUploadFeedback] = useState(null);

  const handleUploadAndRefresh = async (file, dryRun = false) => {
    setUploadFeedback(null);
    try {
      const result = await uploadFile(file, dryRun);
      // Visa success direkt – refresha sedan i bakgrunden utan await
      setUploadFeedback({ type: "success", messages: [result ?? "Uppladdning lyckades!"] });
      fetchFiles();
      fetchAllQuestions();
    } catch (err) {
      let messages = [];
      if (err?.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        messages = err.response.data.errors;
      } else if (err?.response?.data?.message) {
        messages = [err.response.data.message];
      } else if (err?.message) {
        messages = [err.message];
      } else {
        messages = ["Uppladdningen misslyckades. Försök igen."];
      }
      setUploadFeedback({ type: "error", messages });
    }
  };

  const handleDeleteAndRefresh = async (id) => {
    const result = await deleteFile(id);
    await fetchAllQuestions();
    return result;
  };

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

      {/* Fel vid uppladdning/borttagning av Excel-filer */}
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
      {/* Fel vid hämtning av frågor (visa bara när frågor finns) */}
      {questionError && allQuestions.length > 0 && (
        <Alert
          type="error"
          message={
            Array.isArray(questionError)
              ? questionError.join(" ")
              : questionError
          }
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
          {/* Feedback för uppladdning (överlever loading-cykeln) */}
          {uploadFeedback?.type === "success" && (
            <div className="mb-4 p-3 bg-green-50 border border-green-300 rounded-lg text-green-800 text-sm font-medium">
              ✅ {uploadFeedback.messages[0]}
            </div>
          )}
          {uploadFeedback?.type === "error" && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg">
              <p className="text-red-800 font-semibold text-sm mb-1">⚠️ Uppladdningen misslyckades:</p>
              <ul className="list-disc ml-5 text-red-700 text-sm space-y-0.5">
                {uploadFeedback.messages.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {excelLoading ? (
            <LoadingSpinner message="Hämtar Excel-filer..." />
          ) : (
            <div className="space-y-6">
              <ExcelFileUpload onUpload={handleUploadAndRefresh} />
              {excelError && files.length === 0 ? (
                <div className="py-4 space-y-3">
                  <p className="text-center text-sm text-gray-500">
                    Kunde inte hämta uppladdade filer just nu.
                  </p>
                  <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                    <ul className="list-disc ml-4">
                      {(Array.isArray(excelError) ? excelError : [excelError]).map(
                        (e, i) => (
                          <li key={i}>{e}</li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={fetchFiles}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      Försök igen
                    </button>
                  </div>
                </div>
              ) : (
                <ExcelFileList files={files} onDelete={handleDeleteAndRefresh} />
              )}
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
          ) : allQuestions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">✏️</div>
              <h3 className="text-base font-semibold text-gray-700 mb-1">
                Inga frågor importerade ännu
              </h3>
              <p className="text-sm text-gray-500">
                {questionError
                  ? "Frågetjänsten svarar inte just nu. Försök ladda om sidan."
                  : "Ladda upp en Excel-fil ovan för att importera frågor till frågebanken."}
              </p>
              {questionError && (
                <button
                  onClick={fetchAllQuestions}
                  className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Försök igen
                </button>
              )}
            </div>
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
