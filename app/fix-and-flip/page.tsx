'use client';

import React from 'react';

import { HouseOutlined } from '@mui/icons-material';
import HandymanIcon from "@mui/icons-material/Handyman";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import StairsOutlinedIcon from '@mui/icons-material/StairsOutlined';
import Lend from '@/components/home/lendingSolution/Lend';




const FixAndFlip = () => {

  const steps = [
    { step: 0,title: "Step 1", description: "Apply online and get pre-qualified." },
    { step: 1,title: "Step 2", description: "Get quick approval and receive funds." },
    { step: 2,title: "Step 3", description: "Renovate and flip the property." },
    { step: 3 ,title: "Step 4", description: "Repay your loan when the property sells." },
  ];

  const whyChooseUse = [
    {
      title: "Quick Approval and Funding",
      icon: <HandymanIcon sx={{ fontSize: "24px" }} />,


      description: "Get approved in as little as 48 hours and receive funding to start your project quickly. Our streamlined process ensures you have the capital when you need it.",
    },
    {
      title: "Competitive Rates",
      icon: <HouseOutlined sx={{ fontSize: "24px" }} />,

      description: "We offer competitive interest rates, designed to help you maximize your profits on your fix and flip projects.",
    },
    {
      title: "Flexible Loan Terms",
      icon: <StairsOutlinedIcon sx={{ fontSize: "24px" }} />,

      description: "Tailored loan terms that fit your project timeline, with options ranging from 6 to 18 months. Perfect for quick flips and property investments.",
    },
    {
      title: "No Hidden Fees",
      icon: <AccountBalanceOutlinedIcon sx={{ fontSize: "24px" }} />,

      description: "Transparent pricing with no hidden fees. Know exactly what you&apos;re paying for upfront, so there are no surprises.",
    },
  ]

  const loanDescription = 'Short-term loans for property renovation and quick resale, perfect for flippers seeking fast turnaround.'
  return (
    <Lend steps={steps} whyChooseUs={whyChooseUse} loanDescription={loanDescription} loanType={`Fix and Flip Loans`}/>
    
  );
};


export default FixAndFlip;
