"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Tabs,
  Tab,
} from "@mui/material";
import { motion } from "framer-motion";
import RESForm, { FormData } from "./RESForm";
import { Tooltip } from "@/components/common/ToolTip";
import { Help } from "@mui/icons-material";

interface RealEstateModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RealEstateModal({ open, onClose }: RealEstateModalProps) {
  const [secondOpen, setSecondOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [tabValue, setTabValue] = useState("annually");

  const [formData, setFormData] = useState<FormData>({
    address: "",
    property_type: "",
    entity_vesting: "",
    ownership_percentage: 0,
    acquisition_date: "",
    acquisition_price: 0,
    budget_completed: 0,
    budget_remaining: 0,
    investment_strategy: "Fix and Flip",
    current_market_value: 0,
    loan_balance: 0,
    current_mortgage_payment: 0,
    tax_amount_timespan: "annually",
    tax_amount: 0,
    insurance_amount_timespan: "annually",
    insurance_amount: 0,
    status: "Rental (Leased)",
    disposition_date: "",
    disposition_price: 0,
    category: "",
  });

  const handleCategorySelection = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setFormData((prev) => ({
      ...prev,
      category: selectedCategory,
    }));
    setSecondOpen(true);
  };

  const handleSubmit = () => {
    console.log("Submitting Form Data:", { formData });
  };


  return (
    <>
      {/* First Modal */}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md"   PaperProps={{
    sx: {
      height: '400px', // Fixed height
      display: 'flex',
      flexDirection: 'column'
    }
  }}
   >
        <DialogTitle className="flex justify-between items-center bg-gray-100 p-4">
          <span className="text-lg font-semibold text-gray-800">Add Real Estate Schedule</span>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 transition">
            ✕
          </button>
        </DialogTitle>
        <DialogContent className="flex flex-col items-center p-6" >
          <p className="text-center text-gray-700 text-base mt-6">
            Choose the current ownership status of the property
          </p>

          <div className="flex flex-col gap-4 mt-6 w-full max-w-md">
            <div>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleCategorySelection("Owned")}
                className="border-gray-400 text-gray-700 hover:border-gray-600 py-3 hover:text-gray-900 flex gap-5"
              >
                <span>
                  Owned
                </span>
                <Tooltip text="
Add any real estate you currently own (primary) residence, rental properties, active rehabs/construction etc). This also will be used to calculate your net worth." children={<Help />} />
                </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleCategorySelection("Sold")}
                className="border-gray-400 text-gray-700 hover:border-gray-600 py-3 hover:text-gray-900 flex gap-5"
              >
                <span>
                  Sold
                </span>
                <Tooltip text="
Add any real estate you currently own (primary residence, rental properties, active rehabs/construction etc). This also will be used to
calculate your net worth." children={<Help />} />

              </Button>
            </div>



          </div>
        </DialogContent>
      </Dialog>


      {/* Second Modal */}
      <Dialog open={secondOpen} onClose={() => setSecondOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Property Details</DialogTitle>
        <DialogContent>
          <RESForm formData={formData} setFormData={setFormData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSecondOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
