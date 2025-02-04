import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getTokens, setTokens, clearTokens } from "@/utils/cookie";
import customBaseQuery from "@/utils/custom-base-query";

interface GetFilesResponse {
  id: string;
  file_url: string;
  file_type: string;
  file_name: string;
  preview_url: string;
}

export interface UploadFileResponse {
  file_id: string;
  message: string;
  url: string;
  preview_url: string;
}

export const apSlice = createApi({
  reducerPath: "ap",
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
    uploadFile: builder.mutation<UploadFileResponse, Blob | Blob[]>({
      query: (file) => {
        const formData = new FormData();
        if (Array.isArray(file)) {
          file.forEach((f, index) => {
            formData.append("file", f);
          });
        } else {
          formData.append("file", file);
        }

        return {
          url: "storage/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetFilesQuery, useUploadFileMutation } = apSlice;
