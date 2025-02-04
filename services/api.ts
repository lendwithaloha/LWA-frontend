import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }: { getState: any }) => {
      const token = getState().session.token ?? "";
      
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "items",
    }),
    createItem: builder.mutation({
      query: (newItem) => ({
        url: "items",
        method: "POST",
        body: newItem,
      }),
    }),
    updateItem: builder.mutation({
      query: ({ id, updatedItem }) => ({
        url: `items/${id}`,
        method: "PUT",
        body: updatedItem,
      }),
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = apiSlice;
