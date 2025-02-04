"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, MenuItem, Select, FormControl, Button } from "@mui/material";
import UploadZone from "./UploadZone";
import { SelectChangeEvent } from "@mui/material";
import SubmissionModal from "../../common/SubmissionModal";

interface FormDetails {
  projectAddress: string;
  cityStateZip: string;
  purchasePrice: string;
  afterRepairValue: string;
  expectedMonthlyRentalIncome: string;
  renovationCosts: string;
  timelineForRepairs: string;
  exitStrategy: string;
  preferredLoanTerm: string;
  loanAmount: string;
  purposeOfLoan: string;
  interestRatePreference: string;
  estimatedClosingDate: string;
}

interface ErrorState {
  [key: string]: string;
}

const B4R: React.FC = () => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    projectAddress: "",
    cityStateZip: "",
    purchasePrice: "",
    afterRepairValue: "",
    expectedMonthlyRentalIncome: "",
    renovationCosts: "",
    timelineForRepairs: "",
    exitStrategy: "",
    preferredLoanTerm: "",
    loanAmount: "",
    purposeOfLoan: "",
    interestRatePreference: "",
    estimatedClosingDate: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const handleInputChange =
    (field: keyof FormDetails) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormDetails({ ...formDetails, [field]: event.target.value });
      setErrors({ ...errors, [field]: "" });
    };

  const handleSelectChange = (field: keyof FormDetails) => (event: SelectChangeEvent<string>) => {
    setFormDetails({ ...formDetails, [field]: event.target.value });
    setErrors({ ...errors, [field]: "" });
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false); // Close modal after success
  };

  const handleSubmit = () => {
    const newErrors: ErrorState = {};
    const requiredFields: (keyof FormDetails)[] = [
      "projectAddress",
      "cityStateZip",
      "purchasePrice",
      "afterRepairValue",
      "expectedMonthlyRentalIncome",
      "renovationCosts",
      "timelineForRepairs",
      "exitStrategy",
      "loanAmount",
      "purposeOfLoan",
      "preferredLoanTerm",
      "estimatedClosingDate",
    ];
    requiredFields.forEach((field) => {
      if (!formDetails[field]) newErrors[field] = "This field is required";
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setModalOpen(true);
      console.log("Form submitted:", formDetails);
      // Perform API submission
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 4 }}>
        BRRRR Method Loan Inquiry
      </Typography>

      {/* Property Information Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Property Information
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Project Address
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter project address"
          value={formDetails.projectAddress}
          onChange={handleInputChange("projectAddress")}
          error={!!errors.projectAddress}
          helperText={errors.projectAddress}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          City/State/ZIP
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter city, state, ZIP"
          value={formDetails.cityStateZip}
          onChange={handleInputChange("cityStateZip")}
          error={!!errors.cityStateZip}
          helperText={errors.cityStateZip}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Purchase Price
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter purchase price"
          value={formDetails.purchasePrice}
          onChange={handleInputChange("purchasePrice")}
          error={!!errors.purchasePrice}
          helperText={errors.purchasePrice}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Estimated After-Repair Value (ARV)
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter ARV"
          value={formDetails.afterRepairValue}
          onChange={handleInputChange("afterRepairValue")}
          error={!!errors.afterRepairValue}
          helperText={errors.afterRepairValue}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Expected Monthly Rental Income
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter expected rental income"
          value={formDetails.expectedMonthlyRentalIncome}
          onChange={handleInputChange("expectedMonthlyRentalIncome")}
          error={!!errors.expectedMonthlyRentalIncome}
          helperText={errors.expectedMonthlyRentalIncome}
        />
      </Box>

      {/* Renovation Details Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Renovation Details
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Renovation Costs
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter renovation costs"
          value={formDetails.renovationCosts}
          onChange={handleInputChange("renovationCosts")}
          error={!!errors.renovationCosts}
          helperText={errors.renovationCosts}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Timeline for Repairs (Months)
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter timeline in months"
          value={formDetails.timelineForRepairs}
          onChange={handleInputChange("timelineForRepairs")}
          error={!!errors.timelineForRepairs}
          helperText={errors.timelineForRepairs}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Exit Strategy
        </Typography>
        <FormControl fullWidth error={!!errors.exitStrategy}>
          <Select
            value={formDetails.exitStrategy}
            onChange={handleSelectChange("exitStrategy")}
            displayEmpty
          >
            <MenuItem value="">Choose</MenuItem>
            <MenuItem value="Sell">Sell</MenuItem>
            <MenuItem value="Hold and Rent">Hold and Rent</MenuItem>
          </Select>
          {errors.exitStrategy && (
            <Typography color="error" variant="body2">
              {errors.exitStrategy}
            </Typography>
          )}
        </FormControl>
      </Box>

      {/* Loan Details Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Loan Details
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Preferred Loan Term
        </Typography>
        <FormControl fullWidth error={!!errors.preferredLoanTerm}>
          <Select
            value={formDetails.preferredLoanTerm}
            onChange={handleSelectChange("preferredLoanTerm")}
            displayEmpty
          >
            <MenuItem value="">Choose</MenuItem>
            <MenuItem value="Short Term">Short Term</MenuItem>
            <MenuItem value="Long Term">Long Term</MenuItem>
          </Select>
          {errors.preferredLoanTerm && (
            <Typography color="error" variant="body2">
              {errors.preferredLoanTerm}
            </Typography>
          )}
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Purpose of Loan
        </Typography>
        <FormControl fullWidth error={!!errors.purposeOfLoan}>
          <Select
            value={formDetails.purposeOfLoan}
            onChange={handleSelectChange("purposeOfLoan")}
            displayEmpty
          >
            <MenuItem value="">Choose</MenuItem>
            <MenuItem value="Purchase">Purchase</MenuItem>
            <MenuItem value="Renovation">Renovation</MenuItem>
            <MenuItem value="Refinance">Refinance</MenuItem>
          </Select>
          {errors.purposeOfLoan && (
            <Typography color="error" variant="body2">
              {errors.purposeOfLoan}
            </Typography>
          )}
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Loan Amount
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter loan amount"
          value={formDetails.loanAmount}
          onChange={handleInputChange("loanAmount")}
          error={!!errors.loanAmount}
          helperText={errors.loanAmount}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Interest Rate Preference (Optional)
        </Typography>
        <FormControl fullWidth error={!!errors.interestRatePreference}>
          <Select
            value={formDetails.interestRatePreference}
            onChange={handleSelectChange("interestRatePreference")}
            displayEmpty
          >
            <MenuItem value="">Fixed/Variable Rate</MenuItem>
            <MenuItem value="Fixed">Fixed</MenuItem>
            <MenuItem value="Variable">Variable</MenuItem>
          </Select>
          {errors.interestRatePreference && (
            <Typography color="error" variant="body2">
              {errors.interestRatePreference}
            </Typography>
          )}
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Estimated Closing Date
        </Typography>
        <TextField
          fullWidth
          type="date"
          value={formDetails.estimatedClosingDate}
          onChange={handleInputChange("estimatedClosingDate")}
          InputLabelProps={{ shrink: true }}
          error={!!errors.estimatedClosingDate}
          helperText={errors.estimatedClosingDate}
        />
      </Box>

      <UploadZone
        title="Supporting Documents (Optional)"
        onUploadComplete={(files) => console.log("Uploaded files:", files)}
      />

      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit Inquiry
        </Button>
      </Box>
      <SubmissionModal open={isModalOpen} onClose={handleCloseModal} />

    </Box>
  );
};

export default B4R;
