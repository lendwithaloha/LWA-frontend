"use client";
import { useRouter } from "next/navigation";
import { useApplyMutation } from "@/store/slice/application/application-sclice";
import { UploadZone } from "@/components/upload-zone";
import { useState } from "react";

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

export default function DocumentValidation() {
  const router = useRouter();
  const [uploadStatus, setUploadStatus] = useState<UploadStatusMap>({
    driverLicense: { uploaded: false, fileName: "", fileId: "" },
    uprisals: { uploaded: false, fileName: "", fileId: "" },
    operatingAgreement: { uploaded: false, fileName: "", fileId: "" },
    loanApplication: { uploaded: false, fileName: "", fileId: "" },
  });

  const [apply, { isLoading: isApplying }] = useApplyMutation();

  const allRequiredUploaded = ["driverLicense", "loanApplication"].every(
    (key) => uploadStatus[key as keyof UploadStatusMap].uploaded
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const applicationDocuments = Object.entries(uploadStatus).filter(([_, { uploaded }]) => uploaded)
        .map(([key, { fileId }]) => {
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
        });

      console.log("Payload:", {
        application_documents: applicationDocuments,
        application_type: "loan",
      });

      const result = await apply({
        application_documents: applicationDocuments,
        application_type: "loan",
      }).unwrap();

      router.push(`/dashboard/analysis-result?id=${result.id}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      console.error("Analysis failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Document Validation
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Upload the required documents to start your loan application analysis.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <UploadZone
            title="Driver License (Required)"
            onUploadComplete={(fileName, fileId) =>
              handleUploadComplete("driverLicense", fileName, fileId)
            }
            isUploaded={uploadStatus.driverLicense.uploaded}
            uploadedFileName={uploadStatus.driverLicense.fileName}
          />
          <UploadZone
            title="Loan Application (Required)"
            onUploadComplete={(fileName, fileId) =>
              handleUploadComplete("loanApplication", fileName, fileId)
            }
            isUploaded={uploadStatus.loanApplication.uploaded}
            uploadedFileName={uploadStatus.loanApplication.fileName}
          />
          <UploadZone
            title="Uprisals (Optional)"
            onUploadComplete={(fileName, fileId) =>
              handleUploadComplete("uprisals", fileName, fileId)
            }
            isUploaded={uploadStatus.uprisals.uploaded}
            uploadedFileName={uploadStatus.uprisals.fileName}
          />
          <UploadZone
            title="Operating Agreement (Optional)"
            onUploadComplete={(fileName, fileId) =>
              handleUploadComplete("operatingAgreement", fileName, fileId)
            }
            isUploaded={uploadStatus.operatingAgreement.uploaded}
            uploadedFileName={uploadStatus.operatingAgreement.fileName}
          />
        </div>

        <div className="mt-8">
          <button
            onClick={handleStartAnalysis}
            className={`w-full py-3 rounded-md text-lg font-semibold text-white transition ${
              allRequiredUploaded
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!allRequiredUploaded || isApplying}
          >
            {isApplying ? "Analyzing..." : "Start Analysis"}
          </button>
        </div>
      </div>
    </div>
  );
}
