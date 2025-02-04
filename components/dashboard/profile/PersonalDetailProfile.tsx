"use client";
import React, { useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Button } from "@mui/material";
import { useGetUserQuery } from "@/store/slice/user/userApi";
import { EditTwoTone, ErrorRounded } from "@mui/icons-material";
import { FormData } from "@/store/slice/profile/profile-setup";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip } from "@/components/common/ToolTip";
import HelpIcon from "@mui/icons-material/Help";

import { useGetGuarantorDetailsQuery } from "@/store/slice/profile-api/profileDetail";

interface ProfileDetailProps {
  formData?: FormData;
  edit?: boolean;
}

const PersonalDetailProfile: React.FC<ProfileDetailProps> = ({
  formData,
  edit,
}) => {
  const { data: user, isLoading, isError } = useGetUserQuery();
  const { isLoading: isProfileLoading, isError: isProfileError } =
    useGetGuarantorDetailsQuery();
  const pathname = usePathname();
  const router = useRouter();

  const isProfileEdit = pathname === "/dashboard/profile/edit-personal-detail";

  const handleCancel = () => {
    router.push("/dashboard/profile/personal-detail");
  };

  const editPersonalDetail = () => {
    // Navigate to the edit page
    router.push("/dashboard/profile/edit-personal-detail");
  };

  useEffect(() => {
    if (isError || isProfileError) {
      console.log("Failed to fetch profile data");
    }
  }, [isError, isProfileError]);

  if (isLoading || isProfileLoading) {
    return (
      <div className="flex justify-around items-center">
        <CircularProgress />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center ">
        <ErrorRounded color="error" className="text-3xl" />
        <Typography variant="h6">Error Loading </Typography>
        <Button>Retry</Button>
      </div>
    );
  }

  return (
    <Box px={14} pb={14}>
      {isProfileEdit ? (
        <div className="flex justify-between items-center mb-4">
          <h1>Updating Profile</h1>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
            onClick={handleCancel}
          >
            X
          </button>
        </div>
      ) : (
        edit && (
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h6" fontWeight={"semibold"}>
              My Account
            </Typography>
            <div
              onClick={editPersonalDetail}
              className="cursor-pointer bg-primaryColor p-1 rounded text-white flex flex-row  px-3 gap-2"
            >
              <span>Edit</span> <EditTwoTone />
            </div>
          </div>
        )
      )}

      {/* <Box>
        
        <Typography fontWeight="semibold">{user?.first_name + " " + user?.last_name}</Typography>
        <Typography>Full Name</Typography>
        <Typography color="textSecondary" mb={2}></Typography>
        <Typography fontWeight="semibold"> {formData?.dob || 'Date of Birth'}</Typography>
        <Typography color="textSecondary" mb={2}> Date of Birth
        </Typography>
        <Typography fontWeight="semibold">{formData?.maritalStatus || 'Marital Status'}</Typography>
        <Typography color="textSecondary" mb={2}>
          Marital Status
        </Typography>
       
      </Box> */}

      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <Typography fontWeight="semibold">
            {user?.first_name + " " + user?.last_name}
          </Typography>
          <Typography color="textSecondary">Full Name</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Typography fontWeight="semibold">
            {formData?.dob || "Date of Birth"}
          </Typography>
          <Typography color="textSecondary">Date of Birth</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontWeight="semibold">
            {formData?.maritalStatus}
          </Typography>
          <Typography color="textSecondary">Marital Status</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Typography fontWeight="semibold">
            {formData?.zipCode || "Credit Score"}
          </Typography>
          <Typography color="textSecondary">Credit Score</Typography>
        </Grid>
      </Grid>
      <div className="w-full h-[2px] bg-gray-200 my-10" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Contact Details</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography fontWeight="semibold">{user.email}</Typography>
          <Typography fontWeight="textSecondary">Email</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Typography fontWeight="semibold">
            {user.phone_number || "N/A"}
          </Typography>
          <Typography fontWeight="textSecondary">Phone Number</Typography>
        </Grid>
      </Grid>

      <div className="w-[100%] h-[2px] bg-gray-200 my-10" />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        width="full"
      >
        <Typography variant="h6">Employment Details</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography fontWeight="semibold">
            {formData?.employerPosition || "Position"}
          </Typography>
          <Typography color="textSecondary">Position</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Typography fontWeight="semibold">
            {formData?.yearsEmployed || "Years Employed"}
          </Typography>
          <Typography color="textSecondary">Years Employed</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontWeight="semibold">
            {formData?.annualIncome || "Annual Income"}
          </Typography>
          <Typography color="textSecondary">Annual Income</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Typography fontWeight="semibold">
            {formData?.employerAddress || "Employer Address"}
          </Typography>
          <Typography color="textSecondary">Employer Address</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontWeight="semibold">
            {formData?.employerOtherStreetAddress || "Street Address"}
          </Typography>
          <Typography color="textSecondary">Street Address</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Typography fontWeight="semibold">
            {formData?.employerOtherCity || "City"}
          </Typography>
          <Typography color="textSecondary">City</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight="semibold">
            {formData?.employerOtherState || "State"}
          </Typography>
          <Typography color="textSecondary">State</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Typography fontWeight="semibold">
            {formData?.employerOtherZip || "Zip Code"}
          </Typography>
          <Typography color="textSecondary">Zip Code</Typography>
        </Grid>
      </Grid>

      <div className="w-[100%] h-[2px] bg-gray-200 my-10" />

      <Typography variant="h6">Current Address</Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <Typography fontWeight="semibold">
            {formData?.employerCurrentStreetAddress || "Street Address"}
          </Typography>
          <Typography color="textSecondary">Street Address</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Typography fontWeight="semibold">
            {formData?.employerCurrentCity || "City"}
          </Typography>
          <Typography color="textSecondary">City</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontWeight="semibold">
            {formData?.employerCurrentState || "State"}
          </Typography>
          <Typography color="textSecondary">State</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Typography fontWeight="semibold">
            {formData?.employerCurrentZip || "Zip Code"}
          </Typography>
          <Typography color="textSecondary">Zip Code</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontWeight="semibold">
            {formData?.residencyType ? "Own" : "Rent"}
          </Typography>
          <Typography color="textSecondary">Rent</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Typography fontWeight="semibold">{formData?.monthlyRent}</Typography>
          <Typography color="textSecondary">Monthly Rent</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <Typography fontWeight="semibold">
            {formData?.currentAddressYears || "1"}
          </Typography>
          <div color="textSecondary">
            Move in date{" "}
            <Tooltip text="Month and year you moved into your primary residence.">
              <HelpIcon />
            </Tooltip>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalDetailProfile;
