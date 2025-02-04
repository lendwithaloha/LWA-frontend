import React, { useState } from "react";
import {

  Typography,
  Box,
  Modal,
  Button,
  Divider,
} from "@mui/material";
import SubmittedComponent from "../tabs/submit-component";
import PendingComponent from "../tabs/pending-compoents";

type FilterType = "pending" | "approved" | "all";

type CustomDocument = {
  label: string;
  requirements: string[];
  submittedDate: string;
  status: "Pending" | "Approved" | "Feedback Given";
};

// type Quote = {
//   version: string;
//   quoteName: string;
//   date: string;
//   showRequestButton: boolean;
// };

const QuoteBoard = ({
  handleHistory,
}: {
  handleHistory: (doc: CustomDocument) => void;
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("pending");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const documentDetails: CustomDocument[] = [
    {
      label: "Property Insurance",
      requirements: ["Requirement 1", "Requirement 2"],
      submittedDate: "Jan 23, 2024",
      status: "Approved",
    },
    {
      label: "Proof of Income",
      requirements: ["Pay Stub", "Tax Return"],
      submittedDate: "Jan 23, 2024",
      status: "Approved",
    },
    {
      label: "Renovation Estimates or Plans",
      requirements: ["Plans PDF"],
      submittedDate: "Jan 23, 2024",
      status: "Pending",
    },
    {
      label: "Property Address details",
      requirements: ["Signed Document"],
      submittedDate: "Jan 23, 2024",
      status: "Pending",
    },
  ];

  const submittedDocuments = documentDetails.filter(
    (doc) => doc.status === "Approved"
  );

  const pendingDocuments = documentDetails.filter(
    (doc) => doc.status === "Pending"
  );

  return (
    <div className="p-3 bg-gray-100 rounded">
      <div className="flex justify-between mb-5">
        <div className="flex gap-1">
          <p>Required Items</p>
          <span className="bg-black text-white p-2 rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {documentDetails.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm">
            {submittedDocuments.length}/{documentDetails.length} submitted
          </p>
          <Button
            variant="contained"
            className="text-sm"
            onClick={() => setDrawerOpen(true)}
          >
            Upload all Documents
          </Button>
        </div>
      </div>
      <Divider />

      <div className="flex flex-wrap items-center justify-between gap-4 my-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter("pending")}
            className={`px-4 py-1 rounded-2xl border border-black text-[12px] ${
              activeFilter === "pending"
                ? "bg-gray-900 text-white border-2"
                : "hover:bg-gray-50"
            }`}
          >
            Pending
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-900 text-white rounded-full">
              {pendingDocuments.length}
            </span>
          </button>
          <button
            onClick={() => setActiveFilter("approved")}
            className={`px-8 py-1 rounded-3xl text-[12px] border-black ${
              activeFilter === "approved"
                ? "bg-gray-900 text-white"
                : " border-2 hover:bg-gray-50"
            }`}
          >
            Submitted
          </button>
        </div>
      </div>

      {activeFilter === "pending" ? (
        <PendingComponent data={pendingDocuments} />
      ) : (
        <SubmittedComponent
          data={submittedDocuments}
          hanldeView={() => setIsModalOpen(true)}
          handleHistory={(doc: CustomDocument) => handleHistory(doc)}
        />
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {previewFile ? (
            <iframe
              src={previewFile}
              title="File Preview"
              width="100%"
              height="400px"
              style={{ border: "none" }}
            ></iframe>
          ) : (
            <Typography variant="body1">No file to preview</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default QuoteBoard;
