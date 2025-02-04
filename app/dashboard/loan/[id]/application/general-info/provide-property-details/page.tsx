"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Typography,
  Box,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ReusableButton from "@/components/common_btn";
import { RootState } from "@/store/store";
import { updateField,markFormCompleted } from '@/store/slice/csm/applicationSlice';
import LockedAlert from "@/components/dashboard/loan/application/common/alert";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const ProvidePropertyDetails: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = 'generalInfo';
  const subTabKey = 'propertyDetails';
  
  const {fields} = useSelector((state: RootState) => state.application.tabs[tabKey].subTabs[subTabKey] );
  const {isApplicationSubmitted} = useSelector((state: RootState) => state.application);

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
      {isApplicationSubmitted && (
        <LockedAlert />
      )}

      {/* Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-2">
        Property Details
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-4">
        Below are all of the details we have about your client’s deal. If you
        have to change these details, you may do so below. Please note that
        changes may affect your Loan-to-Value or your rate.
      </Typography>
      <Typography variant="body2" className="text-gray-500 mb-8">
        To revise the address on this loan application, please reach out to your
        account manager:{" "}
        <Link href="tel:415-237-6425" className="text-primary">
          Michael Rico at 415-237-6425
        </Link>{" "}
        or{" "}
        <Link href="mailto:mike@lendinghome.com" className="text-primary">
          mike@lendinghome.com
        </Link>
        .
      </Typography>

      {/* Form */}
      <Box
        component="form"
        className="space-y-6 max-w-3xl mx-0"
        noValidate
        autoComplete="off"
      >
        {/* Address */}
        <TextField
          label="Address"
          value={fields.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          fullWidth
          variant="outlined"
          InputProps={{ readOnly: true }}
        />

        {/* Property Type Dropdown */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>Property Type</InputLabel>
          <Select
            value={fields.propertyType}
            onChange={(e) => handleInputChange("propertyType", e.target.value)}
            label="Property Type"
          >
            <MenuItem value="Single-Family Home">Single-Family Home</MenuItem>
            <MenuItem value="Multi-Family Home">Multi-Family Home</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Land">Land</MenuItem>
          </Select>
        </FormControl>

        {/* Do You Plan to Occupy the Property Dropdown */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>Do you plan to occupy the property?</InputLabel>
          <Select
            value={fields.isOccupied}
            onChange={(e) =>
              handleInputChange("isOccupied", e.target.value === "true")
            }
            label="Do you plan to occupy the property?"
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>

        {/* Accepted Purchase Contract Dropdown */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>Accepted Purchase Contract?</InputLabel>
          <Select
            value={fields.isPurchaseContractAccepted ? "true" : "false"}
            onChange={(e) =>
              handleInputChange(
                "isPurchaseContractAccepted",
                e.target.value === "true"
              )
            }
            label="Accepted Purchase Contract?"
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>

        {/* Contract End Date (Date Input) */}
        <TextField
          label="Contract End Date"
          type="date"
          value={fields.contactEndDate}
          onChange={(e) => handleInputChange("contactEndDate", e.target.value)}
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true, // Ensures the label stays above the field
          }}
        />

        {/* Save and Continue */}
        <div className="flex justify-start mt-6">
          <ReusableButton
            label="SAVE AND CONTINUE"
            onTap={handleSave}
            // disabled={isFormCompleted || isApplicationSubmitted}
          />
        </div>
      </Box>
    </div>
  );
};

export default ProvidePropertyDetails;
