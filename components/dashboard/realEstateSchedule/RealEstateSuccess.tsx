import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { PiCheckCircleLight } from "react-icons/pi";

interface RealEstateSuccessModalProps {
    open: boolean;
    onClose: () => void;
}

export const RealEstateSuccess: React.FC<RealEstateSuccessModalProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: {xs:"60%",sm:"70%", md:"40%"},
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
                        {/* <PiCheckCircleLight /> */}
                        <PiCheckCircleLight className="text-primaryColor size-36" />                    </Box>
                </Box>

                {/* Title */}
                <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                    Data Successfully Added
                </Typography>

                {/* Description */}
                <Typography variant="body2" sx={{ color: "gray", mb: 3 }}>
                    Your schedule of real estate has been successfully imported. All entries have been added to your account.
                </Typography>

                {/* Close Button */}
                <button
                    onClick={onClose}

                    className="rounded-md bg-primaryColor px-6 py-1  text-white"
                >
                    Close
                </button>
            </Box>
        </Modal>
    );
};