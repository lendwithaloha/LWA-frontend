import React from "react";
import {
  Dialog,
  DialogContent,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface StatusModalProps {
  open: boolean;
  setModalOpen: (value:boolean) => void;
  modalStatus: string;
  modalMessage: string;
  onClose: () => void;
}

const StatusModal: React.FC<StatusModalProps> = ({
  open,
  setModalOpen,
  modalStatus,
  modalMessage,
  onClose,
}) => {
  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <Box sx={{ position: "relative", padding: "16px" }}>
        {/* Close Icon */}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "grey.500" }}
        >
          <CancelIcon />
        </IconButton>

        {/* Status Icon and Message */}
        <Box textAlign="center" >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {modalStatus ? (
              <CheckCircleIcon sx={{ fontSize: "3rem", color: "green" }} />
            ) : (
              <CancelIcon sx={{ fontSize: "3rem", color: "red" }} />
            )}
          </Box>
          <Typography
            variant="h6"
            sx={{
              marginTop: "16px",
              color: modalStatus ? "green" : "red",
            }}
          >
            {modalStatus
              ? "Operation Successful!"
              : "Something went wrong! Please try again."}
          </Typography>
        </Box>
      </Box>

      <DialogContent>
        <Typography textAlign="center">
          {modalMessage}
        </Typography>
      </DialogContent>

      <Box sx={{ display: "flex", justifyContent: "center", padding: "16px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          sx={{
            backgroundColor: "black",
            color: "white",
            padding: "8px 16px",
            textTransform: "none",
            fontWeight: "bold",
            width: "100px"
          }}
        >
          Ok
        </Button>
      </Box>
    </Dialog>
  );
};

export default StatusModal;
