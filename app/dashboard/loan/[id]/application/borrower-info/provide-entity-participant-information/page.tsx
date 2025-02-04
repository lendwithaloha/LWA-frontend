"use client";

import React from "react";
import { Typography, Box, TextField } from "@mui/material";
import ReusableButton from "@/components/common_btn";
import LockedAlert from "@/components/dashboard/loan/application/common/alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateField,markFormCompleted } from '@/store/slice/csm/applicationSlice';
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const ProvideParticipantInformation: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = 'borrowerInfo';
  const subTabKey = 'entityParticipantInfo';
  
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
    <div className="bg-gray-50 min-h-screen p-6 md:p-12">
     {isApplicationSubmitted && <LockedAlert />}

      {/* Title */}
      <Typography variant="h5" className="font-heading text-gray-800 mb-4">
        Add participating individuals and entities
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        Please enter personally identifiable information for every participant
        within your client’s organization so that we may begin processing your
        application.
      </Typography>

      {/* Form Section */}
      <Box className="space-y-6 mx-0" maxWidth={600}>
        <Typography variant="subtitle1" className="text-gray-800">
          Individual Participant
        </Typography>

        {/* Input Fields */}
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          size="small"
          name="firstName"
          value={fields.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          className="mb-4"
        />
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          size="small"
          name="lastName"
          value={fields.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          className="mb-4"
        />
        <TextField
          fullWidth
          label="Date of Birth (Optional)"
          variant="outlined"
          size="small"
          name="dateOfBirth"
          type="date"
          value={fields.dateOfBirth}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          className="mb-4"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Social Security Number (Optional)"
          variant="outlined"
          size="small"
          name="ssn"
          type="password"
          value={fields.ssn}
          onChange={(e) => handleInputChange("ssn", e.target.value)}
          className="mb-4"
        />
        <TextField
          fullWidth
          label="Email (Optional)"
          variant="outlined"
          size="small"
          name="email"
          value={fields.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="mb-4"
        />

        {/* Save Button */}
        <Box display="flex" justifyContent="flex-start">
          <ReusableButton label="Save and Continue" onTap={handleSave} />
        </Box>
      </Box>
    </div>
  );
};

export default ProvideParticipantInformation;
