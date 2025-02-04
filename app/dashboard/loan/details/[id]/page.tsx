"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { LoanDetailsCard } from "@/components/dashboard/loan/details/loan-details-card";
import DetailsDocument from "@/components/dashboard/loan/details/details-document";
import QuotesPage from "@/components/dashboard/loan/details/details-quotes";
import { Divider, Tab, Tabs } from "@mui/material";
import React from "react";
import HelpModal from "@/components/dashboard/loan/details/HelpModal";
import { ArrowBack, StarBorder } from "@mui/icons-material";
import Link from "next/link";

const Page = () => {
  console.log("test"); // Debug log to confirm rendering
  const params = useParams(); // Get params object from URL
  const id = params?.id;
  console.log("Loan ID:", id); // Debug log to check if ID is being captured

  const applications = useSelector(
    (state: RootState) => state.applications.list
  );
  const loan = applications.find((app) => app.id.toString() === id); // Find loan by ID

  const [selectedTab, setSelectedTab] = React.useState(0);

  if (!loan) {
    return <div>Loan not found</div>; // Handle case when no matching loan is found
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="px-6  py-4 flex flex-col lg:flex-row ">
      <div className="w-full ml-2">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/loan">
            <ArrowBack />
          </Link>
          <p className="text-lg"> Back</p>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <div className="bg-white rounded p-2">
                <StarBorder className="cursor-pointer text-[30px]" />
              </div>
              <div className="flex flex-col items-start">
                <span>LWA Loan ID</span>
                <div className="font-medium">#{loan.loanNumber}</div>
              </div>
            </div>
            <div>
              <p>Date submitted</p>
              <p>Jan 24, 2024</p>
            </div>
          </div>
        </div>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Quotes" />
          <Tab label="Documents" />
        </Tabs>
        {selectedTab === 0 ? <QuotesPage /> : <DetailsDocument />}
      </div>
      <Divider flexItem />
      <div className="h-screen relative border">
        <LoanDetailsCard loan={loan} />
      </div>
      <HelpModal loan={loan} />
    </div>
  );
};

export default Page;
