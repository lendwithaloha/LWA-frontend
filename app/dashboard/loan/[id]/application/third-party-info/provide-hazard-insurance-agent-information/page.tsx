"use client";

import React from "react";
import { Typography, Box, TextField, Link } from "@mui/material";
import ReusableButton from "@/components/common_btn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LockedAlert from "@/components/dashboard/loan/application/common/alert";
import { updateField,markFormCompleted } from '@/store/slice/csm/applicationSlice';
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const ProvideHazardInsuranceAgentInfo: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = "thirdPartyInfo";
  const subTabKey = "hazardInsurance";



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
      <Typography variant="h5" className="font-heading text-gray-800 mb-4">
        Provide hazard insurance agent information
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        Hazard Insurance that complies with the Policy Guidelines linked below
        is required to close your loan. Once you’ve arranged coverage, please
        provide the insurance agent’s contact information so they can confirm
        evidence of hazard insurance for your new home. This enables us to
        coordinate directly with your agent on the nitty-gritty details, without
        you having to be involved.
      </Typography>

      {/* Review Guidelines */}
      <Typography variant="subtitle1" className="text-gray-800 mb-2">
        Review Our Guidelines:
      </Typography>

      <Link
        href="/application-docs/construction-holdback-process"
        target="_blank"
        className="text-blue-600 underline text-sm md:text-base "
      >
        Download Policy Guidelines
      </Link>

      {/* Insurance Agent Information */}
      <Typography variant="subtitle1" className="text-gray-800 mt-2 mb-4">
        Insurance Agent Information
      </Typography>
      <Box className="space-y-4 flex flex-col max-w-[400px]">
        <TextField
          label="Name"
          name="name"
          value={fields.name}
          onChange={(e)=>handleInputChange("name",e.target.value)}
          variant="outlined"
          className="bg-white"
        />
        <TextField
          label="Phone Number"
          name="phone"
          value={fields.phone}
          onChange={(e)=>handleInputChange("phone",e.target.value)}
          variant="outlined"
          className="bg-white"
        />
        <TextField
          label="Email"
          name="email"
          value={fields.email}
          onChange={(e)=>handleInputChange("email",e.target.value)}

          variant="outlined"
          className="bg-white"
        />
      </Box>

      {/* Save and Continue Button */}
      <div className="flex justify-start mt-6">
        <ReusableButton label="Save and Continue" onTap={handleSave} />
      </div>
    </div>
  );
};

export default ProvideHazardInsuranceAgentInfo;
