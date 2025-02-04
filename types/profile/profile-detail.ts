import { ValidationDocument } from "@/store/slice/profile/profile-setup";

export interface GuarantorDetails {
    personal_details: {
      first_name: string;
      last_name: string;
      date_of_birth: string;
      marital_status: string;
      verification_status: "pending" | "verified" | "flagged_for_correction"; 
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
      employer_details?: {
        employer_name: string;
        address_type: "current" | "mailing_address" | 'other'; 
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
    mailing_address?: {
      street_address: string;
      state: string;
      city: string;
      zip: string;
    };
    owned_primary_residence: boolean;
    primary_residence_monthly_rent: number;
    primary_residence_mortgage_payment: number;
    move_in_date: string;
    validation_documents: ValidationDocument[]; 
  }