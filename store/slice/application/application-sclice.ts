import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getTokens, setTokens, clearTokens } from "@/utils/cookie";
import customBaseQuery from "@/utils/custom-base-query";

// Define types for the API responses and payloads
interface GetFilesResponse {
  id: string;
  file_url: string;
  file_type: string;
  file_name: string;
  preview_url: string;
}

interface UploadFileResponse {
  file_id: string;
  message: string;
  url: string;
  preview_url: string;
}

interface RefreshTokenResponse {
  access_token: string;
}

interface ApplicationDocumentPayload {
  document_type: string;
  file_id: string;
}

interface ApplyPayload {
  application_documents: ApplicationDocumentPayload[]; // Use the payload-specific type
  application_type: string;
}

interface ApplicationDocument {
  document_type: string;
  file_id: string;
  file: {
    preview_url: string;
    file_name: string;
  };
  indexing_status: "started" | "pending" | "failed" | "completed";
  created_at: string;
  updated_at: string;
}

interface ApplyResponse {
  id: string;
  application_type: string;
  application_documents: ApplicationDocument[];
  application_question_result: any[];
  current_status: string;
}

interface GetAllApplicationsResponse {
  created_at: string | number | Date;
  id: string;
  application_type: string;
  application_documents: any[];
  application_question_result: any[];
  current_status: string;
}

interface QuestionResult {
  process_status: "pending" | "completed" | "fail";
  ai_result: "pending" | "approved" | "fail";
  question: {
    id: string;
    question: string;
    description: string;
    documents_required: string[];
    is_archived: boolean;
    created_at: string;
    updated_at: string;
  };
}

interface GetApplicationResponse {
  id: string;
  application_type: string;
  application_documents: ApplicationDocument[];
  application_question_result: QuestionResult[];
  current_status: string;
}

export const apSlice = createApi({
  reducerPath: "applicationSlice",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getFiles: builder.query<GetFilesResponse[], void>({
      query: () => "storage/get_files",
      transformResponse: (response: any) => {
        if (
          !Array.isArray(response) ||
          !response.every(
            (file) =>
              file.id &&
              file.file_url &&
              file.file_type &&
              file.file_name &&
              file.preview_url
          )
        ) {
          throw new Error("Invalid response format for getFiles");
        }
        return response as GetFilesResponse[];
      },
    }),
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
    apply: builder.mutation<ApplyResponse, ApplyPayload>({
      query: (data) => ({
        url: "application/add_new_application",
        method: "POST",
        body: data,
      }),
    }),
    getAllApplications: builder.query<GetAllApplicationsResponse[], void>({
      query: () => "application/get_all_applications",
    }),
    getApplicationById: builder.query<GetApplicationResponse, string>({
      query: (id) => `application/get_application?application_id=${id}`,
    }),
  }),
});

export const {
  useGetFilesQuery,
  useUploadFileMutation,
  useApplyMutation,
  useGetAllApplicationsQuery,
  useGetApplicationByIdQuery,
} = apSlice;
