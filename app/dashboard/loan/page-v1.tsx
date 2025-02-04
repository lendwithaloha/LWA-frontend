"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

import Origination from "@/components/dashboard/loan/activeLoanTable";
import AllLoans from "@/components/dashboard/loan/AllLoans";
import Dead from "@/components/dashboard/loan/Dead";
import Closed from "@/components/dashboard/loan/Closed";
import NotSubmitted from "@/components/dashboard/loan/NotSubmitted";




const FiltersList = [
  { value: "origination", label: "Origination" },
  { value: "closed", label: "Closed" },
  { value: "not_submitted", label: "Not submitted" },
  { value: "dead", label: "Dead" },
  { value: "all_loans", label: "All loans" },
];

const Page = () => {
  const [activeFilter, setActiveFilter] = useState("origination");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveFilter(newValue);
  };

  return (
    <div>
      <Link href="loan/id"></Link>
      <div className="flex flex-col bg-gray-50 pl-6 pr-2 md:pl-24 md:pr-24">
        <div className="w-full flex flex-col sm:flex-row justify-between gap-4 mt-10">
          <div className="w-full">
            <h6 className="flex items-center text-3xl">Loans</h6>
            <div className="w-full flex flex-col md:flex-row md:justify-between gap-1 md:gap-6 sm:text-left text-center items-center">
              <Tabs
                value={activeFilter}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTabs-indicator": {
                    borderRadius: "10px",
                  },
                }}
              >
                {FiltersList.map((filter, index) => (
                  <Tab
                    key={filter.value}
                    value={filter.value}
                    label={filter.label}
                    sx={{
                      paddingLeft: index == 0 ? "0px" : "",
                      textAlign: "start",
                      alignItems: "start",
                      textTransform: "none",
                      fontSize: { xs: "11px", sm: "13px" },
                    }}
                  />
                ))}
              </Tabs>
        
            </div>
          </div>
        </div>
        <div className="mt-5 md:mt-10">
          {activeFilter === "origination" && (
            <Origination />
          )}
          {activeFilter === "all_loans" && <AllLoans />}
          {activeFilter === "dead" && <Dead />}
          {activeFilter === "closed" && <Closed />}
          {activeFilter === "not_submitted" && <NotSubmitted />}
        </div>
      </div>
    </div>
  );
};

export default Page;
