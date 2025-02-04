'use client';

import React from 'react';
import {
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateField,markFormCompleted } from '@/store/slice/csm/applicationSlice';
import LockedAlert from '@/components/dashboard/loan/application/common/alert';
import ReusableButton from '@/components/common_btn';
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const ProvideLoanDetails: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = 'generalInfo';
  const subTabKey = 'loanDetails';
  
  const {fields} = useSelector((state: RootState) => state.application.tabs[tabKey].subTabs[subTabKey] );
  const {isApplicationSubmitted} = useSelector((state: RootState) => state.application);

  function parseCurrency(value: string) {
    return parseFloat(value.replace(/[^0-9.-]+/g, ""));
  }

  const handleInputChange = <T extends keyof typeof fields>(
    field: T,
    value: typeof fields[T]
  ) => {
    dispatch(updateField({
      tabKey,
      subTabKey,
      fieldName: field,
      value,
    }));
  };

  const handleSave = () => {
    // Dispatch action to mark the form as completed
    dispatch(markFormCompleted({ tabKey, subTabKey }));
    dispatch(updateSubTabProgress({ tabKey, subTabKey, isCompleted: true }));
  
    // You can also add any other logic, like showing a success message or disabling further changes.
    console.log(`Form in ${subTabKey} is marked as completed.`);
  };
  

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      {/* Alert */}
      {
       isApplicationSubmitted && ( <LockedAlert />)
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
        className="space-y-6 max-w-3xl mx-4"
        noValidate
        autoComplete="off"
      >
        {/* Purpose of Loan Dropdown */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>Purpose of Loan</InputLabel>
          <Select
            value={fields.loanPurpose}
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
          value={fields.purchasePrice}
          onChange={(e) => handleInputChange("purchasePrice",parseCurrency(e.target.value))}
          disabled= { isApplicationSubmitted}
          variant="outlined"
         
        />

        {/* As-Is Property Value */}
        <TextField
          label="As-Is Property Value"
          fullWidth
          value={fields.propertyValueAsIs}
          onChange={(e) => handleInputChange("propertyValueAsIs",parseCurrency(e.target.value))}
          disabled= { isApplicationSubmitted}
          variant="outlined"
        />

        {/* Will You Request Rehab Funds Dropdown */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>Will You Request Rehab Funds?</InputLabel>
          <Select
            value={fields.isRehabFundRequested ? "Yes" : "No"} // Convert boolean to string for Select
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
          value={fields.rehabAmount}
          onChange={(e) => handleInputChange("rehabAmount", parseCurrency(e.target.value))}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"

        />

        {/* After Repair Property Value (Optional) */}
        <TextField
          label="After Repair Property Value (optional)"
          value={fields.propertyValueAfterRepair}
          onChange={(e) => handleInputChange("propertyValueAfterRepair", parseCurrency(e.target.value))}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />

        {/* Seller Concessions (Optional) */}
        <TextField
          label="Seller Concessions (optional)"

          value={fields.sellerConcessions}
          onChange={(e) => handleInputChange("sellerConcessions", parseCurrency(e.target.value))}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />

        {/* Assignment Fees (Optional) */}
        <TextField
          label="Assignment Fees (optional)"
          value={fields.assignmentFees}
          onChange={(e) => handleInputChange("assignmentFees", parseCurrency(e.target.value))}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />

       {/* Save and Continue */}
       <div className="flex justify-start mt-6">
          <ReusableButton label="Save and Continue" onTap={handleSave} />
        </div>
      </Box>
    </div>
  );
};

export default ProvideLoanDetails;
