import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "@/utils/custom-base-query";

// Define TypeScript interfaces
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

interface GetAllDocTypesResponse {
  items: DocumentType[]; // ✅ API returns { items: [...] }, not a direct array
}

export interface UploadFileResponse {
  file_id: string;
  file_name: string;
  message: string;
  // url: string;
  preview_url: string;
}

interface CreateDocumentRequest {
  document_type_id: string;
  user_file_id: string;
}

interface CreateDocumentResponse {
  id: string;
  current_version: {
    id: string;
    file: {
      id: string;
      file_url: string;
      file_type: string;
      file_name: string;
      preview_url: string;
    };
    feedback: string;
    status: string;
  };
}

// ✅ API Slice
export const documentApi = createApi({
  reducerPath: "documentApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // ✅ Upload File (Single File Upload)
    uploadFile: builder.mutation<UploadFileResponse, Blob>({
      query: (file) => {
        const formData = new FormData();
        formData.append("data", file);

        return {
          url: "storage/upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    // ✅ Get All Document Types with Pagination Support
    getAllDocTypes: builder.query<GetAllDocTypesResponse, { offset: number; limit: number; include_archived: boolean }>({
      query: ({ offset = 0, limit = 100, include_archived = false }) => 
        `document-types/all?limit=${limit}&offset=${offset}&include_archived=${include_archived}`,
      transformResponse: (response: any) => {
        if (!response?.items) {
          throw new Error("Invalid API response: missing 'items' array");
        }
        return response;
      },
    }),

    // ✅ Create Document
    createDocument: builder.mutation<CreateDocumentResponse, CreateDocumentRequest>({
      query: ({ document_type_id, user_file_id }) => ({
        url: "document/create",
        method: "POST",
        body: JSON.stringify({ document_type_id, user_file_id }),
        headers: { "Content-Type": "application/json" },
      }),
    }),

    // ✅ Get User Documents
    getUserDocuments: builder.query<any, void>({
      query: () => "document/get_documents",
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetAllDocTypesQuery,
  useCreateDocumentMutation,
  useGetUserDocumentsQuery,
} = documentApi;
