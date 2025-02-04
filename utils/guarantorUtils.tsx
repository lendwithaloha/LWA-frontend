// src/utils/guarantorUtils.js
import { GuarantorDetails } from "@/types/profile/profile-detail";
import { FormData } from "@/store/slice/profile/profile-setup";



export const createGuarantorDetails = (formData: FormData) => {
  const guarantorDetails: GuarantorDetails = {
    personal_details: {
      first_name: formData?.firstName || "",
      last_name: formData?.lastName || "",
      date_of_birth: formData?.dob || "",
      marital_status: formData?.maritalStatus || "",
      verification_status: "pending",
      correction_notes: "",
    },
    contact_information: {
      phone_number: formData?.phone || "",
      email_address: formData?.email || "",
    },
    employment_details: {
      is_self_employed: formData?.selfEmployed === "true",
      position: formData?.employerPosition,
      years_employed: Number(formData?.yearsEmployed) || 0,
      annual_income: Number(formData?.annualIncome) || 0,
      credit_score: Number(formData?.creditScore) || 0,

      ...(formData?.selfEmployed === "false" && {
        employer_details: {
          employer_name: formData?.employerName || "",
          address_type: formData?.employerAddress || "",
          employer_address: {
            street_address: formData?.employerOtherStreetAddress || "",
            state: formData?.employerOtherState || "",
            city: formData?.employerOtherCity || "",
            zip: formData?.employerOtherZip || "",
          },
        },
      }),





    },
    current_address: {
      street_address: formData?.employerCurrentStreetAddress || "",
      state: formData?.employerCurrentState || "",
      city: formData?.employerCurrentCity || "",
      zip: formData?.employerCurrentZip || "",
    },
    same_mailing_and_current_address: formData?.mailingAddressCurrentAddress === "true",
    owned_primary_residence: formData?.residencyType === "true",
    primary_residence_monthly_rent: formData.monthlyRent || 0,
    primary_residence_mortgage_payment: formData.mortgagePayment || 0,
    move_in_date: formData?.currentAddressYears || "",
    validation_documents: formData.validationDocuments,
    ...(formData?.mailingAddressCurrentAddress === "false" && {
      mailing_address: {
        street_address: formData?.mailingStreetAddress || "",
        state: formData?.mailingState || "",
        city: formData?.mailingCity || "",
        zip: formData?.mailingZip || "",
      }
    }),
  };

  return guarantorDetails;
};
