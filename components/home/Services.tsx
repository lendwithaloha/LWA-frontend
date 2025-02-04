"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    title: "Strategy Creation and Implementation",
    desc: "Step into a customized roadmap with a dedicated financing team built for growth.",
  },
  {
    title: "Due Diligence Support",
    desc: "Count on our team for thorough property and market analysis, offering an additional lending perspective.",
  },
  {
    title: "Leverage Partnerships",
    desc: "Tap into our expanding network of strategic partners to unlock cost-saving opportunities and enhance your borrowing experience.",
  },
  {
    title: "Transaction Coordination",
    desc: "We manage the details, from document collection to closing logistics, streamlining your investment process.",
  },
];


const Services = () => {
  return (
    <div className="min-h-screen  bg-gray-50 py-20 mx-[10%]">
      {/* Value-Added Services Section */}
      <div className="mb-20">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <motion.div
            className=""
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-xl md:text-2xl text-homeSecondary font-bold mb-10">
              Value-Added Services
            </h1>
            <div className="w-full h-full flex flex-col md:flex-row  gap-6 justify-between items-center">
              <div className="md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="cursor-pointer transition-transform transform hover:scale-105 bg-white p-6 rounded-lg shadow-lg "
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <h2 className=" text-homeSecondary text-base font-bold mb-3">{service.title}</h2>
                    <p className="text-homeGray text-sm">{service.desc}</p>
                  </motion.div>
                ))}

              </div>
              <div className="relative w-full md:w-2/5 h-[350px]">
                <Image
                  src="/images/values-added.jpg"
                  alt="Tablet with digital graphics"
                  className="rounded-lg object-cover"
                  layout="fill"
                />
              </div>
            </div>
          </motion.div>


        </div>
      </div>

      {/* Technology Platform Section */}
      <div className="">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <motion.div
            className=""
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-xl md:text-2xl text-homeSecondary font-bold mb-10">              Cutting-Edge Technology Platform            </h1>
            <div className="w-full h-full flex flex-col md:flex-row gap-6 justify-between items-center">
              <div className="relative w-full md:w-2/5 h-[350px]">
                <Image
                  src="/images/values-added.jpg"
                  alt="Tablet with digital graphics"
                  className="rounded-lg object-cover"
                  layout="fill"
                />
              </div>
              <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="cursor-pointer transition-transform transform hover:scale-105 bg-white p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <h2 className=" text-homeSecondary text-base font-bold mb-3">{service.title}</h2>
                    <p className="text-homeGray text-sm">{service.desc}</p>
                  </motion.div>
                ))}

              </div>

            </div>
          </motion.div>


        </div>
      </div>
    </div>
  );
};

export default Services;
