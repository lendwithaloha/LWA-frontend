"use client";
import { useState, useRef, useEffect, MutableRefObject } from "react";
import { Upload as UploadIcon } from "@mui/icons-material";
import {
  useUploadFileMutation,
  useCreateDocumentMutation,
  useGetAllDocTypesQuery,
  useGetUserDocumentsQuery,
} from "@/store/slice/user/documentApi";
import { usePathname } from "next/navigation";


interface Document {
  id: string;
  document_type: { id: string };
  current_version: {
    status: "pending" | "approved" | "rejected" | string;
    file: {
      file_name: string;
    };
  };
}

interface DocumentUploadSectionProps {
  title: string;
  docTypeId: string | null;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  isUploading: boolean;
  setIsUploading: (state: boolean) => void;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  title,
  docTypeId,
  fileInputRef,
  isUploading,
  setIsUploading,
}) => {
  const { data: userDocuments, isLoading: isFetchingDocuments } = useGetUserDocumentsQuery();
  const [uploadFile] = useUploadFileMutation();
  const [createDocument] = useCreateDocumentMutation();

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) return alert("Please select a file first.");
    if (!docTypeId) return alert("Document type not found.");

    try {
      setIsUploading(true);
      const file = fileInputRef.current.files[0];
      console.log("Uploading file:", file.name, "Type:", file.type, "Size:", file.size);

      const uploadResponse = await uploadFile(file).unwrap();
      console.log("File uploaded successfully:", uploadResponse);

      await createDocument({
        document_type_id: docTypeId,
        user_file_id: uploadResponse.file_id,
      }).unwrap();

      alert("File uploaded and document created successfully!");
    } catch (error) {
      console.error("Upload or document creation failed:", error);
      alert("Error: Something went wrong. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const getFilteredDocuments = (): Document[] => {
    return userDocuments?.filter((doc: Document) => doc.document_type.id === docTypeId) || [];
  };

  const hasPendingDocuments = (): boolean => {
    return getFilteredDocuments().some((doc) => doc.current_version.status === "pending");
  };

  return (
    <div className="mb-6 p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">{title}</h2>

          {/* Loading Placeholder */}
          {isFetchingDocuments ? (
            <div className="space-y-3">

              <div className="animate-pulse flex flex-col gap-2">
                {/* Status Badge Placeholder */}
                <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ) : (
            // Render actual document data when loaded
            getFilteredDocuments().map((doc) => (
              <div key={doc.id} className="text-gray-600 text-sm flex flex-col gap-2">
                <p className="flex justify-start items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium  transition-all
                      ${doc.current_version.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-400"
                        : doc.current_version.status === "approved"
                          ? "bg-green-100 text-green-800 border border-green-400"
                          : doc.current_version.status === "rejected"
                            ? "bg-red-100 text-red-800 border border-red-400"
                            : "bg-gray-100 text-gray-800 border border-gray-400"
                      }`}
                  >
                    {doc.current_version.status}
                  </span>
                </p>

                <span>{doc.current_version.file.file_name}</span>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-2">
          {!hasPendingDocuments() && (
            <>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleUpload} />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors flex items-center gap-2"
              >
                <UploadIcon fontSize="small" />
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

};

export default function UploadDocuments() {
  const { data: docTypes, isLoading: isFetchingDocTypes } = useGetAllDocTypesQuery({
    offset: 0,
    limit: 100,
    include_archived: false,
  });

  const fileInputs: Record<string, MutableRefObject<HTMLInputElement | null>> = {
    passport: useRef(null),
    entity1: useRef(null),
    entity2: useRef(null),
    entity3: useRef(null),
    bank: useRef(null),
  };

  const [docTypeIds, setDocTypeIds] = useState<Record<string, string | null>>({
    passport: null,
    entity1: null,
    entity2: null,
    entity3: null,
    bank: null,
  });

  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    passport: false,
    entity1: false,
    entity2: false,
    entity3: false,
    bank: false,
  });

  useEffect(() => {
    if (docTypes?.items?.length) {
      console.log("Available Document Types:", docTypes.items.map(type => type.name));
  
      const updatedDocTypeIds = {
        passport: docTypes.items.find((type) => {
          console.log("Checking Passport:", type.name);
          return type.name.toLowerCase() === "passport";
        })?.id || null,
  
        entity1: docTypes.items.find((type) => {
          console.log("Checking Articles of Organization:", type.name);
          return type.name.toLowerCase() === "articles of organization";
        })?.id || null,
  
        entity2: docTypes.items.find((type) => {
          console.log("Checking Operating Agreement:", type.name);
          return type.name.toLowerCase() === "operating agreement";
        })?.id || null,
  
        entity3: docTypes.items.find((type) => {
          console.log("Checking Proof of EIN:", type.name);
          return type.name.toLowerCase() === "proof of ein";
        })?.id || null,
  
        bank: docTypes.items.find((type) => {
          console.log("Checking Bank Statements:", type.name);
          return type.name.toLowerCase() === "2 months most recent bank statements";
        })?.id || null,
      };
  
      console.log("Updated Document Type IDs:", updatedDocTypeIds);
      setDocTypeIds(updatedDocTypeIds);
    }
  }, [docTypes]);
  
  


  return (
    <div className="  p-2">
      <div className="max-w-3xl mx-auto  rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Upload Documents (Optional)</h1>
      <UploadStepDescription/>

        {/* Modern Skeleton Loader with Realistic Height */}
        {isFetchingDocTypes ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
              >
                <div className="flex flex-col gap-3 w-full">
                  {/* Title Placeholder */}
                  <div className="h-5 w-2/5 bg-gray-300 rounded"></div>

                  {/* Status Badge Placeholder */}
                  <div className="w-24 h-6 bg-gray-200 rounded-full"></div>

                  {/* File Name Placeholder */}
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                </div>

                {/* Upload Button Placeholder */}
                <div className="w-28 h-9 bg-gray-200 rounded-md"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
       
        
          {/* Passport Section */}
          <DocumentUploadSection
            title="Passport"
            docTypeId={docTypeIds.passport}
            fileInputRef={fileInputs.passport}
            isUploading={loadingStates.passport}
            setIsUploading={(state) => setLoadingStates((prev) => ({ ...prev, passport: state }))}
          />
        
          <hr className="border-t border-gray-300 my-4" />
        
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Entity Documents</h3>

          {/* Entity Documents */}
          <DocumentUploadSection
            title="Articles of Organization"
            docTypeId={docTypeIds.entity1}
            fileInputRef={fileInputs.entity1}
            isUploading={loadingStates.entity1}
            setIsUploading={(state) => setLoadingStates((prev) => ({ ...prev, entity1: state }))}
          />
          
          <DocumentUploadSection
            title="Operating Agreement"
            docTypeId={docTypeIds.entity2}
            fileInputRef={fileInputs.entity2}
            isUploading={loadingStates.entity2}
            setIsUploading={(state) => setLoadingStates((prev) => ({ ...prev, entity2: state }))}
          />
          
          <DocumentUploadSection
            title="Proof of EIN"
            docTypeId={docTypeIds.entity3}
            fileInputRef={fileInputs.entity3}
            isUploading={loadingStates.entity3}
            setIsUploading={(state) => setLoadingStates((prev) => ({ ...prev, entity3: state }))}
          />
        
          <hr className="border-t border-gray-300 my-4" />
        
          {/* Bank Statement Section */}
          <DocumentUploadSection
            title="Bank Statement"
            docTypeId={docTypeIds.bank}
            fileInputRef={fileInputs.bank}
            isUploading={loadingStates.bank}
            setIsUploading={(state) => setLoadingStates((prev) => ({ ...prev, bank: state }))}
          />
        </>
        
        )}
      </div>
    </div>
  );


}



const UploadStepDescription = () => {
  const pathname = usePathname();

  // Hide the message when on Dashboard > Profile > Documents
  if (pathname === "/dashboard/profile/documents") return null;

  return (
    <p className="text-sm text-gray-600 mb-4">
      Uploading documents is optional. You can skip this step and upload them later in your Dashboard <span className="text-blue-500">→</span> Profile <span className="text-blue-500">→</span> Documents.
    </p>
  );
};

