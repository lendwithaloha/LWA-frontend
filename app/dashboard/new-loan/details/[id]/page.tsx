"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DetailsPage from "@/components/dashboard/new-loan/details/DetailPage";

const LoanInquiryDetails = () => {
  const selectedInquiry = useSelector(
    (state: RootState) => state.loan.selectedInquiry
  );

  if (!selectedInquiry) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Loan Inquiry Details</h1>
      <DetailsPage
        inquiry={{
          ...selectedInquiry,
          loanPurpose: selectedInquiry.loanPurpose || "N/A",
          investmentStrategy: selectedInquiry.investmentStrategy || "Not specified",
          dateCreated: selectedInquiry.dateCreated || "Unknown",
        }}
      />
    </div>
  );
};

export default LoanInquiryDetails;
