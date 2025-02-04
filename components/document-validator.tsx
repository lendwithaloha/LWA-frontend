"use client";

import { useState } from "react";
import { Upload, WorkHistory } from "@mui/icons-material";
import { DocumentValidationModal } from "./document-validation-modal";
import { AnalysisResultModal } from "./analysis-modal";
import { useRouter } from "next/navigation";

export function DocumentValidator() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const router = useRouter();

  const handleAnalysisClick = () => {
    setIsModalOpen(false);
    setIsAnalysisModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-8">
      <button
        onClick={() => router.push("/dashboard/upload-documents")}
        className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors w-full sm:w-auto"
      >
        <Upload className="h-5 w-5" />
        <span className="text-sm sm:text-base">Start Analysis</span>
      </button>

      <button
        onClick={() => router.push("/dashboard/all-application-results")}
        className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors w-full sm:w-auto"
      >
        <WorkHistory className="h-5 w-5" />
        <span className="text-sm sm:text-base">All Application Results</span>
      </button>

      <DocumentValidationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAnalysisClick={handleAnalysisClick}
        setAnalysisResult={setAnalysisResult}
      />

      <AnalysisResultModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        analysisResult={analysisResult}
      />
    </div>
  );
}
