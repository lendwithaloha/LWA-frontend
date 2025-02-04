"use client";

import React, { Suspense } from "react";
import { Typography } from "@mui/material";

const PreferredMembershipPage = () => {
  const memberships = [
    {
      borrowerName: "Veritas Real Estate LLC",
      status: "Active",
      expiration: "Aug 17, 2025",
      statusColor: "bg-green-500",
    },
    {
      borrowerName: "North Sea One LLC",
      status: "Active",
      expiration: "Oct 26, 2025",
      statusColor: "bg-green-500",
    },
    {
      borrowerName: "Elites Group LLC",
      status: "Expired",
      expiration: "Apr 29, 2024",
      statusColor: "bg-red-500",
    },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col bg-gray-50 pl-6 pr-2 md:pl-24 md:pr-24">
        {/* Header */}
        <div className="flex items-center mb-6 mt-10">
          <div className="w-8 h-8 rounded-full border-2 border-[#3b9e9a] flex justify-center items-center">
            <div className="w-4 h-4 rounded-full border-2 border-[#3b9e9a]"></div>
          </div>
          <Typography variant="h5" className="ml-3 font-bold">
            Preferred Membership
          </Typography>
        </div>

        {/* Membership Table */}
        <div className="overflow-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left text-sm text-gray-600">
                  Borrower Name
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm text-gray-600">
                  Membership Status
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm text-gray-600">
                  Membership Expiration
                </th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((membership, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="border border-gray-200 px-4 py-2 text-sm text-gray-800">
                    {membership.borrowerName}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 flex items-center text-sm text-gray-800">
                    <span
                      className={`w-3 h-3 rounded-full ${membership.statusColor} mr-2`}
                    ></span>
                    {membership.status}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm text-gray-800">
                    {membership.expiration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notification Banner */}
        <div className="bg-[#d5f2f1] border border-[#3b9e9a] text-[#3b9e9a] p-4 rounded-lg">
          To renew or create a new membership, please reach out to our Customer
          Experience Team. 1-844-259-2016
        </div>
        <hr className="my-16 border-t border-gray-300" />
        <div className="mb-8">
          <Typography variant="h6" className="font-bold mb-2">
            Interest Rates
          </Typography>
          <Typography className="text-sm text-gray-600 mb-4">As of 11/27/24</Typography>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left text-sm text-gray-800 font-semibold">
                  Loan to Cost
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm text-gray-800 font-semibold">
                  Interest Rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">&lt; 0%</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Loan Level Pricing Adjustments Section */}
        <div className="mb-8">
          <Typography variant="h6" className="font-bold mb-2">
            Loan Level Pricing Adjustments
          </Typography>
          <Typography className="text-sm text-gray-600 mb-4">As of 11/27/24</Typography>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left text-sm text-gray-800 font-semibold">
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm text-gray-800 font-semibold">
                  Rate Adjustment
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows dynamically if needed */}
            </tbody>
          </table>
        </div>

        {/* Loan Level Pricing Adjustments for States Section */}
        <div>
          <Typography variant="h6" className="font-bold mb-2">
            Loan Level Pricing Adjustments for States
          </Typography>
          <Typography className="text-sm text-gray-600 mb-4">As of 11/27/24</Typography>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left text-sm text-gray-800 font-semibold">
                  State
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm text-gray-800 font-semibold">
                  Rate Adjustment
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows dynamically if needed */}
            </tbody>
          </table>
        </div>
      </div>
    </Suspense>
  );
};

export default PreferredMembershipPage;
