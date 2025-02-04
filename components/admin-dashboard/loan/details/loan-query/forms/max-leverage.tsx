import { InputAdornment, Switch, TextField } from "@mui/material";
import React from "react";
import { LoanQueryFormData } from "../loan-query";

interface MaxLeverageProps {
  formData: LoanQueryFormData;
  handleChange: (
    name: keyof LoanQueryFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSwitchChange: (
    name: keyof LoanQueryFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaxLeverage: React.FC<MaxLeverageProps> = ({
  formData,
  handleChange,
  handleSwitchChange,
}) => {
  return (
    <div>
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Loan Amount Requested</h3>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Max Leverage</span>
          <Switch
            checked={formData.maxLeverage}
            onChange={handleSwitchChange("maxLeverage")}
          />
        </div>

        {formData.maxLeverage && (
          <p className="text-sm text-gray-600">
            We will prioritize the least amount of cash out of pocket for you,
            maximizing use of Other People's Money (OPM)
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 items-center">
          <div>
            <p>Specific LTV</p>
            <TextField
              fullWidth
              name="specificLTV"
              value={formData.specificLTV}
              onChange={handleChange("specificLTV")}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              placeholder="Enter here"
            />
          </div>
          <div>
            <p>Specific Loan Amount</p>
            <TextField
              fullWidth
              name="specificLoanAmount"
              value={formData.specificLoanAmount}
              onChange={handleChange("specificLoanAmount")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              placeholder="Enter here"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaxLeverage;
