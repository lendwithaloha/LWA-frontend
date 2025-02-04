import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "@/utils/custom-base-query";
interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: String;
  phone_number: string;
  username: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => "profile/me",
    }),
  }),
});

export const { useGetUserQuery } = userApi;
