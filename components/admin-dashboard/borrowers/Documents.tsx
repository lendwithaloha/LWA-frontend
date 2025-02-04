"use client";

import { useState } from "react";

import {
  Document,
  DocumentSection as DocumentSectionType,
} from "./document/types";
import { DocumentHeader } from "./document/document-header";
import { StatusPills } from "./document/stats-pill";
import { DocumentSection } from "./document/document-section";
import { RequestDocumentModal } from "./document/request-document-modal";

const initialSections: DocumentSectionType[] = [
  {
    title: "Entity Documents",
    documents: [
      {
        id: "1",
        name: "document.pdf",
        status: "Rejected",
        reason: "Missing information",
      },
      { id: "2", name: "document.pdf", status: "Pending" },
      { id: "3", name: "document.pdf", status: "Pending" },
    ],
  },
  {
    title: "Bank Statements",
    documents: [
      { id: "4", name: "statement.pdf", status: "Pending" },
      { id: "5", name: "statement.pdf", status: "Approved" },
    ],
  },
];

export default function DocumentsComponent() {
  const [sections, setSections] = useState(initialSections);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate counts based on current documents
  const counts = [
    {
      status: "All",
      count: sections.reduce(
        (acc, section) => acc + section.documents.length,
        0
      ),
    },
    {
      status: "Pending",
      count: sections.reduce(
        (acc, section) =>
          acc +
          section.documents.filter((doc) => doc.status === "Pending").length,
        0
      ),
    },
    {
      status: "Approved",
      count: sections.reduce(
        (acc, section) =>
          acc +
          section.documents.filter((doc) => doc.status === "Approved").length,
        0
      ),
    },
  ];

  const handleStatusChange = (documentId: string, newStatus: string) => {
    setSections(
      sections.map((section) => ({
        ...section,
        documents: section.documents.map((doc) =>
          doc.id === documentId
            ? { ...doc, status: newStatus as Document["status"] }
            : doc
        ),
      }))
    );
  };

  const handleDocumentRequest = (data: {
    name: string;
    category: string;
    requirements: string[];
  }) => {
    const newDocument: Document = {
      id: crypto.randomUUID(),
      name: data.name,
      status: "Pending",
    };

    setSections(
      sections.map((section) => {
        if (
          (data.category === "entity" &&
            section.title === "Entity Documents") ||
          (data.category === "bank" && section.title === "Bank Statements")
        ) {
          return {
            ...section,
            documents: [...section.documents, newDocument],
          };
        }
        return section;
      })
    );
  };

  const filteredSections = sections.map((section) => ({
    ...section,
    documents: section.documents.filter((doc) => {
      const matchesSearch = doc.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === "All" || doc.status === selectedStatus;
      return matchesSearch && matchesStatus;
    }),
  }));

  return (
    <main className="mx-auto max-w-full p-4 flex-1 md:max-w-5xl md:p-6 space-y-6">
      <DocumentHeader
        onSearch={setSearchQuery}
        onRequestDocument={() => setIsModalOpen(true)}
      />
      <StatusPills
        counts={counts}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      <div className="space-y-4">
        {filteredSections.map((section) => (
          <DocumentSection
            key={section.title}
            title={section.title}
            documents={section.documents}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
      <RequestDocumentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDocumentRequest}
      />
    </main>
  );
}
