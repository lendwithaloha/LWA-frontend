"use client";

import React from "react";
import { Typography, Box, Alert, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { markFormCompleted, updateField } from "@/store/slice/csm/applicationSlice";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const ValuationAcknowledgment: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = "agreements";
  const subTabKey = "valuationDeliveryAcknowledgement";

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
      {
        isApplicationSubmitted && (
          <Alert severity="info" className="mb-6">
            Loan Application fields are locked. Changes to your loan cannot be made
            because your loan has been fully approved by Underwriting.
          </Alert>
        )
      }

      {/* Title */}
      <Typography variant="h5" className="font-heading text-gray-800 mb-4">
        Review and Accept Valuation Delivery Acknowledgment
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        Please provide the borrower with a copy of all valuation reports for
        this loan file. Then complete the acknowledgment below and click Save.
      </Typography>

      {/* Task Instructions */}
      <Typography variant="h6" className="text-gray-800 font-heading mb-2">
        Task Instructions:
      </Typography>
      <Typography variant="body2" className="text-gray-600 mb-4">
        Please provide the borrower with a copy of all valuation reports for
        this loan file. Then complete the acknowledgment below and click Save.
      </Typography>

      {/* Tips Section */}
      <Typography variant="h6" className="text-gray-800 font-heading mb-2">
        Tips from Lend with Loha:
      </Typography>
      <Typography variant="body2" className="text-gray-600 mb-6">
        Copies of all valuation reports for this loan file can be located in the
        borrower dashboard under the Files tab.
      </Typography>

      {/* Acknowledgment Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={fields.acknowledgedECOAValuationRule}
            onChange={(e) => handleInputChange("acknowledgedECOAValuationRule", e.target.checked)}
            color="primary"
          />
        }
        label={
          <Typography variant="body2" className="text-gray-800">
            I acknowledge that I will provide the borrower with a copy of all
            valuation reports pursuant to the ECOA Valuation Rule for this loan
            file.
          </Typography>
        }
      />

      {/* Submit Button */}
      <Box className="mt-6">
        <Button
          variant="contained"
          color="primary"
          // className="bg-primary hover:bg-primary-dark w-full md:w-auto"
          onClick={handleSave}
          className={`w-full md:w-auto ${!fields.acknowledgedECOAValuationRule ? "bg-gray-300 text-gray-600" : "bg-primary hover:bg-primary-dark"
            }`}
          disabled={!fields.acknowledgedECOAValuationRule}
        >
          Save and Continue
        </Button>
      </Box>
    </div>
  );
};

export default ValuationAcknowledgment;
