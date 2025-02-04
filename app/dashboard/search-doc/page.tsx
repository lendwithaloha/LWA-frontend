"use client";
import { useState } from "react";
import { useGetAllDocTypesQuery } from "@/store/slice/user/searchDocumentTypeApi";

// Define TypeScript interfaces for API response
interface DocumentExample {
  id: string;
  file_url: string;
  file_type: string;
  file_name: string;
  preview_url: string;
}

interface DocumentType {
  id: string;
  name: string;
  naming_structure: string;
  is_archived: boolean;
  examples: DocumentExample[];
}

export default function SearchDocuments() {
  const [search, setSearch] = useState<string>("");

  // Fetch all documents using RTK Query
  const { data, isLoading, isError } = useGetAllDocTypesQuery({
    offset: 0,
    limit: 100,
    include_archived: false,
  });

  // Ensure we have valid data
  const allDocuments: DocumentType[] = data?.items || [];

  // Client-side filtering
  const filteredDocs: DocumentType[] = allDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.naming_structure.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Search Document Types
        </h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or naming structure..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Loading State */}
        {isLoading && <p className="mt-4 text-blue-500">Loading...</p>}

        {/* Error State */}
        {isError && <p className="mt-4 text-red-500">Error fetching data. Unauthorized?</p>}

        {/* Results */}
        {filteredDocs.length > 0 ? (
          <ul className="mt-6 space-y-4">
            {filteredDocs.map((doc) => (
              <li
                key={doc.id}
                className="p-4 bg-gray-50 border border-gray-300 rounded-lg"
              >
                <h2 className="text-lg font-semibold text-gray-700">{doc.id}</h2>
                <h2 className="text-lg font-semibold text-gray-700">{doc.name}</h2>
                <p className="text-gray-500 text-sm">
                  Naming Structure: {doc.naming_structure}
                </p>
                {/* Examples */}
                {doc.examples.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-600">Examples:</p>
                    <ul className="list-disc list-inside text-gray-500">
                      {doc.examples.map((ex) => (
                        <li key={ex.id} className="text-sm">
                          <a
                            href={ex.preview_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {ex.file_name} ({ex.file_type})
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          !isLoading && search && <p className="mt-4 text-gray-600">No results found.</p>
        )}
      </div>
    </div>
  );
}
