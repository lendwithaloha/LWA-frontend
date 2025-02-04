"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetApplicationByIdQuery } from "@/store/slice/application/application-sclice";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export default function AnalysisResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const applicationId = searchParams.get("id");

  const { data: analysisResult, isLoading } = useGetApplicationByIdQuery(applicationId || "", {
    skip: !applicationId,
  });

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [reviewDetails, setReviewDetails] = useState<{
    questionText: string;
    description: string;
    reason: string;
    parsedContext: Array<{
      context_question: string;
      context_answer: string;
      meta_data: Array<{
        page_number: string;
        document_type: string;
        file_id: string;
        text: string;
      }>;
    }>;
  } | null>(null);

  useEffect(() => {
    if (analysisResult) {
      const initialOpenDropdowns: Record<string, boolean> = {};
      analysisResult.application_question_result.forEach((_, qIndex) => {
        initialOpenDropdowns[`${applicationId}-${qIndex}`] = true; // All open by default
      });
      setOpenDropdowns(initialOpenDropdowns);
    }
  }, [analysisResult, applicationId]);

  const handleToggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  interface QuestionResult {
    question: {
      question: string;
    };
    reason?: string;
    context?: string; // Assuming the context is stored as a JSON string
    process_status?: string;
    ai_result?: string;
  }
  
  const handleOpenReview = (questionResult: QuestionResult) => {
    const { question, reason, context } = questionResult;
    const parsedContext = context ? JSON.parse(context) : [];

    const reviewData = {
      questionText: question.question,
      description: "The AI analyzed the document and reached the following reasoning and context:",
      reason: reason || "No specific reason provided.",
      parsedContext: parsedContext,
    };
    setReviewDetails(reviewData);
    setOpenReviewModal(true);
  };

  const handleCloseReview = () => {
    setOpenReviewModal(false);
    setReviewDetails(null);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Application Details</h1>
          <div className="overflow-auto">
            <p className="text-gray-600 text-center">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisResult) {
    return <p className="text-gray-500 text-center flex justify-center items-center">No results available.</p>;
  }

  const validationCriteria = analysisResult.application_question_result.map((questionResult, index) => {
    const requiredDocuments = questionResult.question.documents_required;
    const documents = requiredDocuments.map((docType) => {
      const uploadedDocument = analysisResult.application_documents.find((doc) => doc.document_type === docType);
      return uploadedDocument
        ? { link: uploadedDocument.file.preview_url, name: uploadedDocument.file.file_name, status: uploadedDocument.indexing_status }
        : { name: docType, status: "missing" };
    });

    return {
      questionText: questionResult.question.question,
      questionStatus: questionResult.process_status,
      aiResult: questionResult.ai_result,
      documents,
      questionResult,
      dropdownName: `${applicationId}-${index}`,
    };
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Application Details</h1>
        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <th className="py-4 px-6">Validation Check List</th>
                <th className="py-4 px-6">AI Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {validationCriteria.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-4 px-6 align-top">
                    <div className="font-medium text-gray-800">{item.questionText}</div>
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-sm font-medium ${
                        item.questionStatus === "completed"
                          ? "bg-green-100 text-green-600"
                          : item.questionStatus === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.questionStatus.charAt(0).toUpperCase() + item.questionStatus.slice(1)}
                    </span>
                    <div className="py-4 px-6 align-top">
                      <button
                        onClick={() => handleToggleDropdown(item.dropdownName)}
                        className="flex items-center text-primaryColor font-medium hover:underline"
                      >
                        <span>View Documents</span>
                        <svg
                          className={`w-4 h-4 ml-2 transform transition-transform ${
                            openDropdowns[item.dropdownName] ? "rotate-180" : "rotate-0"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdowns[item.dropdownName] && (
                        <div className="mt-2 w-56">
                          <ul className="flex flex-col gap-3">
                            {item.documents.map((doc, docIndex) => (
                              <li key={docIndex} className="gap-2 mb-2">
                                <a href={doc.link} target="blank" className="text-primaryColor hover:underline underline-offset-2">
                                  {doc.name.length > 40 ? `${doc.name.slice(0, 40)}...` : doc.name}
                                </a>
                                <span
                                  className={`ml-2 px-3 py-1 rounded-md text-sm font-medium ${
                                    doc.status === "missing"
                                      ? "bg-red-100 text-red-600"
                                      : doc.status === "failed"
                                      ? "bg-red-100 text-red-600"
                                      : doc.status === "started"
                                      ? "bg-blue-100 text-primaryColor"
                                      : doc.status === "pending"
                                      ? "bg-yellow-100 text-yellow-600"
                                      : "bg-green-100 text-green-600"
                                  }`}
                                >
                                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 flex flex-col gap-3 align-top">
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-sm font-medium ${
                        item.aiResult === "approved"
                          ? "bg-green-100 text-green-600"
                          : item.aiResult === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.aiResult.charAt(0).toUpperCase() + item.aiResult.slice(1)}
                    </span>
                    <div className="align-top">
                      <button
                        onClick={() => handleOpenReview(item.questionResult)}
                        className="text-primaryColor hover:underline"
                      >
                        Review
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Review Modal */}
        {reviewDetails && (
          <Dialog open={openReviewModal} onClose={handleCloseReview} maxWidth="sm" fullWidth>
            <DialogTitle>AI Review Details</DialogTitle>
            <DialogContent>
              <p className="font-semibold text-gray-700 mb-4">{reviewDetails.questionText}</p>
              <p className="mb-2 text-gray-600">
                <strong>Reason:</strong> {reviewDetails.reason}
              </p>
              <p className="mb-4 text-gray-600">
                <strong>Context:</strong>
              </p>
              <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-auto text-sm">
                {reviewDetails.parsedContext.map((contextItem, index) => (
                  <div key={index} className="mb-4 border-b pb-4">
                    <p><strong>Question:</strong> {contextItem.context_question}</p>
                    <p><strong>Answer:</strong> {contextItem.context_answer}</p>
                    <p><strong>MetaData:</strong></p>
                    {contextItem.meta_data.map((meta, metaIndex) => (
                      <div key={metaIndex} className="mb-2">
                        <p>- <strong>Page Number:</strong> {meta.page_number}</p>
                        <p>- <strong>Document Type:</strong> {meta.document_type}</p>
                        <p>- <strong>File ID:</strong> {meta.file_id}</p>
                        <p>- <strong>Text:</strong></p>
                        <div className="bg-white p-2 rounded-md border">
                          <p className="whitespace-pre-wrap">{meta.text.replace(/\*\*/g, "")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </DialogContent>
            <DialogActions>
              <button
                onClick={handleCloseReview}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </DialogActions>
          </Dialog>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => router.push("/dashboard/upload-documents")}
            className="px-6 py-2 bg-primaryColor text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
