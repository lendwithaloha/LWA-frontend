"use client";

import InquiryOverview from "./InquiryOverview";
import LoanQuotesPage from "./LoanQoutesPage";

interface DetailsPageProps {
  inquiry: {
    id: number;
    propertyAddress: string;
    loanPurpose?: string;
    investmentStrategy?: string;
    loanAmount: string;
    dateCreated?: string; // Make it optional
  };
}

const DetailsPage = ({ inquiry }: DetailsPageProps) => (
  <div className="">
    <InquiryOverview
      propertyAddress={inquiry.propertyAddress}
      loanPurpose={inquiry.loanPurpose || "N/A"}
      investmentStrategy={inquiry.investmentStrategy || "Not specified"}
      loanAmount={inquiry.loanAmount}
      loanTerm="30 Years"
      dateCreated={inquiry.dateCreated || "Unknown"} // Default to "Unknown" if undefined
    />
    <LoanQuotesPage />
  </div>
);

export default DetailsPage;
