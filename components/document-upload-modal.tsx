"use client";

import React, { useState } from "react";
import { UploadZone } from "./upload-zone";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (
    files: Record<string, { fileName: string; fileId: string }>
  ) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [files, setFiles] = useState<
    Record<string, { fileName: string; fileId: string }>
  >({});

  const handleFileSelect =
    (key: string) => (fileName: string, fileId: string) => {
      setFiles((prev) => ({ ...prev, [key]: { fileName, fileId } }));
    };

  const handleAnalysis = () => {
    onUpload(files);
    onClose();
  };

  const canStartAnalysis = Object.keys(files).length >= 4;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Upload Documents
                </h3>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  <UploadZone
                    title="Driver License"
                    onUploadComplete={handleFileSelect("driverLicense")}
                    isUploaded={!!files.driverLicense}
                    uploadedFileName={files.driverLicense?.fileName}
                  />
                  <UploadZone
                    title="Uprisals"
                    onUploadComplete={handleFileSelect("uprisals")}
                    isUploaded={!!files.uprisals}
                    uploadedFileName={files.uprisals?.fileName}
                  />
                  <UploadZone
                    title="Operating Agreement"
                    onUploadComplete={handleFileSelect("operatingAgreement")}
                    isUploaded={!!files.operatingAgreement}
                    uploadedFileName={files.operatingAgreement?.fileName}
                  />
                  <UploadZone
                    title="Loan Application"
                    onUploadComplete={handleFileSelect("loanApplication")}
                    isUploaded={!!files.loanApplication}
                    uploadedFileName={files.loanApplication?.fileName}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm
                ${
                  canStartAnalysis
                    ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
              onClick={handleAnalysis}
              disabled={!canStartAnalysis}
            >
              Start Analysis
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
