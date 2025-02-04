"use client";

import { useState, useEffect } from "react";
import { useGetAllApplicationsQuery } from "@/store/slice/application/application-sclice";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
// import { console } from "inspector";

export default function Applications() {
  const { data, isLoading, error } = useGetAllApplicationsQuery();
  const [visibleCount, setVisibleCount] = useState(10); // Start with 10 rows visible
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({}); // Track all open dropdowns
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
    if (!questionResult || !questionResult.question) {
      console.error("Invalid question result:", questionResult);
      return;
    }

    const { question, reason, context } = questionResult;
    const reviewData = {
      questionText: question?.question || "No question text available.",
      description: "The AI analyzed the document and reached the following reasoning and context:",
      reason: reason || "No specific reason provided.",
      parsedContext: context ? JSON.parse(context) : "No additional context available.",
    };

    setReviewDetails(reviewData);
    setOpenReviewModal(true);
  };



  const handleCloseReview = () => {
    setOpenReviewModal(false);
    setReviewDetails(null);
  };
  useEffect(() => {
    if (data) {
      // Initialize all dropdowns as open
      const initialOpenDropdowns: Record<string, boolean> = {};
      data.forEach((application) => {
        application.application_question_result.forEach((_, qIndex) => {
          const dropdownName = `${application.id}-${qIndex}`;
          initialOpenDropdowns[dropdownName] = true;
        });
      });
      setOpenDropdowns(initialOpenDropdowns);
    }
  }, [data]);

  // Toggle the dropdown for a specific item
  const handleToggleDropdown = (name: string) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  // Handle sort order
  const sortedData = data
    ? [...data].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    })
    : [];

  // Limit visible rows
  const displayedData = sortedData.slice(0, visibleCount);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg text-gray-500">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Failed to load applications.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Applications</h1>

        {/* Sort Controls */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            Showing {Math.min(visibleCount, sortedData.length)} of {sortedData.length} results
          </p>
          <div className="flex">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium mr-2 ${sortOrder === "latest" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onClick={() => setSortOrder("latest")}
            >
              Latest to Oldest
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${sortOrder === "oldest" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onClick={() => setSortOrder("oldest")}
            >
              Oldest to Latest
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <th className="py-4 px-6 w-48">Application Type</th>
                <th className="py-4 px-6 w-36">Created At</th>
                <th className="py-4 px-6">
                  <div className="flex justify-around">
                    <span>Validation Check List</span>
                    <span>AI Result</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedData.map((application) => (
                <tr key={application.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6 align-top">{application.application_type}</td>
                  <td className="py-4 px-6 align-top">
                    {new Date(application.created_at).toLocaleDateString("en-US")}
                  </td>
                  <td className="py-4 px-6 align-top">
                    {application.application_question_result.map((question, qIndex) => {
                      const dropdownName = `${application.id}-${qIndex}`; // Unique identifier for dropdowns

                      return (
                        <div key={qIndex} className="flex items-center gap-4 mb-4">
                          {/* Validation Check List */}
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{question.question.question}</div>
                            <span
                              className={`inline-block px-2 py-1 rounded-md text-sm font-medium ${question.process_status === "completed"
                                ? "bg-green-100 text-green-600"
                                : question.process_status === "pending"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                                }`}
                            >
                              {question.process_status}
                            </span>
                            <div className="mt-2">
                              <button
                                onClick={() => handleToggleDropdown(dropdownName)}
                                className="flex items-center text-blue-600 font-medium hover:underline"
                              >
                                <span className="font-medium text-gray-600">Documents:</span>
                                <svg
                                  className={`w-4 h-4 ml-2 transform transition-transform ${openDropdowns[dropdownName] ? "rotate-180" : "rotate-0"
                                    }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>

                              <div
                                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${openDropdowns[dropdownName] ? "max-h-96" : "max-h-0"
                                  }`}
                              >
                                <div className="mt-2">

                                  <ul className="felx flex-col gap-3 mt-1">
                                    {application.application_documents.map((doc, dIndex) => {
                                      const maxLength = 40;
                                      const truncatedFileName =
                                        doc.file.file_name.length > maxLength
                                          ? `${doc.file.file_name.slice(0, maxLength)}...`
                                          : doc.file.file_name;

                                      return (
                                        <li key={dIndex} className="text-blue-600 mb-2">
                                          <a
                                            href={doc.file.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline"
                                          >
                                            {truncatedFileName}
                                          </a>
                                          <span
                                            className={`ml-2 px-2 py-1 rounded-md text-sm font-medium ${doc.indexing_status === "completed"
                                              ? "bg-green-100 text-green-600"
                                              : doc.indexing_status === "pending"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : "bg-red-100 text-red-600"
                                              }`}
                                          >
                                            {doc.indexing_status || "N/A"}
                                          </span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* AI Result */}
                          <div className="flex-1 text-center">
                            <span
                              className={`inline-block px-2 py-1 rounded-md text-sm font-medium ${question.ai_result === "approved"
                                ? "bg-green-100 text-green-600"
                                : question.ai_result === "pending"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                                }`}
                            >
                              {question.ai_result}
                            </span>
                            <div className="align-top">
                              <button
                                onClick={() => handleOpenReview(question)}
                                className="text-primaryColor hover:underline"
                              >
                                Review
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show More / Show Less Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          {visibleCount > 10 && (
            <button
              className="px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition"
              onClick={() => setVisibleCount(visibleCount - 5)}
            >
              Show Less
            </button>
          )}
          {visibleCount < sortedData.length && (
            <button
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
              onClick={() => setVisibleCount(visibleCount + 5)}
            >
              Show More
            </button>
          )}
        </div>
      </div>


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
              {Array.isArray(reviewDetails.parsedContext) ? (
                reviewDetails.parsedContext.map((contextItem, index) => (
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
                          <p className="whitespace-pre-wrap">
                            {meta.text.replace(/\*\*/g, "")} {/* Removes **bold** formatting */}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p>{reviewDetails.parsedContext}</p>
              )}
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

    </div>
  );
}
