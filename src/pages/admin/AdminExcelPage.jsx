// AdminExcelPage.jsx
import { useEffect } from "react";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import ExcelFileList from "../../components/admin/excel/ExcelFileList";
import ExcelFileUpload from "../../components/admin/excel/ExcelFileUpload";
import ScrollableQuestionList from "../../components/admin/excel/ScrollableQuestionList";
import QuestionSearch from "../../components/admin/excel/QuestionSearch";
import useExcelFiles from "../../hooks/admin/useExcelFiles";
import useAdminQuestions from "../../hooks/admin/useAdminQuestions";
import LoadingSpinner from "../../components/shared/ui/LoadingSpinner";
import Alert from "../../components/shared/ui/Alert";

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
      {/* Excel Errors */}
      {excelError && (
        <Alert type="error" onClose={clearExcelError}>
          <ul className="list-disc ml-4">
            {(Array.isArray(excelError) ? excelError : [excelError]).map(
              (e, i) => (
                <li key={i}>{e}</li>
              )
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
        />
      )}

      {/* Excel Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Hantera Excel-filer</h2>
        {excelLoading ? (
          <LoadingSpinner message="Hämtar Excel-filer..." />
        ) : (
          <>
            <ExcelFileUpload onUpload={uploadFile} />
            <ExcelFileList files={files} onDelete={deleteFile} />
          </>
        )}
      </section>

      {/* Questions Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Redigera frågor</h2>

        {/* Search */}
        <QuestionSearch
          onSearch={searchQuestionById}
          onReset={fetchAllQuestions}
        />

        {questionLoading ? (
          <LoadingSpinner message="Hämtar frågor..." />
        ) : (
          <ScrollableQuestionList
            questions={questions}
            onSave={updateQuestion}
          />
        )}
      </section>
    </AdminLayout>
  );
};

export default AdminExcelPage;
