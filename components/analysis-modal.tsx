import { Check, Clear } from "@mui/icons-material";

interface Document {
  name: string;
  status: "failed" | "completed";
}

interface ValidationCriteria {
  questionStatus: string; // Example: "Completed", "Pending"
  questionText: string; // Example: "Test question"
  result: "fail" | "pending" | "Completed";
  documents: Document[];
}

interface QuestionResult {
  ai_result: string;
  question: {
    question: string;
    documents_required: string[];
  };
  missing_documents: string[];
}

interface AnalysisResult {
  application_question_result: QuestionResult[];
}

interface AnalysisResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisResult: AnalysisResult | null; // Accepts the analysis result structure or null
}

export function AnalysisResultModal({
  isOpen,
  onClose,
  analysisResult,
}: AnalysisResultModalProps) {
  if (!isOpen || !analysisResult) return null;

  // Map the analysis result to validation criteria
  const validationCriteria: ValidationCriteria[] =
    analysisResult.application_question_result.map((questionResult) => {
      const hasMissingDocuments = questionResult.missing_documents.length > 0;
      const status = hasMissingDocuments ? "fail" : "Completed";

      return {
        questionStatus: questionResult.ai_result,
        questionText: questionResult.question.question,
        result: status,
        documents: questionResult.question.documents_required.map((doc) => ({
          name: doc,
          status:
            hasMissingDocuments &&
            questionResult.missing_documents.includes(doc)
              ? "failed"
              : "completed",
        })),
      };
    });

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="relative bg-white rounded-lg shadow-xl w-2/3 p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-none">
              <thead>
                <tr>
                  <th className="py-2 px-4">Questions</th>
                  <th className="py-2 px-4">Result</th>
                  <th className="py-2 px-4">Documents Name</th>
                </tr>
              </thead>
              <tbody>
                {validationCriteria.map((item, index) => (
                  <tr key={index}>
                    <td className="py-4 px-4 flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-sm rounded-full list-item ${
                          item.questionStatus === "Completed"
                            ? "bg-green-300"
                            : "bg-yellow-300"
                        }`}
                      >
                        {item.questionStatus}
                      </span>
                      <span>{item.questionText}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {item.result === "fail" ? (
                        <Clear color="error" />
                      ) : (
                        <Check color="success" />
                      )}
                    </td>
                    <td className="py-4 px-4 flex gap-2">
                      {item.documents.map((doc, docIndex) => (
                        <button
                          key={docIndex}
                          className="bg-gray-200 text-sm rounded-lg py-1 px-2 text-gray-700"
                        >
                          {doc.name}
                          <span
                            className={`block text-xs text-gray-500 mb-1 p-1 rounded-lg ${
                              doc.status === "failed"
                                ? "bg-red-300"
                                : "bg-green-300"
                            }`}
                          >
                            {doc.status}
                          </span>
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
