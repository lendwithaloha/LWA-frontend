"use client";
import React, { useState } from "react";
import { Button, Card, IconButton } from "@mui/material";
import { HelpOutline, ExpandMore, ChevronRight } from "@mui/icons-material";
import PropertyUpdateDrawer from "@/components/dashboard/loan/PropertyUpdateDrawer";

interface Loan {
  id: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyType: string;
  entity: string;
  percentageOwnership: number;
  investmentStrategy: string;
  acquisitionDate: string;
  acquisitionPrice: number;
  status: string;
  isBudgetCompleted: boolean;
  budgetReason: string;
  isRented: boolean;
  rentalIncome: number;
  isTiedToLoan: boolean;
  loanBalance: number;
  contractPrice: number;
  currentMarketValue: number;
}

interface HelpModalProps {
  loan: Loan;
}

const HELP_OPTIONS = [
  { name: "Change Quote", key: "quote" },
  { name: "Change Request Amount", key: "requestAmount" },
  { name: "Change Property", key: "property" },
  { name: "Change Investment Strategy", key: "investmentStrategy" },
];

const HelpModal: React.FC<HelpModalProps> = ({ loan }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (optionKey: string) => {
    setSelectedOption(optionKey);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Card className="fixed bottom-24  max-sm:right-2 max-sm:bottom-0 right-10 w-[400px] shadow-lg animate-in fade-in slide-in-from-bottom-4 rounded-lg bg-white p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">What would you like to do?</span>
            <IconButton onClick={() => setIsOpen(false)}>
              <ExpandMore className="text-gray-600" />
            </IconButton>
          </div>
          <div className="mt-4">
            <ul className="space-y-4">
              {HELP_OPTIONS.map((option, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition"
                  onClick={() => handleOptionClick(option.key)}
                >
                  <div className="text-gray-800 font-medium flex items-center">
                    <span className="flex-grow">{option.name}</span>
                    <ChevronRight className="text-gray-500" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-0 right-4 max-sm:right-1 min-w-0 max-sm:m-2 m-10 p-3 rounded-full shadow-lg bg-black hover:bg-gray-800 transition-transform"
      >
        {isOpen ? (
          <ExpandMore className="text-white text-[30px] max-sm:text-[23px]" />
        ) : (
          <HelpOutline className="text-white text-[30px] max-sm:text-[23px]" />
        )}
      </Button>

      {/* Single Drawer for all options */}
      <PropertyUpdateDrawer
        visible={isDrawerOpen}
        onClose={closeDrawer}
        propertyData={{
          ...loan, // Pass loan details directly
          entity: selectedOption || loan.entity, // Show which update is being made
        }}
      />
    </>
  );
};

export default HelpModal;
