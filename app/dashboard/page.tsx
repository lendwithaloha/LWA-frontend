"use client";
import CounterCard from "@/components/dashboard/CounterCard";
import SetupProfile from "@/components/dashboard/SetupProfile";
import React from "react";
import { Dashboard, MonetizationOn } from "@mui/icons-material";
import ApplicationCard from "@/components/dashboard/ApplicationCard";
// import { DocumentValidator } from "@/components/document-validator";

const page = () => {
  return (
    <div className="px-[50px]">
      <SetupProfile />
      <div className="flex flex-wrap justify-start gap-1 md:gap-20 mx-4 md:mx-4 mt-6">
        <CounterCard
          icon={<Dashboard fontSize="large" />}
          title="Active Loan"
          count={10}
        />
        <CounterCard
          icon={<MonetizationOn fontSize="large" />}
          title="Amount"
          count={"$" + 10000} // Adds the $ sign before the amount
        />
      </div>
      {/* <DocumentValidator /> */}
      <ApplicationCard />
    </div>
  );
};

export default page;
