import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "@/utils/custom-base-query";
import { GuarantorDetails } from "@/types/profile/profile-detail";
interface BorrowerDeclaration {
  question: string;
  answer: string;
}
export const borrowerApi = createApi({
  reducerPath: "borrowerApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Declarations"],
  endpoints: (builder) => ({
    getGuarantorDetails: builder.query<GuarantorDetails, void>({
      query: () => "borrower/guarantor_details",
    }),
    updateGuarantorDetails: builder.mutation<void, Partial<GuarantorDetails>>({
      query: (body) => ({
        url: "borrower/guarantor_details",
        method: "PUT",
        body,
      }),
    }),
    getDeclarations: builder.query({
      query: () => "borrower/declarations",
      providesTags: ["Declarations"], // Associate the query with the "Declarations" tag
    }),
    updateDeclarations: builder.mutation<
      void,
      { borrower_declarations_questions: BorrowerDeclaration[] }
    >({
      query: (data) => ({
        url: "borrower/declarations",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Declarations"], // Invalidate the "Declarations" tag after mutation
    }),
    
  }),
});

export const {
  useGetGuarantorDetailsQuery,
  useUpdateDeclarationsMutation,
  useGetDeclarationsQuery,
  useUpdateGuarantorDetailsMutation,
} = borrowerApi;
