"use client";

import React, { useState } from "react";
import { Typography } from "@mui/material";
import ReusableButton from "@/components/common_btn";
import { useRouter } from "next/navigation";
type LoanOption = {
  label: string;
  description: string;
  value: string;
  link: string;
};

const NewLoanPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const router = useRouter();
  const loanOptions: LoanOption[] = [
    {
      label: "Bridge / Fix and Flip / Fix to Rent",
      description: "",
      value: "/start/bridge-broker",
      link: "/bridge-broker",
    },
    {
      label: "New Construction *",
      description: "",
      value: "/start/new-construction",
      link: "/new-construction",
    },
    {
      label: "Rental - Individual (1 property financed with 1 loan)",
      description: "",
      value: "/start/rental-individual",
      link: "/bridge-broker",
    },
    {
      label: "Rental - Portfolio (5+ properties financed with 1 loan)",
      description: "",
      value: "/start/rental-portfolio",
      link: "/bridge-broker",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-24 py-10">
      <Typography variant="h5" className="font-bold mb-6">
        What kind of real estate investments is your client interested in?
      </Typography>

      <div className="space-y-4">
        {loanOptions.map((option) => (
          <div
            key={option.value}
            onClick={() => setSelectedOption(option.value)}
            className={`border rounded-md p-4 cursor-pointer transition ${
              selectedOption === option.value
                ? "bg-[#d5f2f1] border-[#3b9e9a]"
                : "bg-white border-gray-300"
            }`}
          >
            <Typography>{option.label}</Typography>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Typography className="text-sm text-gray-600">
          *{" "}
          <a
            href="#"
            className="text-[#3b9e9a] underline hover:text-[#0070f3] transition"
          >
            What is a New Construction deal at LWA?
          </a>
        </Typography>
        <ReusableButton
          variant="contained"
          label="Next"
          onTap={() => {
            router.push(selectedOption);
          }}
        />
      </div>
    </div>
  );
};

export default NewLoanPage;
