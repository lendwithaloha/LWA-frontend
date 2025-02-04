"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Backdrop,
  IconButton,
  Collapse,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import {
  Add,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Delete,
  Visibility,
  Download,
} from "@mui/icons-material";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import { z } from "zod";
import { MdPictureAsPdf } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";

import {
  useAddDocumentMutation,
  useArchiveDocumentMutation,
  useDeleteDocumentMutation,
  useGetDocumentsQuery,
  useUpdateDocumentMutation,
} from "@/store/admin-slice/documet-type-api";
import { UploadFileResponse } from "@/store/slice/fileSlices/apSlice";
import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";

import { useUploadFileMutation } from "@/store/slice/application/application-sclice";
import FilePreviewModal from "@/components/file-preview-modal";

import EditDocumentModal from "@/components/admin-dashboard/configuration/edit-document-modal";
const DocumentTypeSchema = z.object({
  name: z.string().min(2).max(50),
  document_name: z.string().min(2).max(50),
  naming_structure: z.string().min(2),
  user_file_ids: z.array(z.string()),
});

export default function DocumentPage() {
  const [openModal, setOpenModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFileResponse[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [activeDoc, setActiveDoc] = useState<Document>({
    id: "",
    name: "",
    samples: [],
    details: { name: "", structure: "" },
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { data, isLoading, isError } = useGetDocumentsQuery({
    limit: rowsPerPage,
    offset: page * rowsPerPage,
  });
  const [uploadFile, { isLoading: IsUploading }] = useUploadFileMutation();
  const [addDocument, { isLoading: isAdding }] = useAddDocumentMutation();
  const [editedDocument, { isLoading: isUpdating, isError: IsUploadError }] =
    useUpdateDocumentMutation();

  const [archiveDocument, { isLoading: isArchiving }] =
    useArchiveDocumentMutation();
  const [deleteDocument, { isLoading: isDeleting }] =
    useDeleteDocumentMutation();

  const handlePreview = (url: string) => {
    setPreviewFile(url);
  };
  console.log(data, isLoading, isError, "values");
  const [formData, setFormData] = useState({
    name: "",
    documentName: "",
    namingStructure: "",
  });
  //   const [addDocument, {  , isError, isSuccess, error }] =
  //     useAddDocumentMutation();
  interface Document {
    id: string;
    name: string;
    samples: string[];
    details: {
      name: string;
      structure: string;
    };
  }

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setFormData({ name: "", documentName: "", namingStructure: "" });
    setActiveDoc({
      id: "",
      name: "",
      samples: [],
      details: { name: "", structure: "" },
    });
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({ name: "", documentName: "", namingStructure: "" });
    setUploadedFiles([]);
  };
  const toggleRowExpand = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files?.length === 1) {
      const response = await uploadFile(files[0]).unwrap();
      if (response.file_id) {
        setUploadedFiles([response]);
      } else {
        throw new Error("File ID is missing in the response");
      }
    }
  };

  const handleFileDelete = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };
  const handleDeleteDoc = async (id: string) => {
    const response = await archiveDocument(id);

    if (!response.error) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      toast.success("Document Archived successfully");
    } else {
      toast.error("Failed to delete document");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDocument = async () => {
    if (!formData.name || !formData.documentName || !formData.namingStructure) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const data = DocumentTypeSchema.safeParse({
        name: formData.name,
        document_name: formData.documentName,
        naming_structure: formData.namingStructure,
        user_file_ids: uploadedFiles.map((file) => file.file_id),
      });

      if (data.success) {
        const response = await addDocument(data.data).unwrap();
        if (response) {
          toast.success("Document added successfully");
          const newDocument = {
            id: response.id,
            name: response.name,
            samples: uploadedFiles.map((file) => file.preview_url),
            details: {
              name: response.document_name,
              structure: response.naming_structure,
            },
          };
          setDocuments([...documents, newDocument]);
        } else {
          toast.error("Invalid data");
        }
      } else {
        toast.error("Invalid data");
      }
    } catch (error) {}

    handleCloseModal();
  };

  const handleEditDocument = async (doc: Document) => {
    setActiveDoc(doc);
    setEditModalOpen(true);
  };

  useEffect(() => {
    if (data && data.data) {
      const formattedDocs = data.data.map((doc) => ({
        id: doc.id,
        name: doc.name,
        samples: doc.examples.map((example) => example.preview_url),
        details: {
          name: doc.document_name,
          structure: doc.naming_structure,
        },
      }));
      setDocuments(formattedDocs);
    }
  }, [data, activeDoc]);

  return (
    <div className="p-6">
      {/* Top Actions */}
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search documents"
          className="border p-2 rounded w-1/3"
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-700 text-white"
        >
          Add Document
        </Button>
      </div>

      {/* Table */}
      <Table className="table-auto w-full border">
        <TableHead>
          <TableRow>
            <TableCell>Document Name</TableCell>
            <TableCell>Sample Documents</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="h-40">
                <div className="flex justify-center items-center h-full">
                  <CircularProgress />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            documents.map((doc, index) => (
              <React.Fragment key={index}>
                <TableRow className="border-t">
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {doc.samples.map((sample: string, i: number) => {
                        const isImage =
                          sample.match(/\.(jpeg|jpg|gif|png)$/) != null;
                        const isPdforHtml =
                          sample.match(/\.(pdf|html)$/) != null;
                        return (
                          <div key={i} className="flex items-center space-x-2">
                            {isImage ? (
                              <IconButton onClick={() => handlePreview(sample)}>
                                <Image
                                  src={sample}
                                  alt={`Sample ${i + 1}`}
                                  width={50}
                                  height={50}
                                  className="border"
                                />
                              </IconButton>
                            ) : (
                              <IconButton onClick={() => handlePreview(sample)}>
                                {isPdforHtml ? (
                                  <MdPictureAsPdf className="text-gray-700 size-6" />
                                ) : (
                                  <RiFileExcel2Line className="text-gray-700 size-6" />
                                )}
                              </IconButton>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditDocument(doc)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteDoc(doc.id)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => toggleRowExpand(index)}>
                        {expandedRow === index ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} style={{ padding: 0 }}>
                    <Collapse
                      in={expandedRow === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div className="p-4 border-t bg-gray-50 flex flex-col gap-2">
                        <div className="flex flex-col">
                          <span>Name:</span>
                          <span> {doc.details.name}</span>
                        </div>
                        <div className="flex flex-col">
                          <span>Naming Structure:</span>
                          <span>{doc.details.structure}</span>
                        </div>
                      </div>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={data?.meta_data?.total || 0} // Total number of documents
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0); // Reset to the first page
        }}
      />
      <FilePreviewModal
        previewFile={previewFile}
        onClose={() => setPreviewFile(null)}
      />
      {/* Add Document Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className="flex justify-center items-center"
      >
        <div className="bg-white p-6 rounded shadow-lg w-1/3">
          <h2 className="text-lg font-semibold mb-4">Add Document</h2>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Document Name</label>
            <input
              type="text"
              name="documentName"
              value={formData.documentName}
              onChange={handleInputChange}
              placeholder="Enter document name"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Naming Structure</label>
            <input
              type="text"
              name="namingStructure"
              value={formData.namingStructure}
              onChange={handleInputChange}
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
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border p-2 rounded bg-gray-100"
                >
                  <span>{file.message}</span>
                  <div className="flex space-x-2">
                    <IconButton
                      onClick={() => console.log(`View ${file.preview_url}`)}
                    >
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
              onClick={handleAddDocument}
            >
              Add
            </Button>
          </div>
        </div>
      </Modal>

      {/*Edit Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className="flex justify-center items-center"
      >
        <div className="bg-white p-6 rounded shadow-lg w-1/3">
          <h2 className="text-lg font-semibold mb-4">Add Document</h2>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Document Name</label>
            <input
              type="text"
              name="documentName"
              value={formData.documentName}
              onChange={handleInputChange}
              placeholder="Enter document name"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Naming Structure</label>
            <input
              type="text"
              name="namingStructure"
              value={formData.namingStructure}
              onChange={handleInputChange}
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
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border p-2 rounded bg-gray-100"
                >
                  <span>{file.message}</span>
                  <div className="flex space-x-2">
                    <IconButton
                      onClick={() => console.log(`View ${file.preview_url}`)}
                    >
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
              onClick={handleAddDocument}
            >
              {isAdding ? <CircularProgress /> : "Add"}
            </Button>
          </div>
        </div>
      </Modal>

      <EditDocumentModal
        handleFileUpload={handleFileUpload}
        uploadedFiles={uploadedFiles}
        openModal={editModalOpen}
        handleInputChange={handleInputChange}
        document={activeDoc || ({} as Document)}
        handleFileDelete={handleFileDelete}
        handleCloseModal={handleCloseEditModal}
      />
    </div>
  );
}
