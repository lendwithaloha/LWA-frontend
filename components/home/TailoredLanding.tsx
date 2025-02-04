"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import HandymanIcon from "@mui/icons-material/Handyman";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import StairsOutlinedIcon from '@mui/icons-material/StairsOutlined';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import { motion } from "framer-motion";
import { HouseOutlined } from "@mui/icons-material";

const tailoredData: {
  icon: ReactNode;
  title: string;
  desc: string;
  link: string;
}[] = [
    {
      icon: <HandymanIcon sx={{ fontSize: "24px" }} />,

      title: "Fix and Flip",
      desc: "Short-term loans for property renovation and quick resale, perfect for flippers seeking fast turnaround",
      link: "/fix-and-flip",
    },
    {
      icon: <HouseOutlined sx={{ fontSize: "24px" }} />,
      title: "BRRRR Method",
      desc: "Specialized loans supporting the Buy, Rehab, Rent, Refinance, Repeat strategy for long-term wealth building.",
      link: "/brrrr-method",
    },
    {
      icon: <StairsOutlinedIcon sx={{ fontSize: "24px" }} />,
      title: "New Construction",
      desc: "Flexible financing options for ground-up development projects, catering to visionary real estate developers",
      link: "/new-construction",
    },
    {
      icon: <AccountBalanceOutlinedIcon sx={{ fontSize: "24px" }} />,
      title: "DSCR Loans",
      desc: "Debt Service Coverage Ratio loans for investors focused on rental income properties and cash flow.",
      link: "/dscr-loans",
    },
  ];

const approaches = [
  {
    title: "Strategic Partnerships",
    desc: "Cultivate meaningful lender relationships to secure competitive rates for you. Receive premium pricing and personalized service tailored just for you.",
  },
  {
    title: "Tech-Driven Efficiency",
    desc: "Experience a seamless lending journey with our all-in-one platform. Enjoy a stress-free experience from pre-approval to closing, with personalized support and cutting-edge technology.",
  },
  {
    title: "Specialized Expertise",
    desc: "Our team&apos;s focus on experienced investors means we speak your language. We understand the nuances of complex investment strategies and tailor our services accordingly.",
  },
];

const TailoredLanding = () => {
  return (
    <div className="mx-[10%]   absolute z-10 top-[65%] left-[5%] right-[5%] ">
      {/* Hero Section */}
      <div className=" !bg-white px-6 md:px-20 border-[#79ADEA7A] border-t border-r border-l rounded-t-[30px] flex flex-col justify-center items-center pt-10 pb-28 ">
        {/* <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
        >
          <Image
            className="mb-5"
            src="/images/Summerwood.jpg"
            height={200}
            width={400}
            alt="summerwood"
          />
          <Image
            src="/images/image3.jpg"
            height={200}
            width={400}
            alt="real estate"
          />
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className=""
        >
          <h1 className="text-3xl text-center text-homeSecondary font-bold ">
            Tailored Lending <span className="text-homePrimary " >Solutions</span>
          </h1>
          <h2 className="text-homeGray text-center font-normal text-base mt-3 mb-20">Empowering Real Estate Investors with Customized Financing Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {tailoredData.map((data) => (
              <Link key={data.title} href={data.link}>
                <motion.div
                  className="h-full cursor-pointer transition-transform transform hover:scale-105 bg-white p-4 rounded-lg shadow-lg flex flex-col gap-3 "
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.8,
                    delay: tailoredData.indexOf(data) * 0.2,
                  }}
                >
                  <div className="flex gap-4">
                    <div className="flex justify-center items-center text-homePrimary rounded-md border-homeBorder border w-11 h-11 bg-homeBackground">{data.icon}</div>
                    <h1 className="text-homeSecondary font-medium my-3 text-lg" >{data.title}</h1></div>
                  <p className="text-sm text-homeGray">{data.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col  py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl text-homeSecondary font-bold text-center mb-10">Our Unique Approach</h1>
        <div className="flex flex-col md:flex-row gap-9">
          {approaches.map((approach, key) => (
            <motion.div
              key={key}
              className="bg-homePrimary flex flex-col justify-center items-center text-center text-homeWhite p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 gap-2.5"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: key * 0.2 }}
            >
              <div className="flex justify-center items-center text-homePrimary rounded-md border-homeBorder border w-11 h-11 bg-homeBackground"><Brightness5OutlinedIcon sx={{ fontSize: "24px" }} /></div>

              <h1 className="text-lg  font-bold">{approach.title}</h1>
              <p className="text-sm">{approach.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TailoredLanding;
