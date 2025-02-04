import customBaseQuery from "@/utils/custom-base-query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";

const BASE_URL =
  process.env.SERVER_URL ||
  "https://lwa-backend-544975425763.europe-west3.run.app/api/v1";

export const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({
        url: "auth/sign_in",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(credentials),
      }),
    }),

    signUp: builder.mutation({
      query: (userDetails) => ({
        url: "auth/sign_up",
        method: "POST",
        body: userDetails, // JSON payload
      }),
    }),

    createBorrower: builder.mutation({
      query: () => ({
        url: "borrower/create",
        method: "POST",
      }),
    }),
    
    activate: builder.mutation({
      query: (userData) => ({
        url: "auth/activate_account",
        method: "POST",
        body: userData, // JSON payload
      }),
    }),

    forgot: builder.mutation({
      query: (emailOrPhone) => ({
        url: "auth/forgot_password",
        method: "POST",
        body: emailOrPhone, // JSON payload
      }),
    }),

    resendActivation: builder.mutation({
      query: (options) => ({
        url: "auth/resend_otp",
        method: "POST",
        body: {
          ...options,
          verification_type: "registration", // Append verification type
        },
      }),
    }),
    resendForgot: builder.mutation({
      query: (options) => ({
        url: "auth/resend_otp",
        method: "POST",
        body: {
          ...options,
          verification_type: "password_reset", // Append verification type
        },
      }),
    }),
    verify: builder.mutation({
      query: (userData) => ({
        url: "auth/reset_password_otp",
        method: "POST",
        body: {
          ...userData,
          verification_type: "password_reset", // Append verification type
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }: { token: string; password: any }) => ({
        url: "auth/reset_password",
        method: "POST",
        headers: {
          "reset-password-token": token,
        },
        body: password,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "auth/refresh_token",
        method: "GET",
        headers: {
          "refresh-token": refreshToken,
        },
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignUpMutation,
  useActivateMutation,
  useForgotMutation,
  useResendActivationMutation,
  useVerifyMutation,
  useResendForgotMutation,
  useRefreshTokenMutation,
  useResetPasswordMutation,
  useCreateBorrowerMutation
} = authSlice;
