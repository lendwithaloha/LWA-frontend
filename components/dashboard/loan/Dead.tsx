"use client";

import React from "react";
import { loans, statusStyles } from "../../../utils/data";
import CustomTable from "../../../components/dashboard/CustomTable";
import { Chip } from "@mui/material";

const Dead: React.FC = () => {
  const columns = [
    { label: "Loan ID", accessor: (loan: (typeof loans)[0]) => loan.id },
    { label: "Deal Name", accessor: (loan: (typeof loans)[0]) => loan.name },
    {
      label: "Status",
      accessor: () => (
        <Chip
          label={"RETRACTED"}
          size="small"
          style={{
            ...statusStyles["Retracted"],
            borderWidth: "1px",
            borderStyle: "solid",
            backgroundColor: "transparent",
          }}
        />
      ),
    },
    { label: "Loan Type", accessor: (loan: (typeof loans)[0]) => loan.type },
    { label: "Amount", accessor: (loan: (typeof loans)[0]) => loan.amount },
    {
      label: "Submission Date",
      accessor: (loan: (typeof loans)[0]) => loan.submissionDate,
    },
    {
      label: "Closing Date",
      accessor: (loan: (typeof loans)[0]) => loan.closingDate,
    },
  ];

  return  <div className="min-h-screen bg-gray-50">
<CustomTable data={loans} columns={columns} title="My Loans" />;
  </div> 
};

export default Dead;
