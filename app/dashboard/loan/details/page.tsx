"use client";
import DetailsDocuemt from "@/components/dashboard/loan/details/details-document";
import QuotesPage from "@/components/dashboard/loan/details/details-quotes";

import { LoanDetailsCard } from "@/components/dashboard/loan/details/loan-details-card";

import { RootState } from "@/store/store";

import { Divider, Tab, Tabs } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const applications = useSelector(
    (state: RootState) => state.applications.list
  );
  const loans = applications.filter((app) => app.status === "closed");
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  console.log("loan id:", loans);

  return (
    <div className="p-6 flex flex-col lg:flex-row ">
      <div className="w-full ml-2">
        <div>Titiles</div>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Quotes" />
          <Tab label="Documents" />
        </Tabs>
        {selectedTab === 0 ? <QuotesPage /> : <DetailsDocuemt />}
      </div>
      <Divider flexItem />
      <div className="h-screen  relative border">
        {" "}
        {loans.map((loan) => (
          <LoanDetailsCard key={loan.id} loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default Page;
