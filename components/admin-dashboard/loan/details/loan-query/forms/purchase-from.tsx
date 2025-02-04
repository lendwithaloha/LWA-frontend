import React from "react";
import { LoanQueryFormData } from "../loan-query";
import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";

interface PurchaseFormProps {
  formData: LoanQueryFormData;
  handleChange: (
    name: keyof LoanQueryFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const PurchaseForm: React.FC<PurchaseFormProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center my-3">
        <Typography component="legend" className="text-lg font-medium ">
          Are you purchasing or refinancing the property?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            name="purchaseType"
            value={formData.propertyUnderContract}
            onChange={handleChange("propertyUnderContract")}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          <p>Purchase price</p>
          <TextField
            value={formData.purchasePrice}
            placeholder="Enter here"
            onChange={handleChange("purchasePrice")}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p>Close of Escrow</p>
          <TextField
            value={formData.closeOfEscrow}
            onChange={handleChange("closeOfEscrow")}
            placeholder="Enter here"
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
