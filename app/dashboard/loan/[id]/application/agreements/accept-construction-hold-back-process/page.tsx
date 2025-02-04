"use client";

import React from "react";
import Link from "next/link"; // Import Link from Next.js
import { Typography, Box, Alert, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { markFormCompleted, updateField } from "@/store/slice/csm/applicationSlice";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const ConstructionHoldbackProcess: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = "agreements";
  const subTabKey = "holdBackProcess";

  const { fields } = useSelector(
    (state: RootState) => state.application.tabs[tabKey].subTabs[subTabKey]
  );
  const { isApplicationSubmitted } = useSelector(
    (state: RootState) => state.application
  );

  const handleInputChange = (fieldName: string, value: boolean) => {
    dispatch(updateField({ tabKey, subTabKey, fieldName, value }));
  };

  const handleSave = () => {
    dispatch(markFormCompleted({ tabKey, subTabKey }));
    dispatch(updateSubTabProgress({ tabKey, subTabKey, isCompleted: true }));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12">
      {/* Alert */}
      {isApplicationSubmitted && (
        <Alert severity="info" className="mb-6">
          Loan Application fields are locked. Changes to your loan cannot be made
          because your loan has been fully approved by Underwriting.
        </Alert>
      )}

      {/* Title */}
      <Typography variant="h5" className=" font-heading text-gray-800 mb-4">
        Review and Accept Lend with Loha&apos;s Construction Holdback Process
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        Please review and accept Lend with Loha&apos;s Construction Holdback Process before continuing.
      </Typography>

      {/* Link to View the PDF */}
      <Link
        href="/application-docs/construction-holdback-process"
        target="_blank" // Open in a new tab
        className="text-blue-600 underline text-sm md:text-base"
      >
        View Construction Holdback Process
      </Link>

      {/* Checkbox */}
      <Box className="mt-6">
        <FormControlLabel
          control={
            <Checkbox
              checked={fields.acceptedLendHoldbackProcess}
              onChange={(e) => handleInputChange("acceptedLendHoldbackProcess", e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2" className="text-gray-800">
              I have read and accept the Lend with Loha Construction Holdback Process
            </Typography>
          }
        />
      </Box>

      {/* Save and Continue Button */}
      <Box className="mt-6">
        <Button
          variant="contained"
          onClick={handleSave}
          color="primary"
          className={`w-full md:w-auto ${!fields.acceptedLendHoldbackProcess ? "bg-gray-300 text-gray-600" : "bg-primary hover:bg-primary-dark"
            }`}
          disabled={!fields.acceptedLendHoldbackProcess}
        >
          Save and Continue
        </Button>
      </Box>
    </div>
  );
};

export default ConstructionHoldbackProcess;
