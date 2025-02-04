"use client";
import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, Button } from "@mui/material";

interface AccountExecutive {
  name: string;
  phone: string;
  email: string;
}

const SubmissionModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  // Static account executive details
  const accountExecutive: AccountExecutive = {
    name: "Executive",
    phone: "+1 555 678 1234",
    email: "executive@lwa.com",
  };

  const handleConfirm = () => {
    setIsSuccess(true); // Switch to success view after confirming submission
  };

  const handleClose = () => {
    setIsSuccess(false); // Reset for next time
    onClose(); // Close the modal
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "12px", // Modern square shape
          p: 3,
        },
      }}
    >
      {!isSuccess ? (
        <>
          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Confirm Submission</DialogTitle>
          <DialogContent sx={{ textAlign: "center" }}>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.1rem" }}>
              Are you sure you are ready to submit the inquiry?
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Please ensure all your details and documents are accurate before proceeding.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={onClose}
              sx={{
                borderRadius: "8px",
                padding: "10px 20px",
                backgroundColor: "#f0f0f0",
                color: "#333",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "8px",
                padding: "10px 20px",
              }}
            >
              Confirm & Submit
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>
            <Box display="flex" justifyContent="center">
              <Typography variant="h5" sx={{ fontSize: "2.5rem", color: "#4caf50" }}>
                ✔️
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
              Submission Successful!
            </Typography>
            <Typography variant="body1" align="center" sx={{ mt: 2, fontSize: "1rem", color: "#666" }}>
              Your loan inquiry has been successfully submitted.
            </Typography>
            <Box sx={{ mt: 4, p: 3, border: "1px solid #ddd", borderRadius: 2, backgroundColor: "#f9f9f9" }}>
              <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                Account Executive:
              </Typography>
              <Typography>{accountExecutive.name}</Typography>
              <Typography>📞 {accountExecutive.phone}</Typography>
              <Typography>✉️ {accountExecutive.email}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              fullWidth
              variant="contained"
              onClick={handleClose}
              sx={{
                borderRadius: "8px",
                padding: "12px 0",
                fontWeight: "bold",
              }}
            >
              OK
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default SubmissionModal;
