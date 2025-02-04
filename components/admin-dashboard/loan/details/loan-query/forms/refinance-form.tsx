import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React from "react";
import { LoanQueryFormData } from "../loan-query";

interface RefinanceFormProps {
  formData: LoanQueryFormData;
  handleChange: (
    name: keyof LoanQueryFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const RefinanceForm: React.FC<RefinanceFormProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div>
      {" "}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <p>Original purchase price</p>
          <TextField
            fullWidth
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange("originalPrice")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            placeholder="Enter here"
          />
        </div>
        <div className="flex flex-col gap-3">
          <p>Estimated As-is value</p>
          <TextField
            fullWidth
            name="estimatedValue"
            value={formData.estimatedValue}
            onChange={handleChange("estimatedValue")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            placeholder="Enter here"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">
              SOW Completed Since Purchase
            </span>
            <Tooltip title="Scope of Work completed since original purchase">
              <IconButton size="small">
                <HelpOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
          <TextField
            fullWidth
            name="improvements"
            value={formData.improvements}
            onChange={handleChange("improvements")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            placeholder="Enter here"
          />
        </div>
        <div className="flex flex-col gap-3">
          <p>Current unpaid loan balance</p>
          <TextField
            fullWidth
            name="currentBalance"
            value={formData.currentBalance}
            onChange={handleChange("currentBalance")}
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
  );
};

export default RefinanceForm;
