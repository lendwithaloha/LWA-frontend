'use client';

import React from 'react';
import { HouseOutlined } from '@mui/icons-material';
import HandymanIcon from "@mui/icons-material/Handyman";
import Lend from '@/components/home/lendingSolution/Lend';




const DSCR = () => {

  const steps = [
    { title: "Step 1: Apply for Financing",  description: "Start your project by applying for new construction financing that fits your specific needs." },
    { title: "Step 2: Project Approval",  description: "Once approved, you’ll receive funding to start your ground-up development project." },
    { title: "Step 3: Build and Complete", description: "Complete your construction project and see your vision come to life with our support." },
  ];

  const whyChooseUse = [
    {
      title: "Ground-Up Development",
      icon: <HandymanIcon sx={{ fontSize: "24px" }} />,


      description: "Financing tailored to your new construction projects, enabling you to build from the ground up.",
    },
    {
      title: "Competitive Rates",
      icon: <HouseOutlined sx={{ fontSize: "24px" }} />,

      description: "Enjoy flexible terms and competitive rates designed for real estate developers.",
    },

  ]

  const loanDescription = 'Flexible financing options for ground-up development projects, catering to visionary real estate developers.'
  return (
    <Lend steps={steps} whyChooseUs={whyChooseUse} loanDescription={loanDescription} loanType={`New Construction Loans`} />

  );
};


export default DSCR;
