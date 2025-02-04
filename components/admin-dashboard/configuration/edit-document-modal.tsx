import {
  useGetDocumentByIdQuery,
  useUpdateDocumentMutation,
} from "@/store/admin-slice/documet-type-api";
import { UploadFileResponse } from "@/store/slice/fileSlices/apSlice";
import { Visibility, Delete } from "@mui/icons-material";
import { Button, IconButton, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Document {
  id: string;
  name: string;
  samples: string[];
  details: {
    name: string;
    structure: string;
  };
}

interface EditDocumentModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  document: Document;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedFiles: UploadFileResponse[];
  handleFileDelete: (index: number) => void;
}

const EditDocumentModal: React.FC<EditDocumentModalProps> = ({
  document = {
    id: "",
    name: "",
    samples: [],
    details: { name: "", structure: "" },
  },
  handleCloseModal,
  handleFileDelete,
  openModal,
  uploadedFiles,
  handleFileUpload,
  handleInputChange,
}) => {
  const { data, isLoading, isError } = useGetDocumentByIdQuery({
    include_archived: false,
    id: document.id,
  });

  const [updateDocument, { isLoading: IsUpdating, isError: UpdateError }] =
    useUpdateDocumentMutation();

  const [newDocument, setNewDocument] = useState<Document>({
    id: document.id,
    name: document.name,
    samples: document.samples,
    details: {
      name: document.details?.name,
      structure: document.details?.structure,
    },
  });

  useEffect(() => {
    if (data) {
      setNewDocument({
        id: data?.data?.id,
        name: data?.data?.name,
        samples: data?.data?.examples.map((example) => example.file_url),
        details: {
          name: data?.data?.document_name,
          structure: data?.data?.naming_structure,
        },
      });
    }
    console.log("data", data);
  }, [data]);
  useEffect(() => {
    setNewDocument({
      id: document.id,
      name: document.name,
      samples: document.samples,
      details: {
        name: document.details?.name,
        structure: document.details?.structure,
      },
    });
  }, []);

  const handleUpdateDocument = async () => {
    try {
      let updatePayload = {};
      if (newDocument.name) {
        updatePayload = { ...updatePayload, name: newDocument.name };
      }
      if (newDocument.details.name) {
        updatePayload = {
          ...updatePayload,
          document_name: newDocument.details.name,
        };
      }
      if (newDocument.details.structure) {
        updatePayload = {
          ...updatePayload,
          naming_structure: newDocument.details.structure,
        };
      }
      if (uploadedFiles.length > 0) {
        updatePayload = {
          ...updatePayload,
          user_file_ids: uploadedFiles.map((file) => file.file_id),
        };
      } else if (newDocument.samples.length > 0) {
        updatePayload = {
          ...updatePayload,
          user_file_ids: newDocument.samples,
        };
      }

      const response = await updateDocument({
        id: document.id,
        data: { ...updatePayload },
      }).unwrap();
      if (response) {
        toast.success("Document updated successfully!");

        handleCloseModal();
      } else {
        toast.error("Failed to update document.");
      }
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Error updating document.");
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      className="flex justify-center items-center"
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error fetching document</div>
      ) : (
        <div className="bg-white p-6 rounded shadow-lg w-1/3">
          <h2 className="text-lg font-semibold mb-4">Update Document</h2>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={document?.name || ""}
              onChange={(e) =>
                setNewDocument({ ...newDocument, name: e.target.value })
              }
              placeholder="Enter document name"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Document Name</label>
            <input
              type="text"
              name="documentName"
              defaultValue={document?.details.name || ""}
              onChange={(e) =>
                setNewDocument({
                  ...newDocument,
                  details: { ...document?.details, name: e.target.value },
                })
              }
              placeholder="Enter document name"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Naming Structure</label>
            <input
              type="text"
              name="namingStructure"
              defaultValue={document?.details.structure || ""}
              onChange={(e) =>
                setNewDocument({
                  ...newDocument,
                  details: {
                    ...document?.details,
                    structure: e.target.value,
                  },
                })
              }
              placeholder="Enter naming structure"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload Documents</label>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="w-full border p-2 rounded"
            />
            <div className="mt-4 space-y-2">
              {document?.samples?.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border p-2 rounded bg-gray-100"
                >
                  <span>Sample Documents</span>
                  <div className="flex space-x-2">
                    <IconButton onClick={() => console.log(`View ${file}`)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleFileDelete(index)}>
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              variant="contained"
              onClick={handleCloseModal}
              className="bg-gray-300 text-black"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="bg-blue-500 text-white"
              onClick={handleUpdateDocument}
            >
              {IsUpdating ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditDocumentModal;
