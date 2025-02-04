"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import NavigationTabs from "@/components/dashboard/new-loan/NavigationTabs";
import QuoteTable from "@/components/dashboard/new-loan/QouteTable";
import { LoanStatus } from "@/store/slice/loan-inquiry/loanSlice";
import QuoteCollectionTable from "@/components/dashboard/new-loan/QuoteCollectionTable";

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <Box sx={{ px: 6, py: 4 }}>
      {/* Navigation and Action Buttons */}
      <NavigationTabs onTabChange={handleTabChange} />

      {/* Content Based on Active Tab */}
      <Box sx={{ mt: 4 }}>
        {activeTab === 0 && <QuoteTable status={LoanStatus.READY} />}
        {activeTab === 1 && (
          <QuoteCollectionTable status={LoanStatus.COLLECTION} />
        )}
      </Box>
    </Box>
  );
};

export default Page;
