'use client';

import React from 'react';
import { HouseOutlined } from '@mui/icons-material';
import HandymanIcon from "@mui/icons-material/Handyman";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import StairsOutlinedIcon from '@mui/icons-material/StairsOutlined';
import Lend from '@/components/home/lendingSolution/Lend';




const Brrrr = () => {

  const steps = [
    { id: 1, title: "Step 1", description: "Apply for your loan and get pre-approved in as little as 48 hours." },
    { id: 2, title: "Step 2", description: "Purchase, rehab, and rent out your property to build equity." },
    { id: 3, title: "Step 3", description: "Refinance your property to cash out and repeat the process." },
  ];

  const whyChooseUse = [
    {
      title: "Maximize Your Investment",
      icon: <HandymanIcon sx={{ fontSize: "24px" }} />,


      description: "Leverage your capital by refinancing and repeating the process to grow your real estate portfolio efficiently.",
    },
    {
      title: "Tailored for Long-Term Wealth",
      icon: <HouseOutlined sx={{ fontSize: "24px" }} />,

      description: "Our BRRRR loans are designed to support your long-term wealth-building strategy with flexible terms and competitive rates.",
    },
    {
      title: "Quick Funding",
      icon: <StairsOutlinedIcon sx={{ fontSize: "24px" }} />,

      description: "Get approved in as little as 48 hours to seize investment opportunities quickly. Speed is crucial for successful BRRRR projects.",
    },
    {
      title: "Transparent and Simple",
      icon: <AccountBalanceOutlinedIcon sx={{ fontSize: "24px" }} />,

      description: "No hidden fees or surprises. We offer clear, straightforward terms to keep your investments predictable.",
    },
  ]

  const loanDescription = 'Specialized loans supporting the Buy, Rehab, Rent, Refinance, Repeat strategy for long-term wealth building.'
  return (
    <Lend steps={steps} whyChooseUs={whyChooseUse} loanDescription={loanDescription} loanType={`BRRRR Method Loans`} />

  );
};


export default Brrrr;
