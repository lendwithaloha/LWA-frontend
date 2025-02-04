"use client";

import React from "react";
import {
  Typography,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import ReusableButton from "@/components/common_btn";
import LockedAlert from "@/components/dashboard/loan/application/common/alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateField,markFormCompleted } from '@/store/slice/csm/applicationSlice';
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';


const ProvideEntityInformation: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = 'borrowerInfo';
  const subTabKey = 'entityInfo';
  
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
        Enter Entity Information
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        Please enter and confirm your client&apos;s information (EIN, State of
        Incorporation & address) so we may begin processing their application.
      </Typography>

      {/* Entity Information Form */}
      <Box className="space-y-6 mx-0" maxWidth={600}>
        <TextField
          fullWidth
          label="Client&apos;s Entity Name"
          variant="outlined"
          size="small"
          name="entityName"
          value={fields.entityName}
          onChange={(e) => handleInputChange("entityName", e.target.value)}
          className="mb-4"
        />

        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          size="small"
          name="email"
          value={fields.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="mb-4"
        />

        <TextField
          select
          fullWidth
          label="Client&apos;s Entity Type"
          variant="outlined"
          size="small"
          name="entityType"
          value={fields.entityType}
          onChange={(e) => handleInputChange("entityType", e.target.value)}
          className="mb-4"
        >
          <MenuItem value="Limited Liability Company">
            Limited Liability Company
          </MenuItem>
          <MenuItem value="Corporation">Corporation</MenuItem>
          <MenuItem value="Partnership">Partnership</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          label="State of Incorporation"
          variant="outlined"
          size="small"
          name="stateOfIncorporation"
          value={fields.stateOfIncorporation}
          onChange={(e) => handleInputChange("stateOfIncorporation", e.target.value)}
          className="mb-4"
        >
          <MenuItem value="CA">CA</MenuItem>
          <MenuItem value="NY">NY</MenuItem>
          <MenuItem value="TX">TX</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="EIN Number"
          variant="outlined"
          size="small"
          name="einNumber"
          type="password"
          value={fields.einNumber}
          onChange={(e) => handleInputChange("einNumber", e.target.value)}
          className="mb-6"
        />

        <FormControlLabel
          control={
            <Checkbox
              name="mailingDifferent"
              checked={fields.mailingDifferent}
              onChange={(e) => handleInputChange("mailingDifferent", e.target.value)}
            />
          }
          label="My mailing address is different from my present address"
        />

        <TextField
          fullWidth
          label="Signing Person&apos;s Name"
          variant="outlined"
          size="small"
          name="signerName"
          value={fields.signerName}
          onChange={(e) => handleInputChange("signerName", e.target.value)}
          className="mb-4"
        />
        <TextField
          fullWidth
          label="Signing Person&apos;s Title"
          variant="outlined"
          size="small"
          name="signerTitle"
          value={fields.signerTitle}
          onChange={(e) => handleInputChange("signerTitle", e.target.value)}
          className="mb-6"
        />

        <Box display="flex" justifyContent="flex-start">
          <ReusableButton label="Save and Continue" onTap={handleSave} />
        </Box>
      </Box>
    </div>
  );
};

export default ProvideEntityInformation;
