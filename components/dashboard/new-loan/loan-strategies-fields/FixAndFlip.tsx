"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import UploadZone from "./UploadZone";
import SubmissionModal from "../../common/SubmissionModal";


const FixAndFlip: React.FC = () => {
  const [loanDetails, setLoanDetails] = useState({
    propertyType: "",
    propertyValue: "",
    cityStateZip: "",
    purchasePrice: "",
    renovationBudget: "",
    estimatedARV: "",
    downPaymentAmount: "",
    creditScoreRange: "",
    preferredLoanTerm: "",
    loanAmount: "",
    purposeOfLoan: "",
    interestRatePreference: "",
    estimatedClosingDate: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLoanDetails({ ...loanDetails, [field]: event.target.value });
      setErrors({ ...errors, [field]: "" }); // Clear error when input changes
    };

  const handleSelectChange = (field: string) => (event: SelectChangeEvent<string>) => {
    setLoanDetails({ ...loanDetails, [field]: event.target.value });
    setErrors({ ...errors, [field]: "" }); // Clear error when selection changes
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!loanDetails.propertyType) newErrors.propertyType = "Property type is required";
    if (!loanDetails.propertyValue) newErrors.propertyValue = "Property value is required";
    if (!loanDetails.cityStateZip) newErrors.cityStateZip = "City, State, and ZIP is required";
    if (!loanDetails.purchasePrice) newErrors.purchasePrice = "Purchase price is required";
    if (!loanDetails.renovationBudget) newErrors.renovationBudget = "Renovation budget is required";
    if (!loanDetails.estimatedARV) newErrors.estimatedARV = "Estimated ARV is required";
    if (!loanDetails.loanAmount) newErrors.loanAmount = "Loan amount is required";
    if (!loanDetails.estimatedClosingDate) newErrors.estimatedClosingDate = "Closing date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false); // Close modal after success
  };

  const handleSubmit = () => {
    if (validateFields()) {
      setModalOpen(true); // Open modal to confirm submission
      console.log("Form submitted:", loanDetails);
      // Perform further actions like API submission here
    }
  };

  return (
    <Box sx={{ width: "100%", }}>

      {/* Property Information Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Property Information
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Property Type
        </Typography>
        <FormControl fullWidth error={!!errors.propertyType}>
          <Select
            value={loanDetails.propertyType}
            onChange={handleSelectChange("propertyType")}
            displayEmpty
          >
            <MenuItem value="">Choose</MenuItem>
            <MenuItem value="Residential">Residential</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
          </Select>
          <Typography variant="caption" color="error">
            {errors.propertyType}
          </Typography>
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Property Value
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter property value"
          value={loanDetails.propertyValue}
          onChange={handleInputChange("propertyValue")}
          error={!!errors.propertyValue}
          helperText={errors.propertyValue}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          City/State/ZIP
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter location"
          value={loanDetails.cityStateZip}
          onChange={handleInputChange("cityStateZip")}
          error={!!errors.cityStateZip}
          helperText={errors.cityStateZip}
        />
      </Box>

      {/* Financial Information Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Financial Information
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Purchase Price
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter purchase price"
          value={loanDetails.purchasePrice}
          onChange={handleInputChange("purchasePrice")}
          error={!!errors.purchasePrice}
          helperText={errors.purchasePrice}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Renovation Budget
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter renovation budget"
          value={loanDetails.renovationBudget}
          onChange={handleInputChange("renovationBudget")}
          error={!!errors.renovationBudget}
          helperText={errors.renovationBudget}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Estimated After Repair Value (ARV)
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter estimated ARV"
          value={loanDetails.estimatedARV}
          onChange={handleInputChange("estimatedARV")}
          error={!!errors.estimatedARV}
          helperText={errors.estimatedARV}
        />
      </Box>

      {/* Loan Details Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Loan Details
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Loan Amount
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter loan amount"
          value={loanDetails.loanAmount}
          onChange={handleInputChange("loanAmount")}
          error={!!errors.loanAmount}
          helperText={errors.loanAmount}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Estimated Closing Date
        </Typography>
        <TextField
          fullWidth
          type="date"
          value={loanDetails.estimatedClosingDate}
          onChange={handleInputChange("estimatedClosingDate")}
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

export default FixAndFlip;
