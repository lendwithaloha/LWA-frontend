"use client";

import { useState } from "react";
import { Filter, Sort as SortAsc } from "@mui/icons-material";
import Image from "next/image";
import {  Button, Divider,  } from "@mui/material";
import QuoteComparison from "./common/QouteComparison";
import DocumentsDetailView from "./common/documents-detail-view";
import DocumentQuoteOpen from "./common/document-qoute-open";
import ViewQuoteModal from "./modal/view-quote-modal";
interface Quote {
  id: number;
  version: string;
  documents: number;
  status?: string;
}
export default function QuotesPage() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "new" | "revisions"
  >("all");
  const [selectedQuotes, setSelectedQuotes] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<Quote>({
    documents: 0,
    id: 0,
    version: "",
    status: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const quotes = [
    { id: 1, version: "1.0", status: "Accepted Quote", documents: 3 },
    { id: 2, version: "1.0", documents: 5 },

    { id: 3, version: "1.1", documents: 2 },
    { id: 4, version: "2.0", documents: 4 },
    { id: 5, version: "1.2", status: "Accepted Quote", documents: 1 },
  ];

  const filterCounts = {
    all: 4,
    new: 4,
    revisions: 4,
  };

  const acceptedQuotes = quotes.filter(
    (quote) => quote.status === "Accepted Quote"
  );

  const handleQuoteSelection = (quoteId: number) => {
    setSelectedQuotes((prev) =>
      prev.includes(quoteId)
        ? prev.filter((id) => id !== quoteId)
        : [...prev, quoteId]
    );
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOnBack = () => {
    setClick(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleViewDetials = (selectedItem: Quote) => {
    setOpen(true);
    setSelectedItem(selectedItem);
  };

  if (click) {
    return <DocumentsDetailView onBack={handleOnBack} />;
  }
  if (open) {
    return <DocumentQuoteOpen quotes={selectedItem} onBack={handleClose} />;
  }
  return (
    <div className="max-w-[1200px] mx-auto p-6">
      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {["all", "new", "revisions"].map((filter) => (
            <button
              key={filter}
              onClick={() =>
                setSelectedFilter(filter as "all" | "new" | "revisions")
              }
              className={`px-4 py-1 text-xs rounded-3xl flex items-center gap-2 ${
                selectedFilter === filter
                  ? "bg-black text-white"
                  : "bg-white border border-black hover:bg-gray-50"
              }`}
            >
              {filter === "all"
                ? "All Quotes"
                : filter === "new"
                ? "New"
                : "Requested Revisions"}
              <span
                className={`px-1.5 py-0.5 text-xs rounded-full ${
                  selectedFilter === filter
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
              >
                {filterCounts[filter as keyof typeof filterCounts]}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex my-5 justify-end">
        <div className="flex items-center gap-4 ">
          <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <Filter className="w-5 h-5" />
            Filter
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            Sort By
            <SortAsc className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-handwriting text-lg">Select quotes to compare</h1>
        {/* <button
          className="px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-gray-800 font-handwriting disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedQuotes.length < 2}
          onClick={() => setCompareModalOpen(true)}
        >
          Compare ({selectedQuotes.length})
        </button> */}
        <div>
          <QuoteComparison />
          <button></button>
        </div>
      </div>

      {/* Filters */}

      <div className="p-3 bg-gray-200 rounded-lg my-6">
        <h1>Accepted Qoutes</h1>
        {acceptedQuotes.map((quote) => (
          <div key={quote.id}>
            <div className="flex items-center gap-4 p-4">
              <div
                className="flex items-center gap-4 flex-1  cursor-pointer"
                onClick={() => setClick(true)}
              >
                <Image
                  src="/images/loan-icon.png"
                  alt="File Icon"
                  width={50}
                  height={50}
                />
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">Quote {quote.id}</h3>
                    <span className="px-2 py-0.5 bg-primaryColor text-white text-xs rounded-full">
                      v{quote.version}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {quote.documents} attached documents
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-2 flex-col">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={selectedQuotes.includes(quote.id)}
                    onChange={() => handleQuoteSelection(quote.id)}
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded transition-colors ${
                      selectedQuotes.includes(quote.id)
                        ? "bg-gray-900 border-gray-900"
                        : "border-gray-300 peer-hover:border-gray-400"
                    }`}
                  >
                    {selectedQuotes.includes(quote.id) && (
                      <svg
                        className="w-4 h-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </label>
                <div className="flex gap-2">
                  {" "}
                  <Button
                    variant="outlined"
                    onClick={() => setIsModalOpen(true)}
                  >
                    view quote
                  </Button>
                  <button
                    className="px-4 py-1 bg-primaryColor text-white rounded transition-colors"
                    onClick={() => handleViewDetials(quote)}
                  >
                    view details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Divider />
      {/* Quotes List */}
      <div className="space-y-4">
        {quotes.map(
          (quote) =>
            quote.status !== "Accepted Quote" && (
              <div key={quote.id}>
                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                  <div
                    className="flex items-center gap-4 flex-1  cursor-pointer"
                    onClick={() => setClick(true)}
                  >
                    <Image
                      src="/images/loan-icon.png"
                      alt="File Icon"
                      width={50}
                      height={50}
                    />
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">Quote {quote.id}</h3>
                        <span className="px-2 py-0.5 bg-primaryColor text-white text-xs rounded-full">
                          v{quote.version}
                        </span>
                        {quote.status && (
                          <span className="px-3 py-1 text-xs text-gray-100 bg-gray-600 rounded-full">
                            {quote.status}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {quote.documents} attached documents
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 flex-col">
                    <label className="relative flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={selectedQuotes.includes(quote.id)}
                        onChange={() => handleQuoteSelection(quote.id)}
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded transition-colors ${
                          selectedQuotes.includes(quote.id)
                            ? "bg-gray-900 border-gray-900"
                            : "border-gray-300 peer-hover:border-gray-400"
                        }`}
                      >
                        {selectedQuotes.includes(quote.id) && (
                          <svg
                            className="w-4 h-4 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </label>
                    <div className="flex gap-2">
                      {" "}
                      <Button
                        variant="outlined"
                        onClick={() => setIsModalOpen(true)}
                      >
                        view quote
                      </Button>
                      <button
                        className="px-4 py-1 bg-primaryColor text-white rounded transition-colors"
                        onClick={() => handleViewDetials(quote)}
                      >
                        view details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      <ViewQuoteModal
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
      />
    </div>
  );
}
