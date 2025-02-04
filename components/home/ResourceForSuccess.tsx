"use client";

import React, { useState } from "react";

type DropDownProps = {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
};

// Reusable SVG icons
const ArrowUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 inline-block mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const ArrowDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 inline-block mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

// Reusable DropdownItem Component
const DropdownItem = ({ title, content, isOpen, onToggle }: DropDownProps) => (
  <li className="flex flex-col items-start justify-start w-full">
    <div
      className="text-lg text-black no-underline cursor-pointer flex items-center mb-2"
      onClick={onToggle}
    >
      {isOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
      <span className="ml-2">{title}</span>
    </div>
    <div
      className={`dropdown-content overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="p-4 m-3 w-full border-l-2 border-black">{content}</div>
    </div>
  </li>
);

const ResourcesForSuccess = () => {
  const [isOpen, setIsOpen] = useState({
    videoLibrary: false,
    calculators: false,
    marketReports: false,
  });

  const toggle = (item: keyof typeof isOpen) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4">
      <h1 className="text-4xl font-bold text-black mb-6">
        Resources for Success
      </h1>
      <ul className="space-y-4 mt-6 flex flex-col items-start">
        <DropdownItem
          title="Educational Video Library"
          content="Access our curated collection of video tutorials covering various real estate investment strategies and market insights."
          isOpen={isOpen.videoLibrary}
          onToggle={() => toggle("videoLibrary")}
        />
        <DropdownItem
          title="Investment Calculators"
          content="Utilize our suite of financial tools to analyze potential deals, including ROI, cash-on-cash return, and DSCR calculators."
          isOpen={isOpen.calculators}
          onToggle={() => toggle("calculators")}
        />
        <DropdownItem
          title="Market Reports"
          content="Stay informed with our regularly updated reports on real estate trends, emerging markets, and economic indicators."
          isOpen={isOpen.marketReports}
          onToggle={() => toggle("marketReports")}
        />
      </ul>
    </div>
  );
};

export default ResourcesForSuccess;
