import customBaseQuery from "@/utils/custom-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export enum DocumentTypeEnum {
  Passport = "passport",
  DriversLicense = "drivers_license",
  NationalId = "national_id",
}

interface BorrowerDocumentRequest {
  document_type: DocumentTypeEnum;
  file_id: string;
}
interface ApiResponse {
  id: string;
  document_type: string;
  current_version: {
    id: string;
    feedback: string;
    file: {
      id: string;
      file_url: string;
      file_type: string;
      file_name: string;
      preview_url: string;
    };
    status: string;
  };
  document_versions: any[]; // Adjust the type as necessary based on your requirements
}
interface DocumentVersionRequest {
  file_id: string;
  borrower_document_id: string;
}
export const borrowerDocumentApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "borrowerDocumentApi",
  endpoints: (builder) => ({
    addBorrowerDocument: builder.mutation<ApiResponse, BorrowerDocumentRequest>(
      {
        query: (data: BorrowerDocumentRequest) => ({
          url: "borrower/documents",
          method: "POST",
          body: data,
        }),
      }
    ),
    addDocumentVersion: builder.mutation<void, DocumentVersionRequest>({
      query: (data: DocumentVersionRequest) => ({
        url: "borrower/documents/add_version",
        method: "POST",
        body: data,
      }),
    }),
    getBorrowerDocument: builder.query<ApiResponse[], void>({
      query: () => "borrower/documents",
    }),
  }),
});

export const {
  useAddBorrowerDocumentMutation,
  useGetBorrowerDocumentQuery,
  useAddDocumentVersionMutation,
} = borrowerDocumentApi;
