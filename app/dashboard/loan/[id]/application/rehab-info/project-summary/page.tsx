"use client";

import React from "react";
import {
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import ReusableButton from "@/components/common_btn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateField,markFormCompleted } from '@/store/slice/csm/applicationSlice';
import LockedAlert from '@/components/dashboard/loan/application/common/alert';
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';


import Link from "next/link";

const ProjectSummary: React.FC = () => {

  const dispatch = useDispatch();
  const tabKey = 'rehabInfo';
  const subTabKey = 'projectSummary';
  
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

      {isApplicationSubmitted && <LockedAlert/>}

      {/* Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-6">
        Project Summary
      </Typography>

      {/* Description */}
      <Typography variant="body1" className="text-gray-600 mb-4">
        Please provide insight into the scope of work, quality of interior
        finishes, any room/home conversions, any square footage adds, and any
        relevant redesign(s). The level of detail will impact the accuracy of
        your After-Repair Valuation.
      </Typography>
      <Typography variant="body2" className="text-primary mb-4">
      <Link
        href="/application-docs/construction-holdback-process"
        target="_blank" // Open in a new tab
        className="text-blue-600 underline text-sm md:text-base"
      >
        Learn how to submit your Scope of Work
      </Link> <br />
      <Link
        href="/application-docs/construction-holdback-process"
        target="_blank" // Open in a new tab
        className="text-blue-600 underline text-sm md:text-base"
      >
      Scope of Work Submission Tips
      </Link>
      </Typography>

      {/* Project Details */}
      <Typography variant="h6" className="text-gray-800 mt-8 mb-4">
        Project Details
      </Typography>
      <Box className="space-y-4">
        {/* Project Description */}
        <TextField
          label="Project Description"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={fields.projectDescription}
          onChange={(e) => handleInputChange("projectDescription", e.target.value)}
        />

        {/* Target Quality of Finishes */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>
            What is the target quality of finishes for the project?
          </InputLabel>
          <Select
            label="What is the target quality of finishes for the project?"
            value={fields.targetQuality ?? "Custom/High"}
            onChange={(e) => handleInputChange("targetQuality", e.target.value)}
          >
            <MenuItem value="Custom/High">Custom/High</MenuItem>
            <MenuItem value="Standard/Medium">Standard/Medium</MenuItem>
            <MenuItem value="Basic/Low">Basic/Low</MenuItem>
          </Select>
        </FormControl>

        {/* Property Occupied */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>Will the property be occupied at closing?</InputLabel>
          <Select
            label="Will the property be occupied at closing?"
            value={fields.propertyOccupied ? "Yes" : "No"}
            onChange={(e) => handleInputChange("propertyOccupied", e.target.value === "Yes")}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>

        </FormControl>
      </Box>

      {/* Above Ground Information */}
      <Typography variant="h6" className="text-gray-800 mt-8 mb-4">
        Above Ground Information
      </Typography>
      <Typography variant="body2" className="text-gray-600 mb-4">
        ADU square footage and ADU bed/bath count should not be included in the
        current or rehabbed property characteristics entered below. These
        property characteristics should reflect those of the main house only,
        and ADU characteristics should be noted in the project summary
        description above.
      </Typography>
      <Grid container spacing={4}>
        {/* Current */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" className="text-gray-800 mb-2">
            Current
          </Typography>
          <TextField
            label="Current Sq. Ft."
            fullWidth
            variant="outlined"
            value={fields.currentAboveGroundSqFt}
            onChange={(e) => handleInputChange("currentAboveGroundSqFt", parseFloat(e.target.value))}
          />
          <TextField
            label="# of Bedrooms"
            fullWidth
            variant="outlined"
            className="mt-4"
            value={fields.currentAboveGroundBedrooms}
            onChange={(e) => handleInputChange("currentAboveGroundBedrooms", parseFloat(e.target.value))}
          />
          <TextField
            label="# of Bathrooms"
            fullWidth
            variant="outlined"
            className="mt-4"
            value={fields.currentAboveGroundBathrooms}
            onChange={(e) => handleInputChange("currentAboveGroundBathrooms", parseFloat(e.target.value))}
          />
        </Grid>

        {/* Rehabbed */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" className="text-gray-800 mb-2">
            Rehabbed
          </Typography>
          <TextField
            label="Rehabbed Sq. Ft."
            fullWidth
            variant="outlined"
            value={fields.rehabbedAboveGroundSqFt}
            onChange={(e) => handleInputChange("rehabbedAboveGroundSqFt", parseFloat(e.target.value))}
          />
          <TextField
            label="# of Bedrooms"
            fullWidth
            variant="outlined"
            className="mt-4"
            value={fields.rehabbedAboveGroundBedrooms}
            onChange={(e) => handleInputChange("rehabbedAboveGroundBedrooms", parseFloat(e.target.value))}
          />
          <TextField
            label="# of Bathrooms"
            fullWidth
            variant="outlined"
            className="mt-4"
            value={fields.rehabbedAboveGroundBathrooms}
            onChange={(e) => handleInputChange("rehabbedAboveGroundBathrooms", parseFloat(e.target.value))}
          />
        </Grid>
      </Grid>

      {/* Below Ground Information */}
      <Typography variant="h6" className="text-gray-800 mt-8 mb-4">
        Below Ground Information
      </Typography>
      <Grid container spacing={4}>
        {/* Current */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" className="text-gray-800 mb-2">
            Current
          </Typography>
          <TextField
            label="Current Sq. Ft."
            fullWidth
            variant="outlined"
            value={fields.currentBelowGroundSqFt}
            onChange={(e) => handleInputChange("currentBelowGroundSqFt", parseFloat(e.target.value))}
          />
          <TextField
            label="# of Living Rooms"
            fullWidth
            variant="outlined"
            className="mt-4"
            value={fields.currentBelowGroundLivingrooms}
            onChange={(e) => handleInputChange("currentBelowGroundLivingrooms", parseFloat(e.target.value))}
          />
          <TextField
            label="# of Bedrooms"
            fullWidth
            variant="outlined"
            className="mt-4"
            value={fields.currentAboveGroundBedrooms}
            onChange={(e) => handleInputChange("currentBelowGroundBedrooms", parseFloat(e.target.value))}
          />
          <TextField
            label="# of Bathrooms"
            fullWidth
            variant="outlined"
            className="mt-4"
            value={fields.currentBelowGroundBathrooms}
            onChange={(e) => handleInputChange("currentBelowGroundBathrooms", parseFloat(e.target.value))}
          />
        </Grid>

        {/* Rehabbed */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" className="text-gray-800 mb-2">
            Rehabbed
          </Typography>
          <TextField
            label="Rehabbed Sq. Ft."
            fullWidth
            variant="outlined"
            value={fields.rehabbedBelowGroundSqFt}
            onChange={(e) => handleInputChange("rehabbedBelowGroundSqFt", parseFloat(e.target.value))}
          />
          <TextField
            label="# of Living Rooms"
            fullWidth
            variant="outlined"
            className="mt-4"
            value={fields.rehabbedBelowGroundLivingrooms}
            onChange={(e) => handleInputChange("rehabbedBelowGroundLivingrooms", parseFloat(e.target.value))}
          />
          <TextField
            label="# of Bedrooms"
            fullWidth
            variant="outlined"
            className="mt-4"
            value={fields.rehabbedBelowGroundBedrooms}
            onChange={(e) => handleInputChange("rehabbedBelowGroundBedrooms", parseFloat(e.target.value))}
          />
          <TextField
            label="# of Bathrooms"
            fullWidth
            variant="outlined"
            className="mt-4"
            value={fields.ehabbedBelowGroundBathrooms}
            onChange={(e) => handleInputChange("rehabbedBelowGroundBathrooms", parseFloat(e.target.value))}
          />
        </Grid>
      </Grid>

      {/* Save and Continue Button */}
      <div className="flex justify-start mt-6">
        <ReusableButton onTap={handleSave} label="Save and Continue" />
      </div>
    </div>
  );
};

export default ProjectSummary;
