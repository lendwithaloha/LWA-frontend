"use client";

import { Modal, Box, IconButton } from "@mui/material";
import { Download } from "@mui/icons-material";
import { EyeIcon as Eye, XCircleIcon } from "@heroicons/react/20/solid";

interface RevisionEntry {
  date: string;
  documentName: string;
  status: string;
  reason?: string;
}

interface RevisionHistoryModalProps {
  open: boolean;
  onClose: () => void;
  revisions: RevisionEntry[];
}

export function RevisionHistoryModal({
  open,
  onClose,
  revisions,
}: RevisionHistoryModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="revision-history-modal"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-3/4 lg:max-w-2xl bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-lg sm:text-xl font-medium">
              Document Revision History
            </h2>
          </div>
          <IconButton onClick={onClose}>
            <XCircleIcon className="size-8" />
          </IconButton>
        </div>

        <div className="max-h-[500px] sm:max-h-[600px] overflow-y-auto p-4 space-y-4">
          {revisions.map((revision, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg space-y-3 bg-gray-50"
            >
              <div className="text-sm text-gray-500">{revision.date}</div>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="h-10 w-10 rounded-lg border border-gray-200 p-2 text-gray-400 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex gap-8 max-sm:gap-3 min-w-0">
                  <div className="flex flex-col  items-start ">
                    <p className="font-medium">{revision.documentName}</p>
                    {revision.reason && (
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-gray-200 text-gray-600">
                        Rejected
                      </span>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button className="bg-gray-300 rounded px-2 ">
                        <Eye className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="bg-gray-300 rounded p-2 ">
                        <Download className="size-6  text-gray-500" />
                      </button>
                    </div>
                  </div>
                  {revision.reason && (
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Reason: </span>
                      {revision.reason}
                    </p>
                  )}
                  {!revision.reason && (
                    <span className="text-gray-600">{revision.status} ...</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  );
}
