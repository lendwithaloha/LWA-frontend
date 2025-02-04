"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, MenuItem, Select, FormControl, Button } from "@mui/material";
import UploadZone from "./UploadZone";
import { SelectChangeEvent } from "@mui/material";
import SubmissionModal from "../../common/SubmissionModal";

interface FormDetails {
  propertyType: string;
  propertyValue: string;
  propertyLocation: string;
  preferredLoanTerm: string;
  purposeOfLoan: string;
  loanAmount: string;
  interestRatePreference: string;
  estimatedClosingDate: string;
}

interface ErrorState {
  [key: string]: string;
}

const DSCR: React.FC = () => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    propertyType: "",
    propertyValue: "",
    propertyLocation: "",
    preferredLoanTerm: "",
    purposeOfLoan: "",
    loanAmount: "",
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
      "propertyType",
      "propertyValue",
      "propertyLocation",
      "preferredLoanTerm",
      "purposeOfLoan",
      "loanAmount",
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
    <Box >
      <Typography variant="h6" sx={{ mb: 4 }}>
        DSCR Loan Inquiry
      </Typography>

      {/* Property Details Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Property Details
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Property Type
        </Typography>
        <FormControl fullWidth>
          <Select
            value={formDetails.propertyType}
            onChange={handleSelectChange("propertyType")}
            displayEmpty
          >
            <MenuItem value="">Choose</MenuItem>
            <MenuItem value="Residential">Residential</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Mixed Use">Mixed Use</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Property Value
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter property value"
          value={formDetails.propertyValue}
          onChange={handleInputChange("propertyValue")}
          error={!!errors.propertyValue}
          helperText={errors.propertyValue}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Property Location
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter property location"
          value={formDetails.propertyLocation}
          onChange={handleInputChange("propertyLocation")}
          error={!!errors.propertyLocation}
          helperText={errors.propertyLocation}
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
        <FormControl fullWidth>
          <Select
            value={formDetails.preferredLoanTerm}
            onChange={handleSelectChange("preferredLoanTerm")}
            displayEmpty
          >
            <MenuItem value="">Choose</MenuItem>
            <MenuItem value="Short Term">Short Term</MenuItem>
            <MenuItem value="Long Term">Long Term</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Purpose of Loan
        </Typography>
        <FormControl fullWidth>
          <Select
            value={formDetails.purposeOfLoan}
            onChange={handleSelectChange("purposeOfLoan")}
            displayEmpty
          >
            <MenuItem value="">Choose</MenuItem>
            <MenuItem value="Purchase">Purchase</MenuItem>
            <MenuItem value="Refinance">Refinance</MenuItem>
          </Select>
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
        <FormControl fullWidth>
          <Select
            value={formDetails.interestRatePreference}
            onChange={handleSelectChange("interestRatePreference")}
            displayEmpty
          >
            <MenuItem value="">Fixed/Variable Rate</MenuItem>
            <MenuItem value="Fixed">Fixed</MenuItem>
            <MenuItem value="Variable">Variable</MenuItem>
          </Select>
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

      {/* Supporting Document Upload Section */}
   

      <UploadZone
        title="Supporting Documents"
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

export default DSCR;
