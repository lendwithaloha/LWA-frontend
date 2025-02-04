'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { updateField, markFormCompleted } from '@/store/slice/csm/applicationSlice';
import LockedAlert from '@/components/dashboard/loan/application/common/alert';
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';


const PropertyInspectionDetails: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = 'propertyInfo';
  const subTabKey = 'propertyInspection';

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
    <div className="bg-gray-50 min-h-screen py-8 px-4 relative">
      {isApplicationSubmitted && (<LockedAlert />
      )}


      <Typography variant="h4" className="font-heading text-gray-800 mb-6">
        Property Inspection Details
      </Typography>

      {/* Property Contact Information */}
      <Typography variant="h6" className="text-gray-700 mb-4">
        Property Contact Information
      </Typography>
      <Box
        component="form"
        className="space-y-6 max-w-3xl mx-0"
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Contact Name"
          value={fields.contactName}
          onChange={(e) => handleInputChange("contactName", e.target.value)}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Contact Phone"
          value={fields.contactPhone}
          onChange={(e) => handleInputChange("contactPhone", e.target.value)}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Contact Email"
          value={fields.contactEmail}
          onChange={(e) => handleInputChange("contactEmail", e.target.value)}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Property Access Instructions"
          value={fields.accessInstructions}
          onChange={(e) => handleInputChange("accessInstructions", e.target.value)}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
          InputProps={{ readOnly: true }}
        />
      </Box>

      {/* Inspection Options */}
      <Typography variant="h6" className="text-gray-700 mt-8 mb-4">
        Inspection Options
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-4">
        Based on the criteria of your client’s loan, we may need an inspection.
        Please select which type your client prefers.
      </Typography>

      <Box className="relative mx-5 gap-8">
        <FormControl component="fieldset">
          <FormLabel component="legend" className="sr-only">
            Inspection Options
          </FormLabel>
          <RadioGroup
            value={fields.inspectionType}
            onChange={(e) => handleInputChange("inspectionType", e.target.value)}

            className="space-y-4"
          >
            <FormControlLabel
              value="Virtual Inspection"
              control={<Radio />}
              label="Virtual Inspection"
              disabled={isApplicationSubmitted}
            />
            <FormControlLabel
              value="Traditional Inspection"
              control={<Radio />}
              label="Traditional Inspection"
              disabled={isApplicationSubmitted}
            />
          </RadioGroup>
        </FormControl>
      </Box>

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
    </div>
  );
};

export default PropertyInspectionDetails;
