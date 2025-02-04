"use client";

import { useState } from "react";
import {
  ArrowDownward as ChevronDown,
  ArrowUpward as ChevronUp,
  Download,
  History as Trash2,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { Select, MenuItem, IconButton, TextField } from "@mui/material";
import { EyeIcon as Eye } from "@heroicons/react/20/solid";

import { Document } from "./types";
import { RevisionHistoryModal } from "./revision-history-modal";

interface DocumentSectionProps {
  title: string;
  documents: Document[];
  onStatusChange: (id: string, status: string) => void;
}

export function DocumentSection({
  title,
  documents,
  onStatusChange,
}: DocumentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  // const [selectedDocument, setSelectedDocument] = useState<Document | null>(
  //   null
  // );
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(
    null
  );
  const [editReason, setEditReason] = useState("");

  const sampleRevisions = [
    {
      date: "Jan 24, 2024",
      documentName: "Document_name.pdf",
      status: "Pending",
    },
    {
      date: "Jan 24, 2024",
      documentName: "Document_name.pdf",
      status: "Pending",
    },
    {
      date: "Jan 24, 2024",
      documentName: "Document_name.pdf",
      status: "Pending",
    },
    {
      date: "Jan 24, 2024",
      documentName: "Document_name.pdf",
      status: "Rejected",
      reason:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    },
  ];

  const handleEditClick = (doc: Document) => {
    setEditingDocumentId(doc.id);
    setEditReason(doc.reason || "");
  };

  const handleSaveClick = (docId: string) => {
    const updatedDocument = documents.find((doc) => doc.id === docId);
    if (updatedDocument) {
      updatedDocument.reason = editReason;
      onStatusChange(docId, updatedDocument.status);
    }
    setEditingDocumentId(null);
  };

  const handleRevisionHistoryClick = (document: Document) => {
    //  setSelectedDocument(document);
    console.log(document);
    setIsRevisionModalOpen(true);
  };

  return (
    <div className="rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
      >
        <h2 className="text-lg font-medium">{title}</h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div>
          {documents.map((doc) => (
            <div key={doc.id} className="border-b last:border-b-0">
              <div className="flex flex-col md:flex-row justify-between items-center p-4 max-md:items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg border-gray-200 p-2 text-gray-400">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className="w-full h-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-sm md:text-base break-all">
                    {doc.name}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 mt-3 md:mt-0">
                  <Select
                    value={doc.status}
                    onChange={(e) => onStatusChange(doc.id, e.target.value)}
                    size="small"
                    className="min-w-[120px]"
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                  <div className="flex space-x-2">
                    <IconButton size="small">
                      <Eye className="w-5 h-5 text-gray-500" />
                    </IconButton>
                    <IconButton size="small">
                      <Download className="w-5 h-5 text-gray-500" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleRevisionHistoryClick(doc)}
                    >
                      <Trash2 className="w-5 h-5 text-gray-500" />
                    </IconButton>
                  </div>
                </div>
              </div>
              {doc.status === "Rejected" && (
                <div className="bg-gray-50 px-4 py-3">
                  {editingDocumentId === doc.id ? (
                    <div className="flex items-center space-y-2 md:space-y-0 md:space-x-2">
                      <TextField
                        fullWidth
                        size="small"
                        value={editReason}
                        onChange={(e) => setEditReason(e.target.value)}
                      />
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleSaveClick(doc.id)}
                      >
                        <SaveIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <div className="flex  justify-between items-center">
                      <p className="text-sm text-gray-600 break-all">
                        <span className="font-medium">Reason: </span>
                        {doc.reason ||
                          "No reason provided. Click edit to add a reason."}
                      </p>
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(doc)}
                      >
                        <EditIcon className="w-5 h-5 text-gray-500" />
                      </IconButton>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <RevisionHistoryModal
        open={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
        revisions={sampleRevisions}
      />
    </div>
  );
}
