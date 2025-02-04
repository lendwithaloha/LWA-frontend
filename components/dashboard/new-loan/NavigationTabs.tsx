"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, Button } from "@mui/material";
import FilterDrawer from "./FilterDrawer";
import FirstDrawer from "./RequestNewInquiryDrawer";
import SecondDrawer from "./LoanRequestFormDrawer";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const NavigationTabs = ({
  onTabChange,
}: {
  onTabChange: (tabIndex: number) => void;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const rows = useSelector((state: RootState) => state.loan.filteredInquiries);

  // Drawer management state
  const [isFirstDrawerOpen, setIsFirstDrawerOpen] = useState(false);
  const [isSecondDrawerOpen, setIsSecondDrawerOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    onTabChange(newValue);
  };

  const handleOpenFirstDrawer = () => setIsFirstDrawerOpen(true);
  const quoteReadyCount = rows.filter((item) => item.status === "Ready").length;
  const quoteCollectionCount = rows.filter(
    (item) => item.status === "Collection"
  ).length;

  const handleProceedFromFirstDrawer = (loanType: string) => {
    setSelectedLoanType(loanType);
    setIsFirstDrawerOpen(false); // Close the first drawer
    setIsSecondDrawerOpen(true); // Open the second drawer
  };

  const handleCloseSecondDrawer = () => {
    setIsSecondDrawerOpen(false);
    setSelectedLoanType(""); // Reset the selected loan type when the second drawer closes
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Tabs value={activeTab} onChange={handleTabChange} textColor="inherit">
        <Tab label={`Quote Ready (${quoteReadyCount})`} />
        <Tab label={`Quote Collection (${quoteCollectionCount})`} />
      </Tabs>

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Filter Button */}
        <FilterDrawer />
        {/* Request New Inquiry Button */}
        <Button variant="contained" onClick={handleOpenFirstDrawer}>
          Request New Inquiry
        </Button>
        {/* First Drawer */}
        <FirstDrawer
          isOpen={isFirstDrawerOpen}
          onClose={() => setIsFirstDrawerOpen(false)}
          onProceed={handleProceedFromFirstDrawer}
        />
        {/* Second Drawer */}
        <SecondDrawer
          isOpen={isSecondDrawerOpen}
          onClose={handleCloseSecondDrawer}
          loanType={selectedLoanType}
          onChangeLoanType={() => {
            setIsSecondDrawerOpen(false); // Close second drawer
            setIsFirstDrawerOpen(true); // Open first drawer
          }}
        />
      </Box>
    </Box>
  );
};

export default NavigationTabs;
