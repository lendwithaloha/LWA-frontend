import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { RootState } from "@/store/store";
import { setUser, clearUser } from "@/store/slice/user/userSlice";
import { setTokens, getTokens, clearTokens } from "@/utils/cookie";

const BASE_URL =
  process.env.SERVER_URL ||
  "https://lwa-backend-544975425763.europe-west3.run.app/api/v1/";

let isRefreshing = false; // Track refresh state
let refreshSubscribers: ((token: string) => void)[] = []; // Queue for requests waiting for refresh

type RefreshTokenResponse = {
  access_token: string;
  // Add other fields returned by the refresh token API if needed
};

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = api.getState() as RootState;
      const token = state.user?.accessToken || getTokens().accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      if (!headers.has("Content-Type") && !(args.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    console.warn("401 Unauthorized: Attempting token refresh...");

    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshSubscribers.push((newToken) => {
          // Ensure args is always an object
          const requestArgs =
            typeof args === "string"
              ? { url: args, headers: { Authorization: `Bearer ${newToken}` } }
              : {
                  ...args,
                  headers: {
                    ...args.headers,
                    Authorization: `Bearer ${newToken}`,
                  },
                };

          resolve(baseQuery(requestArgs, api, extraOptions));
        });
      });
    }

    isRefreshing = true;
    const refreshToken = getTokens().refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "auth/refresh_token",
          method: "GET",
          headers: { "refresh-token": refreshToken },
        },
        api,
        extraOptions
      );

      const refreshData = refreshResult.data as RefreshTokenResponse;

      if (refreshData?.access_token) {
        const accessToken = refreshData.access_token;

        api.dispatch(
          setUser({
            user: (api.getState() as RootState).user.user!,
            accessToken,
          })
        );

        setTokens(accessToken, refreshToken);

        refreshSubscribers.forEach((callback) => callback(accessToken));
        refreshSubscribers = [];
        isRefreshing = false;

        const requestArgs =
          typeof args === "string"
            ? { url: args, headers: { Authorization: `Bearer ${accessToken}` } }
            : {
                ...args,
                headers: {
                  ...args.headers,
                  Authorization: `Bearer ${accessToken}`,
                },
              };

        return baseQuery(requestArgs, api, extraOptions);
      } else {
        console.error("Token refresh failed. Logging out.");
        api.dispatch(clearUser());
        clearTokens();
        refreshSubscribers = [];
        isRefreshing = false;

        return { error: { status: 401, data: "Unauthorized" } };
      }
    } else {
      console.error("No refresh token available. Logging out.");
      api.dispatch(clearUser());
      clearTokens();
      refreshSubscribers = [];
      isRefreshing = false;

      return { error: { status: 401, data: "Unauthorized" } };
    }
  }

  return result;
};

export default customBaseQuery;
