import { useApplyMutation } from "@/store/slice/application/application-sclice";
import { UploadZone } from "./upload-zone";
import { useState } from "react";

interface DocumentValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisClick: () => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAnalysisResult: (result: any) => void;
}

interface UploadStatus {
  uploaded: boolean;
  fileName: string;
  fileId: string;
}

interface UploadStatusMap {
  driverLicense: UploadStatus;
  uprisals: UploadStatus;
  operatingAgreement: UploadStatus;
  loanApplication: UploadStatus;
}

export function DocumentValidationModal({
  isOpen,
  onClose,
  onAnalysisClick,
  setAnalysisResult,
}: DocumentValidationModalProps) {
  const [uploadStatus, setUploadStatus] = useState<UploadStatusMap>({
    driverLicense: { uploaded: false, fileName: "", fileId: "" },
    uprisals: { uploaded: false, fileName: "", fileId: "" },
    operatingAgreement: { uploaded: false, fileName: "", fileId: "" },
    loanApplication: { uploaded: false, fileName: "", fileId: "" },
  });

  const [apply, { isLoading: isApplying }] = useApplyMutation();

  const allUploaded = Object.values(uploadStatus).every(
    (status) => status.uploaded
  );

  const handleUploadComplete = (
    key: keyof UploadStatusMap,
    fileName: string,
    fileId: string
  ) => {
    setUploadStatus((prev) => ({
      ...prev,
      [key]: { uploaded: true, fileName, fileId },
    }));
  };

  const handleStartAnalysis = async () => {
    try {
      const applicationDocuments = Object.entries(uploadStatus).map(
        ([key, { fileId }]) => {
          const documentTypeMap: Record<string, string> = {
            driverLicense: "driver_license",
            uprisals: "appraisal",
            operatingAgreement: "operating_agreement",
            loanApplication: "loan_application",
          };

          return {
            document_type: documentTypeMap[key],
            file_id: fileId,
          };
        }
      );

      const result = await apply({
        application_documents: applicationDocuments,
        application_type: "loan",
      }).unwrap();

      setAnalysisResult(result);
      onAnalysisClick();
    } catch (error) {
      console.error("Analysis failed", error);
    }
  };

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
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <UploadZone
                title="Driver License"
                onUploadComplete={(fileName, fileId) =>
                  handleUploadComplete("driverLicense", fileName, fileId)
                }
                isUploaded={uploadStatus.driverLicense.uploaded}
                uploadedFileName={uploadStatus.driverLicense.fileName}
              />
              <UploadZone
                title="Uprisals"
                onUploadComplete={(fileName, fileId) =>
                  handleUploadComplete("uprisals", fileName, fileId)
                }
                isUploaded={uploadStatus.uprisals.uploaded}
                uploadedFileName={uploadStatus.uprisals.fileName}
              />
              <UploadZone
                title="Operating Agreement"
                onUploadComplete={(fileName, fileId) =>
                  handleUploadComplete("operatingAgreement", fileName, fileId)
                }
                isUploaded={uploadStatus.operatingAgreement.uploaded}
                uploadedFileName={uploadStatus.operatingAgreement.fileName}
              />
              <UploadZone
                title="Loan Application"
                onUploadComplete={(fileName, fileId) =>
                  handleUploadComplete("loanApplication", fileName, fileId)
                }
                isUploaded={uploadStatus.loanApplication.uploaded}
                uploadedFileName={uploadStatus.loanApplication.fileName}
              />
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                allUploaded
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleStartAnalysis}
              disabled={!allUploaded || isApplying}
            >
              {isApplying ? "Analyzing..." : "Start Analysis"}
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
}
