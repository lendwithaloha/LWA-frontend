import React, { useState } from "react";
import AddressField from "../../../../../app/dashboard/loan/loan-request/components/common/AddressField";
import TextOnlyInput from "./TextOnlyInput";
import DateInput from "./DateInput";
import FormattedNumberInput from "./FNInputField";
import { Tooltip } from "@/components/common/ToolTip";
import { Help } from "@mui/icons-material";
import TabInput from "../../../../../app/dashboard/loan/loan-request/components/TabInput";

export interface FormData {
    category: string;
    address: string;
    property_type: string;
    entity_vesting: string;
    ownership_percentage: number;
    acquisition_date: string;
    acquisition_price: number;
    budget_completed: number;
    budget_remaining: number;
    investment_strategy: string;
    current_market_value: number;
    loan_balance: number;
    current_mortgage_payment: number;
    tax_amount_timespan: string;
    tax_amount: number;
    insurance_amount_timespan: string;
    insurance_amount: number;
    status: string;
    disposition_date: string;
    disposition_price: number;
}

interface RESFormProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const RESForm: React.FC<RESFormProps> = ({ formData, setFormData }) => {
    
    const handleChange = (name: keyof FormData, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col gap-5">
            <h3 className="font-bold text-lg text-gray-800 mb-5">Property Information</h3>
            <div className="flex flex-col md:flex-row w-full gap-3">
                <AddressField
                    label="Street Address/city/state/zip"
                    placeholder="Enter address"
                    onSelect={(address) => handleChange("address", address)}
                />
                <TextOnlyInput label="Property Type" value={formData.property_type} onChange={(value) => handleChange("property_type", value)} placeholder="Auto complete with API" />
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-5">Ownership</h3>
            <div className="flex flex-col md:flex-row w-full gap-3">
                <TextOnlyInput label="Entity/Vesting" value={formData.entity_vesting} onChange={(value) => handleChange("entity_vesting", value)} placeholder="Enter entity" />
                <FormattedNumberInput label="Percentage of Ownership" value={formData.ownership_percentage} onChange={(value) => handleChange("ownership_percentage", value)} placeholder="Enter percentage" />
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-5">Acquisition Details</h3>
            <div className="flex flex-col md:flex-row w-full gap-3">
                <DateInput label="Acquisition Date" value={formData.acquisition_date} onChange={(value) => handleChange("acquisition_date", value)} />
                <FormattedNumberInput label="Acquisition Price" value={formData.acquisition_price} onChange={(value) => handleChange("acquisition_price", value)} placeholder="Enter amount" required />
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-5">SOW Details</h3>
            <Tooltip text="If you did any work to improve the property, show experience to count toward construction/rehab experience" children={<Help />} />
            <div className="flex w-full gap-3">
                <FormattedNumberInput label="Budget Completed" value={formData.budget_completed} onChange={(value) => handleChange("budget_completed", value)} placeholder="Enter amount" required />
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-5">Financial Details</h3>
            <div className="flex flex-col md:flex-row w-full gap-3">
                <FormattedNumberInput label="Current Market Value" value={formData.current_market_value} onChange={(value) => handleChange("current_market_value", value)} placeholder="Enter amount" required />
                <FormattedNumberInput label="Loan Balance" value={formData.loan_balance} onChange={(value) => handleChange("loan_balance", value)} placeholder="Enter amount" required />
                <FormattedNumberInput label="Current Mortgage Payment" value={formData.current_mortgage_payment} onChange={(value) => handleChange("current_mortgage_payment", value)} placeholder="Enter amount" required />
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-5">Tax and Insurance Amount (Optional)</h3>
            <TabInput label="Tax Amount" description="Enter total monthly/annual property tax amount." onValueChange={(value) => handleChange("tax_amount", value)} />
            <TabInput label="Insurance Amount" description="Enter total monthly/annual property insurance premium." onValueChange={(value) => handleChange("insurance_amount", value)} />

            <h3 className="font-bold text-lg text-gray-800 mb-5">Occupancy and Income Details</h3>
            <div className="flex flex-col space-y-2 w-1/2">
                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Investment Strategy</label>
                    <select value={formData.investment_strategy} onChange={(e) => handleChange("investment_strategy", e.target.value)} className="border rounded-md p-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300">
                        <option>Fix and Flip</option>
                        <option>Buy and Hold</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Status</label>
                    <select value={formData.status} onChange={(e) => handleChange("status", e.target.value)} className="border rounded-md p-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300">
                        <option>Rental (Leased)</option>
                        <option>Vacant</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default RESForm;
