"use client";
import TermsTable from "@/components/dashboard/loan/loanTerms/termsTable";
import NumberOverview from "@/components/dashboard/loan/loanTerms/NumberOverview";
import React from "react";
import { useSearchParams } from "next/navigation";
import { dummyData } from "@/utils/application";
export default function Page() {
  const id = useSearchParams().get("id");
  const dummy = dummyData.find((item) => item.id === id)?.terms;
  if (!dummy) return null;

  const TableData = dummy[0].loanOptions;
  const NumberData = dummy[0];
  return (
    <div className=" pl-6 pr-2  md:pl-24 md:pr-50 pt-10  bg-gray-50">
      <div>
        <h6 className="text-2xl text- gray-800">Your Estimated Loan Terms</h6>
        <h3 className="text-gray-700 mt-4 md:w-2/3 w-full ">
          Please use your loan terms below.Please note the provided amount may
          be subjected to change .The amount does not include third party
          settlments costs that may be requiredto close your loan.Please review
          carefully and if you any question contact your relationship manager
          ,Michael Rico, at 415-237-6425
        </h3>
        <div className="mt-8 flex flex-col gap-6">
          <TermsTable data={TableData} />
          <NumberOverview data={NumberData} />
        </div>
      </div>
    </div>
  );
}
