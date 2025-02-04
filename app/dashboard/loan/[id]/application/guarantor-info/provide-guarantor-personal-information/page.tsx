"use client";

import React from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,

  Checkbox,
} from "@mui/material";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateField,markFormCompleted } from '@/store/slice/csm/applicationSlice';
import LockedAlert from '@/components/dashboard/loan/application/common/alert';
import ReusableButton from "@/components/common_btn";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';


const GuarantorPersonalInformation: React.FC = () => {

  const dispatch = useDispatch();
  const tabKey = 'guarantorInfo';
  const subTabKey = 'guarantorPersonalInfo';
  
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
      {/* Alert */}
      {isApplicationSubmitted && <LockedAlert/>}

      {/* Title */}
      <Typography variant="h5" className="font-heading text-gray-800 mb-4">
        Enter your client&apos;s guarantor&apos;s required personal info: SSN and DOB
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        Please enter and confirm all of your client’s guarantor’s personally
        identifiable information so we may begin processing their application.
      </Typography>

      {/* Guarantor Selection */}
      <Box className="mb-6   ">
        <Typography variant="body1" className="text-gray-800 font-bold mb-2">
          Guarantor
        </Typography>
        <FormControl>
          <RadioGroup
            row
            value={fields.isGuarantor}
            onChange={(e) => handleInputChange("isGuarantor", e.target.value === "true")}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>


      </Box>

      {/* Individual&apos;s Information */}
      <Box className=" space-y-4 md:w-2/3">
        <Typography variant="h6" className="text-gray-800 mb-4">
          Individual&apos;s Information
        </Typography>
        <TextField
          label="First Name"
          value={fields.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Last Name"
          value={fields.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Phone Number"
          value={fields.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Alternate Phone Number (Optional)"
          value={fields.alternatePhoneNumber}
          onChange={(e) => handleInputChange("alternatePhoneNumber", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Email Address"
          value={fields.emailAddress}
          onChange={(e) => handleInputChange("emailAddress", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Residency Status"
          value={fields.residencyStatus}
          onChange={(e) => handleInputChange("residencyStatus", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Date of Birth"
          type="date"
          value={fields.dob}
          onChange={(e) => handleInputChange("dob", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="SSN/TIN"
          value={fields.ssn}
          onChange={(e) => handleInputChange("ssn", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Marital Status"
          value={fields.maritalStatus}
          onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Spouse&apos;s Name"
          value={fields.spouseName}
          onChange={(e) => handleInputChange("spouseName", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Estimated Credit Score"
          value={fields.estimatedCreditScore}
          onChange={(e) => handleInputChange("estimatedCreditScore", parseFloat(e.target.value))}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Number of 60-Day Delinquencies"
          value={fields.numberOfDeliquencies}
          onChange={(e) => handleInputChange("numberOfDeliquencies", parseFloat(e.target.value))}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Bankruptcy Discharge Date (Optional)"
          type="date"
          value={fields.bankruptcyDischargeDate}
          onChange={(e) => handleInputChange("bankruptcyDischargeDate", e.target.value)}
          fullWidth
          variant="outlined"
        />
      </Box>

      {/* Present Address */}
      <Box className=" mt-6 md:w-2/3 space-y-4">
        <Typography variant="h6" className="text-gray-800 mb-4">
          Present Address
        </Typography>
        <TextField
          label="Address Line 1"
          value={fields.addressLine1}
          onChange={(e) => handleInputChange("addressLine1", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Address Line 2 (Optional)"
          value={fields.addressLine2}
          onChange={(e) => handleInputChange("addressLine2", e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Box className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextField
            label="City"
            value={fields.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="State"
            value={fields.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Zip"
            value={fields.estimatedCreditScore}
            onChange={(e) => handleInputChange("estimatedCreditScore", parseFloat(e.target.value))}
            fullWidth
            variant="outlined"
          />
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={fields.isMailingAddressDifferent}
              onChange={(e) =>
                handleInputChange("isMailingAddressDifferent", e.target.checked)
              }
            />
          }
          label="My mailing address is different from my present address"
        />

      </Box>

     {/* Save and Continue */}
     <div className="flex justify-start mt-6">
          <ReusableButton label="Save and Continue" onTap={handleSave} />
        </div>
    </div>
  );
};

export default GuarantorPersonalInformation;
