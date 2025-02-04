"use client";

import React from "react";
import { TextField, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateField, markFormCompleted } from '@/store/slice/csm/applicationSlice';
import LockedAlert from '@/components/dashboard/loan/application/common/alert';
import ReusableButton from "@/components/common_btn";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const ProvidePurchaseDetail: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = 'generalInfo';
  const subTabKey = 'purchaseDetails';

  const { fields,  } = useSelector((state: RootState) => state.application.tabs[tabKey].subTabs[subTabKey]);
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
      {/* Alert */}
      {isApplicationSubmitted && (
       <LockedAlert/>
      )}

      {/* Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-2">
        Tell us about your Purchase
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-8">
        Please tell us how the property is being sold and what your client
        intends to do with the property at the end of the term of the loan.
      </Typography>

      {/* Form */}
      <Box
        component="form"
        className="space-y-6 max-w-3xl mx-0"
        noValidate
        autoComplete="off"
      >
        {/* Sale Type */}
        <TextField
          label="Sale Type"
          value={fields.saleType}
          onChange={(e) => handleInputChange("saleType", e.target.value)}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />

        {/* Rehab Amount Requested */}
        <TextField
          label="Rehab Amount Requested"
          value={fields.rehabAmountRequested}
          onChange={(e) =>
            handleInputChange("rehabAmountRequested", e.target.value)
          }
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />

        {/* Estimated Total Cost of Rehab Project */}
        <TextField
          label="Estimated total cost of your rehab project"
          value={fields.totalCost}
          onChange={(e) => handleInputChange("totalCost", e.target.value)}
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />

        {/* Estimated Number of Days to Finish Rehab Project */}
        <TextField
          label="Estimated number of days to finish your rehab project"
          value={fields.estimatedDays}
          onChange={(e) =>
            handleInputChange("estimatedDays", parseFloat(e.target.value))
          }
          disabled={isApplicationSubmitted}
          fullWidth
          variant="outlined"
        />

        {/* Exit Strategy */}
        <TextField
          label="Exit Strategy"
          value={fields.exitStrategy}
          onChange={(e) => handleInputChange("exitStrategy", e.target.value)}
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

export default ProvidePurchaseDetail;
