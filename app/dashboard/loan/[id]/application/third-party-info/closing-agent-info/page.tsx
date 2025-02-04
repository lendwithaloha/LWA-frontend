"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReusableButton from "@/components/common_btn";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { updateField, markFormCompleted } from '@/store/slice/csm/applicationSlice';
import LockedAlert from "@/components/dashboard/loan/application/common/alert";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const ClosingAgentInfo: React.FC = () => {

  const dispatch = useDispatch();
  const tabKey = 'thirdPartyInfo';
  const subTabKey = 'closingAgent';

  const { fields } = useSelector((state: RootState) => state.application.tabs[tabKey].subTabs[subTabKey]);
  const { isApplicationSubmitted } = useSelector((state: RootState) => state.application);


  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Alert */}
      {isApplicationSubmitted && (
        <LockedAlert />
      )}

      {/* Title */}
      <Typography variant="h5" className="font-heading text-gray-800 mb-4">
        Provide Closing Agent/Title Company Information
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        Provide the details of your closing agent. This person or company (e.g.,
        title, escrow, attorney) typically assists with closing and verifying
        that there are no outstanding title issues. We will also order a Title
        Commitment and a Title Report on the property from this agent.
      </Typography>

      {/* Contact Details */}
      <Box className="space-y-4 mb-6">
        <Box>
          <Typography variant="body1" className="text-gray-800 font-bold">
            Contact Name:
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            {fields.contactName}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body1" className="text-gray-800 font-bold">
            Contact Phone:
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            {fields.contactPhone}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body1" className="text-gray-800 font-bold">
            Contact Email:
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            {fields.contactEmail}
          </Typography>
        </Box>
      </Box>

      {/* Action Button */}
      <ReusableButton
        label="    Change Title Company/Closing Agent"
        onTap={handleOpen}
      />

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
            width: "80%",
            maxWidth: "500px",
          },
        }}
      >
        {/* Dialog Title */}
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "8px",
            paddingBottom: "8px",
            borderBottom: "1px solid #eee",
            position: "relative",
          }}
        >
          Update Closing Agent Information
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              color: "#666",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Contact Name */}
          <Typography variant="body2" className="text-gray-800 font-bold mb-2">
            Contact Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={fields.contactName}

            onChange={(e) => handleInputChange("contactName",e.target.value)}
            className="mb-4"
          />

          {/* Contact Phone */}
          <Typography variant="body2" className="text-gray-800 font-bold mb-2">
            Contact Phone
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={fields.contactPhone}
            onChange={(e) => handleInputChange("contactPhone",e.target.value)}
            className="mb-4"
          />

          {/* Contact Email */}
          <Typography variant="body2" className="text-gray-800 font-bold mb-2">
            Contact Email
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={fields.contactEmail}
            onChange={(e) => handleInputChange("contactEmail",e.target.value)}
            className="mb-4"
          />
        </DialogContent>

        <DialogActions>
          <ReusableButton label="Save" onTap={handleSave} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClosingAgentInfo;
