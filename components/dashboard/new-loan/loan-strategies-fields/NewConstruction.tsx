"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, MenuItem, Select, FormControl, Button } from "@mui/material";
import UploadZone from "./UploadZone";
import { SelectChangeEvent } from "@mui/material";
import SubmissionModal from "../../common/SubmissionModal";

interface FormDetails {
  projectAddress: string;
  propertyType: string;
  cityStateZip: string;
  lotSize: string;
  estimatedConstructionCost: string;
  expectedCompletionDate: string;
  projectStartDate: string;
  projectEndDate: string;
  preferredLoanTerm: string;
  loanAmount: string;
  purposeOfLoan: string;
  interestRatePreference: string;
  estimatedClosingDate: string;
}

interface ErrorState {
  [key: string]: string;
}

const NewConstruction: React.FC = () => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    projectAddress: "",
    propertyType: "",
    cityStateZip: "",
    lotSize: "",
    estimatedConstructionCost: "",
    expectedCompletionDate: "",
    projectStartDate: "",
    projectEndDate: "",
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
      "propertyType",
      "cityStateZip",
      "estimatedConstructionCost",
      "projectStartDate",
      "projectEndDate",
      "loanAmount",
      "purposeOfLoan",
      "estimatedClosingDate",
      "preferredLoanTerm",
      "interestRatePreference",
    ];

    requiredFields.forEach((field) => {
      if (!formDetails[field]) newErrors[field] = "This field is required";
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setModalOpen(true); // Open modal to confirm submission

      console.log("Form submitted:", formDetails);
      // Perform API submission
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Project Details Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Project Details
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
          Property Type
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter property type"
          value={formDetails.propertyType}
          onChange={handleInputChange("propertyType")}
          error={!!errors.propertyType}
          helperText={errors.propertyType}
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
          Lot Size (Sq. Ft.)
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter lot size in square feet"
          value={formDetails.lotSize}
          onChange={handleInputChange("lotSize")}
        />
      </Box>

      {/* Construction Details Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Construction Details
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Estimated Construction Cost
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter estimated construction cost"
          value={formDetails.estimatedConstructionCost}
          onChange={handleInputChange("estimatedConstructionCost")}
          error={!!errors.estimatedConstructionCost}
          helperText={errors.estimatedConstructionCost}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Expected Completion Date
        </Typography>
        <TextField
          fullWidth
          type="date"
          value={formDetails.expectedCompletionDate}
          onChange={handleInputChange("expectedCompletionDate")}
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Project Start Date
        </Typography>
        <TextField
          fullWidth
          type="date"
          value={formDetails.projectStartDate}
          onChange={handleInputChange("projectStartDate")}
          InputLabelProps={{ shrink: true }}
          error={!!errors.projectStartDate}
          helperText={errors.projectStartDate}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Project End Date
        </Typography>
        <TextField
          fullWidth
          type="date"
          value={formDetails.projectEndDate}
          onChange={handleInputChange("projectEndDate")}
          InputLabelProps={{ shrink: true }}
          error={!!errors.projectEndDate}
          helperText={errors.projectEndDate}
        />
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
        <TextField
          fullWidth
          placeholder="Enter purpose of loan"
          value={formDetails.purposeOfLoan}
          onChange={handleInputChange("purposeOfLoan")}
          error={!!errors.purposeOfLoan}
          helperText={errors.purposeOfLoan}
        />
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

export default NewConstruction;
