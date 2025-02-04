'use client';

import React from 'react';

import { HouseOutlined } from '@mui/icons-material';
import HandymanIcon from "@mui/icons-material/Handyman";

import Lend from '@/components/home/lendingSolution/Lend';




const DSCR = () => {

  const steps = [
    { title:"Step 1: Apply for Financing",  description: "Submit your loan application with minimal documentation and receive a fast decision." },
    { title:"Step 2: Project Approval", description: "Get your loan approved quickly, with flexible repayment terms tailored to your investment needs." },
    { title:"Step 3: Build and Complete",  description: "Use the financing to purchase or refinance rental properties and grow your real estate portfolio." },
  ];

  const whyChooseUse = [
    {
      title: "Maximize Cash Flow",
      icon: <HandymanIcon sx={{ fontSize: "24px" }} />,


      description: "Designed for rental income properties, our DSCR loans help you maximize cash flow with flexible terms.",
    },
    {
      title: "Fast Approval",
      icon: <HouseOutlined sx={{ fontSize: "24px" }} />,

      description: "Get quick approval to capitalize on opportunities, with minimal documentation required.",
    },

  ]

  const loanDescription = 'Debt Service Coverage Ratio loans for investors focused on rental income properties and cash flow.'
  return (
    <Lend steps={steps} whyChooseUs={whyChooseUse} loanDescription={loanDescription} loanType={`DSCR Loans`} />

  );
};


export default DSCR;
