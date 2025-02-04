import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface OTPVerificationDialogModalProps {
    open: boolean;
    onClose: () => void;
}

const OTPVerificationDialog: React.FC<OTPVerificationDialogModalProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "white",
                    p: 3,
                    borderRadius: 2,
                    textAlign: "center",
                }}
            >
                {/* Close Button */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                    }}
                >
                    <Button onClick={onClose} sx={{ minWidth: 0, p: 0, color: "black", fontSize: "20px" }}>
                        &times;
                    </Button>
                </Box>

                {/* Success Icon */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Box
                        sx={{
                            // width: 64,
                            // height: 64,
                            // borderRadius: "50%",
                            // backgroundColor: "#F5F5F5",
                            // display: "flex",
                            // justifyContent: "center",
                            // alignItems: "center",
                        }}
                    >
                        <CheckCircleOutlineIcon sx={{ color: "", fontSize: "80px" }} />
                    </Box>
                </Box>

                {/* Title */}
                <Typography variant="body2" sx={{  mb: 3 }}>
                    Profile Successfully Updated                </Typography>


                <Button
                    onClick={onClose}
                    sx={{
                        backgroundColor: "black",
                        color: "white",
                        px: 4,
                        py: 1,
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#333" },
                    }}
                >
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default OTPVerificationDialog;
