import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
    IconButton,
    Avatar,

} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import PasswordChangeDialog from "./ChangePassword";
import { ProfileDetail } from "../profile/PersonalDetail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OTPVerificationDialog from "./VerifyOtp";
import StatusModal from "./HandleStatusModal";

export const ProfilePage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [newPassword ] = useState("");
    const [confirmPassword] = useState("");
    const [editClicked, setEditClicked] = useState(false);
    const [confirmOtp, setConfirmOtp] = useState(false);

    // Modal state and function to display messages
    const [modalOpen, setModalOpen] = useState(false);
    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    const [modalStatus, setModalStatus] = useState<"success" | "error" | "warning">("success");
    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    const [modalMessage, setModalMessage] = useState("");

    // const handleShowModal = (status: "success" | "error" | "warning", message: string) => {
    //     setModalStatus(status);
    //     setModalMessage(message);
    //     setModalOpen(true);
    // };

    // Functions for handling password changes
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOtpClose = () => {
        setModalOpen(false)
    }

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert("Password changed successfully!");
        handleClose();
    };

    // Handle edit mode
    const handleEditClick = () => {
        setEditClicked(true);
    };

    // Handle OTP verification success
    // const handleVerifyOtp = (otp: string) => {
    //     alert(`OTP Verified: ${otp}`);
    //     setConfirmOtp(false); // Close the OTP dialog after verification

    //     setModalOpen(true)
    //     handleShowModal("success", "Your action was successful!");
    // };

    return (
        <div className="">
            {!editClicked ? (
                <Box display="flex" flexDirection={{ xs: "column", md: "row" }} p={6} gap={2} >
                    <Box
                        width={{ xs: "100%", md: "30%" }}
                        borderRight={1}
                        pr={2}
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
                    >
                        <Box textAlign="center" mb={2}>
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    bgcolor: "grey.300",
                                    mx: "auto",
                                }}
                            >
                                {/* Optional: Add initials or icon inside the avatar */}
                            </Avatar>
                            <Typography variant="h6" mt={2}>
                                Personal Details
                            </Typography>
                        </Box>
                        <Box>
                            <Typography fontWeight="bold">Full Name</Typography>
                            <Typography color="textSecondary" mb={2}>
                                Full Name
                            </Typography>
                            <Typography fontWeight="bold">Date of Birth</Typography>
                            <Typography color="textSecondary" mb={2}>
                                Date of Birth
                            </Typography>
                            <Typography fontWeight="bold">Marital Status</Typography>
                            <Typography color="textSecondary" mb={2}>
                                Marital Status
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<LockIcon />}
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={handleClickOpen}
                            >
                                Change Password
                            </Button>
                        </Box>
                    </Box>

                    {/* Main Content */}
                    <Box width={{ xs: "100%", md: "70%" }} px={6}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Employment Details</Typography>
                            <IconButton onClick={handleEditClick}>
                                <EditIcon />
                            </IconButton>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography fontWeight="bold">Position</Typography>
                                <Typography color="textSecondary">Position</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontWeight="bold">Years Employed</Typography>
                                <Typography color="textSecondary">Years Employed</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontWeight="bold">Annual Income</Typography>
                                <Typography color="textSecondary">Annual Income</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontWeight="bold">Employer Address</Typography>
                                <Typography color="textSecondary">Same as current</Typography>
                            </Grid>
                        </Grid>
                        <div className="w-full h-1 bg-gray-200 my-10" />
                        <Typography variant="h6" mt={4}>
                            Current Address
                        </Typography>
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={6}>
                                <Typography fontWeight="bold">Street Address</Typography>
                                <Typography color="textSecondary">Street Address</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontWeight="bold">City</Typography>
                                <Typography color="textSecondary">City</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontWeight="bold">State</Typography>
                                <Typography color="textSecondary">State</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontWeight="bold">Zip Code</Typography>
                                <Typography color="textSecondary">Zip Code</Typography>
                            </Grid>
                        </Grid>

                        <div className="w-full h-1 bg-gray-200 my-10" />
                        <Typography variant="h6" mt={4}>
                            Living Situation
                        </Typography>
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={6}>
                                <Typography fontWeight="bold">Rent</Typography>
                                <Typography color="textSecondary">Housing</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontWeight="bold">12</Typography>
                                <Typography color="textSecondary">
                                    Number of Years at Current Address
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            ) : (
                <div className="relative w-full flex flex-col h-[750px] overflow-auto">
                    <div className=" sticky z-50 top-0 left-0 flex   items-center justify-between p-4 bg-gray-100">
                        <Button
                            startIcon={<ArrowBackIcon />}
                            sx={{ minWidth: 0, padding: "8px" }}
                            onClick={() => setEditClicked(false)}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: "Cursive",
                                    fontWeight: "bold",
                                    color: "#333",
                                    fontSize: "14px",
                                    margin: 0,
                                }}
                            >
                                Updating Profile
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setConfirmOtp(true)}
                            sx={{
                                backgroundColor: "black",
                                color: "white",
                                paddingY: "6px",
                                "&:hover": {
                                    backgroundColor: "#333",
                                },
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                    <ProfileDetail />
                </div>

            )}

            <OTPVerificationDialog
                open={confirmOtp}
                // onVerify={handleVerifyOtp}
                onClose={() => {
                    setConfirmOtp(false);
                }}
                // setModalOpen={setModalOpen}

            />

            <StatusModal
                open={modalOpen}
                setModalOpen={setModalOpen}

                modalStatus={modalStatus} // Pass dynamic status
                modalMessage={modalMessage} // Pass dynamic message
                onClose={handleOtpClose}
            />
            <PasswordChangeDialog open={open} onClose={handleClose} onPasswordChange={handlePasswordChange} />
        </div>
    );
};
