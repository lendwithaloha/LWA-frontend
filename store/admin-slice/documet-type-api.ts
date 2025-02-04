import customBaseQuery from "@/utils/custom-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

const DocumentTypeSchema = z.object({
  name: z.string().min(2).max(50),
  document_name: z.string().min(2).max(50),
  naming_structure: z.string().min(2),
  user_file_ids: z.array(z.string()),
});

interface Example {
  id: string;
  file_url: string;
  file_type: string;
  file_name: string;
  preview_url: string;
}

interface DocumentType {
  id: string;
  name: string;
  document_name: string;
  naming_structure: string;
  is_archived: boolean;
  examples: Example[];
}

interface GetDocumentsResponse {
  data: DocumentType[];
  meta_data: {
    total: number;
    offset: number;
    limit: number;
    returned: number;
  };
}
interface GetSingleDocumentsResponse {
  data: DocumentType;
  meta_data: {
    total: number;
    offset: number;
    limit: number;
    returned: number;
  };
}
interface GetDocumentsParams {
  limit?: number; // Optional, default is 10
  offset?: number; // Optional, default is 0
  include_archived?: boolean; // Optional, default is false
}
interface GetSingleDocumentsParams {
  id: string;
  include_archived?: boolean;
}

type Data = z.infer<typeof DocumentTypeSchema>;

export const documentTypeApi = createApi({
  reducerPath: "documentTypeApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    addDocument: builder.mutation<DocumentType, Data>({
      query: (data: Data) => ({
        url: "document-types/add",
        method: "POST",
        body: data,
      }),
    }),
    getDocuments: builder.query<GetDocumentsResponse, GetDocumentsParams>({
      query: ({ limit = 10, offset = 0, include_archived = false } = {}) => ({
        url: "document-types/all",
        method: "GET",
        params: { limit, offset, include_archived },
      }),
    }),
    getDocumentById: builder.query<
      GetSingleDocumentsResponse,
      GetSingleDocumentsParams
    >({
      query: ({ id, include_archived = false }) => ({
        url: `document-types/${id}`,
        method: "GET",
        params: { id, include_archived },
      }),
    }),
    updateDocument: builder.mutation<
      DocumentType,
      { id: string; data: Partial<Data> }
    >({
      query: ({ id, data }) => ({
        url: `document-types/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    archiveDocument: builder.mutation<void, string>({
      query: (documentTypeId: string) => ({
        url: `document-types/archive/${documentTypeId}`,
        method: "DELETE",
      }),
    }),
    deleteDocument: builder.mutation<void, string>({
      query: (documentTypeId: string) => ({
        url: `document-types/delete/${documentTypeId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddDocumentMutation,
  useGetDocumentsQuery,
  useGetDocumentByIdQuery,
  useArchiveDocumentMutation,
  useDeleteDocumentMutation,
  useUpdateDocumentMutation,
} = documentTypeApi;
