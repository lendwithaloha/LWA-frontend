import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "@/utils/custom-base-query";

export const searchDocumentTypeApi = createApi({
  reducerPath: "searchDocumentTypeApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getAllDocTypes: builder.query({
      query: ({ offset = 0, limit = 100, include_archived = false }) => 
        `document-types/all?limit=${limit}&offset=${offset}&include_archived=${include_archived}`,
    }),
  }),
});

export const { useGetAllDocTypesQuery } = searchDocumentTypeApi;


// curl -X 'GET' \
//   'https://lwa-backend-544975425763.europe-west3.run.app/api/v1/document-types/all?limit=100&offset=0&include_archived=false' \
//   -H 'accept: application/json' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhM2NjZmU5OTI2Nzk0Mzg1ODBjN2U4NGM0ZmIyZjY4MCIsImV4cCI6MTczODE2MzE1Mn0.C2HzHHMKJL1SNhUaASxMRlZn5duw6AhbXNCw0sSZMM0'

