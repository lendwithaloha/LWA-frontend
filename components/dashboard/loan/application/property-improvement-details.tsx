// src/components/PropertyImprovementDetails.tsx
"use client";

import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setImprovements, markComplete } from '@/store/slice/propertyImprovementSlice';
import { RootState } from '@/store/store';

const PropertyImprovementDetails: React.FC = () => {
  // Get the current state from the Redux store
  const { hasMadeImprovements } = useSelector((state: RootState) => state.propertyImprovement);

  // Set up the dispatch function to interact with the store
  const dispatch = useDispatch();

  
  // Handle the change of the radio button value
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setImprovements((event.target as HTMLInputElement).value));
  };

  // Handle form save action
  const handleSave = () => {
    dispatch(markComplete("propertyImprovementDetails"));
    alert("Task marked as complete");
  };

  useEffect(() => {
    // Log the current state for debugging purposes
    console.log('Current Property Improvement State:', hasMadeImprovements);
  }, [hasMadeImprovements]);

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '20px auto',
        padding: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Property Improvement Details
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Below are all the details we have about your client’s deal. If you have
        to change these details you may do so below. Please note that changes
        may affect your Loan-to-Value or your rate.
      </Typography>

      <FormControl component="fieldset">
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Have you made improvements since you acquired the property?
        </Typography>
        <RadioGroup value={hasMadeImprovements || ''} onChange={handleRadioChange}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <Button variant="contained" onClick={handleSave} disabled={!hasMadeImprovements}>
        Save and Continue
      </Button>
    </Box>
  );
};

export default PropertyImprovementDetails;
