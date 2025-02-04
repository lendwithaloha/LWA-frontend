"use client";

import { motion } from "framer-motion";
import React from "react";
import ReusableButton from "../common_btn";
import TailoredLanding from "./TailoredLanding";
import Image from "next/image";

const Hero = () => {
  return (
    <motion.div
      className="relative w-full min-h-screen flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Centered Image */}
      <motion.div
        className="w-full absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Centered Image"
          className="w-full h-auto md:h-full object-cover"
          width={200}
          height={200}
        />
      </motion.div>

      {/* Content Overlay */}
      <motion.div
        className="absolute z-10 flex flex-col rounded-lg text-center py-14 px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Headline */}
        <motion.div
          className="flex flex-col gap-2 md:gap-4 text-xl sm:text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p>Unlocking Elite Real Estate</p>
          <p>
            Investment <span className="text-homePrimary">Opportunities</span>
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-homeGray w-[60%] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Empowering experienced investors with efficient, tech-driven mortgage
          solutions and competitive rates.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex justify-center items-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <ReusableButton
            label="Get Started"
            link="dashboard/loan"
            variant="contained"
            className="rounded-full md:px-10"
          />
          <ReusableButton
            label="Learn More"
            link=""
            variant="outlined"
            className="rounded-full md:px-10"
          />
        </motion.div>
      </motion.div>

      <TailoredLanding />
    </motion.div>
  );
};

export default Hero;
