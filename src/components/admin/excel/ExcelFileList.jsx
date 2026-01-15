import Button from "../../shared/ui/Button";

const ExcelFileList = ({ files, onDelete }) => {
  if (!files || files.length === 0)
    return (
      <p className="text-gray-500 text-center py-6 italic">
        Inga filer uppladdade ännu.
      </p>
    );

  const maxHeight = "max-h-[300px]"; // scroll efter 4-5 filer

  return (
    <div
      className={`overflow-x-auto overflow-y-auto border rounded-xl shadow-md bg-white ${maxHeight}`}
    >
      <table className="w-full min-w-[500px] table-auto border-collapse">
        <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
          <tr>
            <th className="px-6 py-3 text-left text-gray-600 uppercase text-sm tracking-wider">
              Filnamn
            </th>
            <th className="px-6 py-3 text-left text-gray-600 uppercase text-sm tracking-wider">
              Uppladdat
            </th>
            <th className="px-6 py-3 text-left text-gray-600 uppercase text-sm tracking-wider">
              Åtgärder
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, idx) => (
            <tr
              key={file.id}
              className={`transition-colors ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50`}
            >
              <td className="px-6 py-3 font-medium text-gray-800">{file.fileName}</td>
              <td className="px-6 py-3 text-gray-500">
                {new Date(file.uploadedAt).toLocaleString("sv-SE", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </td>
              <td className="px-6 py-3">
                <Button
                  onClick={() => onDelete(file.id)}
                  className="px-4 py-2 rounded-md bg-red-100 hover:bg-red-200 text-red-700 font-medium transition-colors"
                >
                  Ta bort
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelFileList;
