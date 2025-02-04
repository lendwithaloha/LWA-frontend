'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import ReusableButton from '@/components/common_btn';
import StepCard from '@/components/home/lendingSolution/StepFlow';
import ApplyLoan from '@/components/home/ApplyLoan';
import InformationSection from '@/components/home/InformationSection';
import Image from 'next/image';

type Step = {
    title: string;
    description: string;
    step?:number
    id?:number
};

type WhyChooseUs = {
    title: string;
    icon: JSX.Element;
    description: string;
};

type LendComponentProps = {
    loanType: string;
    loanDescription: string;
    steps: Step[];
    whyChooseUs: WhyChooseUs[];
};

const LendComponent: React.FC<LendComponentProps> = ({
    loanType,
    loanDescription,
    steps,
    whyChooseUs,
}) => {
    return (
        <div className="min-h-screen flex flex-col gap-10 bg-gray-50">
            <Navbar />

            <motion.div
                className="relative w-full h-[270px] flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Background Image */}
                <motion.div
                    className="w-full absolute inset-0 bg-center pointer-events-none"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                    <Image
                        src="/images/hero.jpg"
                        alt="Centered Image"
                        className="w-full h-[270px] object-cover opacity-10"
                    />
                </motion.div>

                {/* Content Overlay */}
                <motion.div
                    className="absolute z-10 flex flex-col gap-2 rounded-lg text-center py-14 px-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.1, delay: 0.3 }}
                >
                    {/* Loan Type */}
                    <motion.div
                        className="flex flex-col text-homeGray text-xl sm:text-2xl md:text-3xl font-bold"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.5 }}
                    >
                        <p>{loanType}</p>
                    </motion.div>

                    {/* Loan Description */}
                    <motion.p
                        className="text-base text-homeGray w-[70%] mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        {loanDescription}
                    </motion.p>

                    {/* Button */}
                    <motion.div
                        className="flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.1, delay: 0.8 }}
                    >
                        <ReusableButton
                            label="Get Started"
                            link="dashboard/loan"
                            variant="contained"
                            className="rounded-full md:px-10"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Why Choose Us Section */}
            <div className="relative mx-[10%] rounded-t-[30px] flex flex-col justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.1 }}
                    className="bg-primaryWhite px-6 md:px-20 py-10"
                >
                    <h1 className="text-3xl text-center text-homeSecondary font-bold">
                        Why Choose <span className="text-homePrimary">{loanType}?</span>
                    </h1>
                    <h2 className="text-homeGray text-center font-normal text-base mt-3 mb-20">
                        Empowering Real Estate Investors with Customized Financing Options
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {whyChooseUs.map((data, index) => (
                            <motion.div
                                key={data.title}
                                className="h-full cursor-pointer transition-transform transform hover:scale-105 bg-white p-4 rounded-lg shadow-lg flex flex-col gap-3"
                                whileHover={{ scale: 1.1 }}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.1,
                                    delay: index * 0.2,
                                }}
                            >
                                <div className="flex gap-4">
                                    <div className="flex justify-center items-center text-homePrimary rounded-md border-homeBorder border w-11 h-11 bg-homeBackground">
                                        {data.icon}
                                    </div>
                                    <h1 className="text-homeSecondary font-medium my-3 text-lg">
                                        {data.title}
                                    </h1>
                                </div>
                                <p className="text-sm text-homeGray">{data.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Steps Section */}
            <div className="flex flex-col items-center justify-center mx-[10%] text-white">
                <h2 className="text-2xl font-bold mb-8 text-homeSecondary">How it Works</h2>
                <div className="w-full flex flex-col justify-center items-center md:flex-row gap-8">
                    {steps.map((step) => (
                        <StepCard
                            key={step.title}
                            
                            title={step.title}
                            description={step.description}
                            isActive={step.step === 3}
                        />
                    ))}
                </div>
            </div>

            <ApplyLoan />
            <InformationSection />
        </div>
    );
};

export default LendComponent;
