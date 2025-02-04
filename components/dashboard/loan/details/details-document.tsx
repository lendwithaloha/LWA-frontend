"use client";

import { useState } from "react";
import {
  Filter,
  SortRounded as SortAsc,
  SortRounded as SortDesc,
} from "@mui/icons-material";
import { Button } from "@mui/material";

import DocumentUploadDrawer from "./common/DocumentUploadDrawer";
import DocumentsDetailView from "./common/documents-detail-view";

import PendingComponent from "./tabs/pending-compoents";
import SubmittedComponent from "./tabs/submit-component";
import QuoteOpenHistory from "./tabs/quote-open-history";

type FilterType = "pending" | "approved";
type SortOrder = "asc" | "desc";

type CustomDocument = {
  label: string;
  requirements: string[];
  submittedDate: string; // Allows null for documents not yet submitted
  status: "Pending" | "Approved" | "Feedback Given";
};

export default function DetailsDocument() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("pending");
  // const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [history, setHistory] = useState<boolean>(false);
  const [selectedDoc, setSelectedDocs] = useState<CustomDocument>();

  // Example dynamic data for document details
  const documentDetails: CustomDocument[] = [
    {
      label: "Property Insurance",
      requirements: ["Requirement 1", "Requirement 2"],
      submittedDate: "Jan 23, 2024",
      status: "Feedback Given",
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
      submittedDate: "",
      status: "Pending",
    },
    {
      label: "Property Address details",
      requirements: ["Signed Document"],
      submittedDate: "",
      status: "Pending",
    },
    {
      label: "Tax Return",
      requirements: ["Tax Document"],
      submittedDate: "Jan 18, 2024",
      status: "Approved",
    },
    {
      label: "Bank Statement",
      requirements: ["6-Month Statement"],
      submittedDate: "",
      status: "Pending",
    },
  ];

  const handleOnBack = () => {
    setClicked(false);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Filter and sort the document details dynamically
  const filteredDocuments: CustomDocument[] = documentDetails
    .filter((doc) => {
      const matchesFilter =
        activeFilter === "pending"
          ? doc.status.toLowerCase() === "pending"
          : doc.status.toLowerCase() === "approved";
      const matchesSearch = doc.label
        .toLowerCase()
        .includes("searchTerm".toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      const labelA = a.label.toLowerCase();
      const labelB = b.label.toLowerCase();
      if (sortOrder === "asc") {
        return labelA.localeCompare(labelB);
      }
      return labelB.localeCompare(labelA);
    });

  const totalPending = documentDetails.filter(
    (doc) => doc.status.toLowerCase() === "pending"
  ).length;
  const totalApproved = documentDetails.filter(
    (doc) => doc.status.toLowerCase() === "approved"
  ).length;

  if (clicked) {
    return <DocumentsDetailView onBack={handleOnBack} />;
  }
  const handleHistory = (selectedDoc: CustomDocument) => {
    setSelectedDocs(selectedDoc);
    setHistory(true);
  };
  if (history && selectedDoc) {
    return (
      <QuoteOpenHistory
        data={{
          documents: 0,
          id: 0,
          version: "",
        }}
        document={selectedDoc}
        onBack={() => setHistory(false)}
      />
    );
  }

  return (
    <div className="bg-gray-100 shadow-sm w-full">
      <div className="p-6">
        <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-start justify-between">
          <div>
            <h3 className="font-handwriting text-lg mb-2">
              Upload Required Documents
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              You have outstanding documents that need to be submitted.
            </p>
          </div>
          <Button
            variant="contained"
            className="bg-primaryColor"
            onClick={() => setDrawerOpen(true)}
          >
            Upload Documents
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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
                {totalPending}
              </span>
            </button>
            <button
              onClick={() => setActiveFilter("approved")}
              className={`px-8 py-1 rounded-3xl text-[12px] border-black ${
                activeFilter === "approved"
                  ? "bg-gray-900 text-white"
                  : "border hover:bg-gray-50"
              }`}
            >
              Submitted
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-900 text-white rounded-full">
                {totalApproved}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
              <Filter className="w-5 h-5" />
              Filter
            </button>
            <button
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900"
              onClick={toggleSortOrder}
            >
              <span>Sort By</span>
              {sortOrder === "asc" ? (
                <SortAsc className="w-5 h-5" />
              ) : (
                <SortDesc className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {activeFilter === "pending" ? (
            <PendingComponent data={filteredDocuments} />
          ) : (
            <SubmittedComponent
              data={filteredDocuments}
              hanldeView={() => setClicked(true)}
              handleHistory={(doc: CustomDocument) => handleHistory(doc)}
            />
          )}
        </div>
      </div>
      <DocumentUploadDrawer
        documents={documentDetails}
        drawerOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
