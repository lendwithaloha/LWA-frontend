"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import PasswordChangeDialog from "../update-setting/ChangePassword";

import StatusModal from "../setting/HandleStatusModal";
import { OTPVerificationDialog } from "../update-setting/VerifyOtp";
import { useGetUserQuery } from "@/store/slice/user/userApi";
import { ErrorRounded } from "@mui/icons-material";
import { FormData } from "@/store/slice/profile/profile-setup";

interface BasicProfileProps {
  formData?: FormData;
}
export const BasicPersonal: React.FC<BasicProfileProps>= () => {
  const [open, setOpen] = useState(false);
  const [newPassword] = useState("");
  const [confirmPassword] = useState("");
  // const [editClicked, setEditClicked] = useState(false);
  const [confirmOtp, setConfirmOtp] = useState(false);

  const handleCloseConfirm = () => setConfirmOtp(false);
  // const handleOpenConfirm = () => setConfirmOtp(true);

  // Modal state and function to display messages
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalStatus, setModalStatus] = useState<
    "success" | "error" | "warning"
  >("success");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalMessage, setModalMessage] = useState("");

  // const handleShowModal = (
  //   status: "success" | "error" | "warning",
  //   message: string
  // ) => {
  //   setModalStatus(status);
  //   setModalMessage(message);
  //   setModalOpen(true);
  // };

  // Functions for handling password changes

  const handleClose = () => {
    setOpen(false);
  };

  const handleOtpClose = () => {
    setModalOpen(false);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    handleClose();
  };

  // Handle edit mode
  // const handleEditClick = () => {
  //   setEditClicked(true);
  // };
  const { data: user, isLoading, isError } = useGetUserQuery();

  useEffect(() => {
    if (isError) {
      console.log("Failed to fetch user data");
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="mx-auto w-[400px] h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex w-[400px] flex-col gap-2 justify-center items-center ">
        <ErrorRounded color="error" className="text-3xl" />
        <Typography variant="h6">Error Loading </Typography>
        <Button>Retry</Button>
      </div>
    );
  }


  return (
    <div className="">
      <Box className="flex">
        <Box
          sx={{
            width: {
              xs: 800,
              sm: 700,
              md: 400,
            }, height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "start",
          }}
        >
          {" "}
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
          {/* <Box>
            <Typography variant="h6" my={2}>
              Personal Details
            </Typography>
            <Typography fontWeight="bold">{user?.first_name + " " + user?.last_name}</Typography>
            <Typography>Full Name</Typography>
            <Typography color="textSecondary" mb={2}></Typography>
            <Typography fontWeight="bold"> {formData?.dob || 'Date of Birth'}</Typography>
            <Typography color="textSecondary" mb={2}> Date of Birth
            </Typography>
            <Typography fontWeight="bold">{formData?.maritalStatus || 'Marital Status'}</Typography>
            <Typography color="textSecondary" mb={2}>
              Marital Status
            </Typography>
            <Button
              variant="outlined"
              endIcon={<LockIcon />}
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleClickOpen}
            >
              Change Password
            </Button>
          </Box> */}
        </Box>
      </Box>

      <OTPVerificationDialog open={confirmOtp} onClose={handleCloseConfirm} />

      <StatusModal
        open={modalOpen}
        setModalOpen={setModalOpen}
        modalStatus={modalStatus} // Pass dynamic status
        modalMessage={modalMessage} // Pass dynamic message
        onClose={handleOtpClose}
      />
      <PasswordChangeDialog
        open={open}
        onClose={handleClose}
        onPasswordChange={handlePasswordChange}
      />
    </div>
  );
};
