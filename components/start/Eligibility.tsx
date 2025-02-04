"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ReusableButton from "@/components/common_btn";

const EligibilityConfirmations = () => {
  const [checkedState, setCheckedState] = useState({
    isCitizen: false,
    noOccupancy: false,
    trainingComplete: false,
  });

  const handleChange = (event: { target: { name: string; checked: boolean } }) => {
    const { name, checked } = event.target;
    setCheckedState({ ...checkedState, [name]: checked });
  };
  const router = useRouter();
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        maxWidth: "560px",
        margin: "80px auto",

        padding: "40px 16px",
        display: "flex",

        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",

        gap: 2,
        textAlign: "left",
        [theme.breakpoints.down("sm")]: {
          marginLeft: "0",
          // Stack on smaller screens
        },
      })}
    >
      {/* Title */}
      <Typography variant="h5" sx={{ fontWeight: "00", textAlign: "start" }}>
        Please confirm that the following statements are true:
      </Typography>

      {/* Checkboxes */}
      <FormControlLabel
        control={
          <Checkbox
            name="isCitizen"
            checked={checkedState.isCitizen}
            onChange={handleChange}
            color="primary"
          />
        }
        label="The borrower is a US citizen or a Permanent Resident."
      />
      <FormControlLabel
        control={
          <Checkbox
            name="noOccupancy"
            checked={checkedState.noOccupancy}
            onChange={handleChange}
            color="primary"
          />
        }
        label="The owner(s) of the property and the guarantor will not occupy the property."
      />
      <FormControlLabel
        control={
          <Checkbox
            name="trainingComplete"
            checked={checkedState.trainingComplete}
            onChange={handleChange}
            color="primary"
          />
        }
        label="I (the broker) will complete the AML/BSA training requirement."
      />

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Button
          variant="text"
          color="primary"
          sx={{ fontWeight: "bold" }}
          onClick={() => router.back()}
        >
          Go Back
        </Button>
        <ReusableButton label="NEXT" />
      </Box>
    </Box>
  );
};

export default EligibilityConfirmations;
