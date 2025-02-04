import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "@/utils/custom-base-query";

interface InvitationResponse {
  token: string;
}

interface InvitationRequest {
  role: string;
}

export const createInvitationApi = createApi({
  reducerPath: "createInvitationApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    createInvitation: builder.mutation<InvitationResponse, InvitationRequest>({
      query: (body) => ({
        url: "auth/create-invitation",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateInvitationMutation } = createInvitationApi;
