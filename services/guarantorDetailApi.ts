import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "@/utils/custom-base-query";

// Interface for Guarantor Details
export interface GuarantorDetails {
    personal_details: {
      first_name: string;
      last_name: string;
      date_of_birth: string;
      marital_status: string;
      verification_status: string;
      correction_notes: string;
    };
    contact_information: {
      phone_number: string;
      email_address: string;
    };
    employment_details: {
      is_self_employed: boolean;
      position: string;
      years_employed: number;
      annual_income: number;
      credit_score: number;
      employer_details: {
        employer_name: string;
        address_type: string;
        employer_address: {
          street_address: string;
          state: string;
          city: string;
          zip: string;
        };
      };
    };
    current_address: {
      street_address: string;
      state: string;
      city: string;
      zip: string;
    };
    same_mailing_and_current_address: boolean;
    owned_primary_residence: boolean;
    move_in_date: string;
    validation_documents: string[];
    mailing_address: {
      street_address: string;
      state: string;
      city: string;
      zip: string;
    };
    primary_residence_monthly_rent: number;
    primary_residence_mortgage_payment: number;
  }

export const GuarantorDetail = createApi({
  reducerPath: "GuarantorDetailApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // GET request to fetch guarantor details
    fetchGuarantorDetails: builder.query<GuarantorDetails, void>({
      query: () => ({
        url: "borrower/guarantor_details",
        method: "GET",
      }),
    }),
    // PUT request to update guarantor details
    updateGuarantorDetails: builder.mutation<void, GuarantorDetails>({
      query: (guarantorDetails) => ({
        url: "borrower/guarantor_details",
        method: "PUT",
        body: guarantorDetails,
      }),
    }),
  }),
});

export const {
  useFetchGuarantorDetailsQuery,
  useUpdateGuarantorDetailsMutation,
} = GuarantorDetail;
