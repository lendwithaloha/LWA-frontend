'use client';

import React from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { LoanDetailsState, markFormCompleted, updateField } from '@/store/slice/generalInformationSlices/loanDetailsSlice';


const ProvideLoanDetails: React.FC = () => {
  const dispatch = useDispatch();

  const {
    assignmentFees,
    loanPurpose,
    isApplicationSubmitted,
    isRehabFundRequested,
    propertyValueAfterRepair,
    purchasePrice,
    rehabAmount,
    sellerConcessions

  } = useSelector((state: RootState) => state.loanDetails);


  function parseCurrency(value: string) {
    return parseFloat(value.replace(/[^0-9.-]+/g, ""));
  }

  // Correct handleInputChange function
  const handleInputChange = <T extends keyof LoanDetailsState>(
    field: T,
    value: LoanDetailsState[T]
  ) => {
    dispatch(updateField({ field, value }));
  };


  const handleSave = ()=>{
    dispatch(markFormCompleted())
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      {/* Alert */}
      {
       isApplicationSubmitted && ( <Alert severity="info" className="mb-6">
          Loan Application fields are locked. Changes to your loan cannot be made
          because your loan has been fully approved by Underwriting.
        </Alert>)
      }

      {/* Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-2">
        Loan Details
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-8">
        Below are all of the details we have about your client’s deal. If you
        have to change these details, you may do so below. Please note that
        changes may affect your Loan-to-Value or your rate.
      </Typography>

      {/* Form */}
      <Box
        component="form"
        className="space-y-6 max-w-3xl mx-0"
        noValidate
        autoComplete="off"
      >
        {/* Purpose of Loan Dropdown */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>Purpose of Loan</InputLabel>
          <Select
            value={loanPurpose}
            onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
            label="Purpose of Loan"
          >
            <MenuItem value="New Purchase">New Purchase</MenuItem>
            <MenuItem value="Refinance">Refinance</MenuItem>
            <MenuItem value="Cash-Out Refinance">Cash-Out Refinance</MenuItem>
          </Select>
        </FormControl>

        {/* Purchase Price */}
        <TextField
          label="Purchase Price"
          fullWidth
          value={purchasePrice}
          onChange={(e) => handleInputChange("purchasePrice",parseCurrency(e.target.value))}
          disabled= { isApplicationSubmitted}
          variant="outlined"
         
        />

        {/* As-Is Property Value */}
        <TextField
          label="As-Is Property Value"
          fullWidth
          value={purchasePrice}
          onChange={(e) => handleInputChange("purchasePrice",parseCurrency(e.target.value))}
          disabled= { isApplicationSubmitted}
          variant="outlined"
        />

        {/* Will You Request Rehab Funds Dropdown */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>Will You Request Rehab Funds?</InputLabel>
          <Select
            value={isRehabFundRequested ? "Yes" : "No"} // Convert boolean to string for Select
            onChange={(e) =>
              handleInputChange("isRehabFundRequested", e.target.value === "Yes")
            } // Convert string back to boolean
            label="Will You Request Rehab Funds?"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>

        </FormControl>

        {/* Rehab Amount Requested (Optional) */}
        <TextField
          label="Rehab Amount Requested (optional)"
          value={rehabAmount}
          onChange={(e) => handleInputChange("rehabAmount", parseCurrency(e.target.value))}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"

        />

        {/* After Repair Property Value (Optional) */}
        <TextField
          label="After Repair Property Value (optional)"
          value={propertyValueAfterRepair}
          onChange={(e) => handleInputChange("propertyValueAfterRepair", parseCurrency(e.target.value))}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />

        {/* Seller Concessions (Optional) */}
        <TextField
          label="Seller Concessions (optional)"

          value={sellerConcessions}
          onChange={(e) => handleInputChange("sellerConcessions", parseCurrency(e.target.value))}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />

        {/* Assignment Fees (Optional) */}
        <TextField
          label="Assignment Fees (optional)"
          value={assignmentFees}
          onChange={(e) => handleInputChange("assignmentFees", parseCurrency(e.target.value))}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />

        {/* Save and Continue */}
        <div className="flex justify-start mt-6">
          <Button
          onClick={handleSave}
            variant="contained"
            color="primary"
            className="bg-primary hover:bg-primary-dark"
          >
            Save and Continue
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default ProvideLoanDetails;
