"use client";

import React from "react";
import { TextField, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ReusableButton from "@/components/common_btn";
import { updateField, markFormCompleted } from '@/store/slice/csm/applicationSlice';
import LockedAlert from '@/components/dashboard/loan/application/common/alert';
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const ProvideREIE: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = 'generalInfo';
  const subTabKey = 'realEstateExperience';

  const { fields } = useSelector((state: RootState) => state.application.tabs[tabKey].subTabs[subTabKey]);
  const { isApplicationSubmitted } = useSelector((state: RootState) => state.application);


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
      {isApplicationSubmitted && <LockedAlert />}

      {/* Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-2">
        Real Estate Investment Experience
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-8">
        Please list your past experience with investment properties. These
        should be properties where you appear on title. These may be properties
        that you have exited or sold. The more experience you have, the lower
        your rate. Please keep in mind we will verify this experience during
        underwriting.
      </Typography>

      {/* Form */}
      <Box
        component="form"
        className="space-y-6 max-w-3xl mx-0"
        noValidate
        autoComplete="off"
      >
        {/* Num Properties Exited Last 24 Months */}
        <TextField
          label="Num Properties Exited Last 24 Months"
          value={fields.numPropertiesExited}
          onChange={(e) =>
            handleInputChange("numPropertiesExited", parseFloat(e.target.value))
          }
          fullWidth
          variant="outlined"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
        />

        {/* Save and Continue Button */}
        <div className="flex justify-start mt-6">
          <ReusableButton
            label="Save and Continue"
            onTap={handleSave}
          // disabled={isFormCompleted}
          />
        </div>
      </Box>
    </div>
  );
};

export default ProvideREIE;
