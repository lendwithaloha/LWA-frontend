"use client";
import React from "react";
import { motion } from "framer-motion";

const steps = [
  { number: 1, title: "Build Your Profile", description: "Begin by setting up your investor profile and uploading key documents in your Borrower Portal." },
  { number: 2, title: "Discover Your Loan Options", description: "Choose from our tailored loan products designed to meet specific real estate investment needs." },
  { number: 3, title: "Streamlined Processing", description: "Our system handles pre-underwriting, document validation, and provides regular updates on your loan status." },
  { number: 4, title: "Closing and Beyond", description: "We coordinate with all parties to ensure a smooth closing and offer ongoing support for future investments." },
];

const reasons = [
  { number: 1, title: "Save Time", description: "Our streamlined platform simplifies the lending process, saving you valuable time." },
  { number: 2, title: "Save Money", description: "Our competitive rates and efficient process help you save money on your investments." },
  { number: 3, title: "No Stress & Hassle", description: "Experience a smooth and stress-free lending journey with our dedicated support and cutting-edge technology." },
  { number: 4, title: "More Growth", description: "Access the capital you need to fuel your real estate investments and achieve your financial goals." },
];

const StepComponent = () => {
  return (
    <div className=" relative mt-[1900px] sm:mt-[1600px] md:mt-[900px] ">
      {/* Why Choose Section */}
      <section className="mx-[10%] px-6 md:px-20">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-2xl text-homeSecondary  font-bold ">Why Choose Lend with Aloha</h1>
            <p className="text-homeGray text-center font-normal text-base mt-3 max-w-2xl mx-auto">
              Explore the unique benefits that set us apart and make your investment journey seamless.
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.number}
              className="flex flex-col gap-4 border border-homeBorder p-6 rounded-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center text-homePrimary rounded-full border-homeBorder border w-11 h-11 bg-homeBackground">{reason.number}</div>
                <h2 className="text-homeSecondary font-medium text-lg">{reason.title}</h2>
              </div>
              <p className="text-sm text-homeGray">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-primaryColor flex flex-col items-center justify-center px-6 md:px-20 mt-10 py-20 gap-10">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Streamlined Client Experience</h1>
          <p className="font-normal text-base mt-3 max-w-2xl mx-auto">
            Effortlessly navigate your real estate investment journey with our seamless loan process tailored for your success.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-10 md:px-28">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="border-[6px] border-[#B8D5F9] flex flex-col justify-center items-center text-center md:h-60 bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 gap-2.5"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <h2 className="text-lg text-homeSecondary font-bold">{step.title}</h2>
              <p className="text-sm text-homeGray">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StepComponent;
