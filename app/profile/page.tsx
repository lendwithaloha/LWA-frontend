"use client";

import React, { useState } from "react";
import { TextField, Button, Link, Typography, Divider, Paper, Box } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { lightTheme } from "@/styles/theme";

const BorrowerProfile = () => {
  const [creditScore, setCreditScore] = useState("");
  const [vestingEntity, setVestingEntity] = useState("");
  const [driversLicense, setDriversLicense] = useState<File | null>(null);

  const handleCreditScoreSubmit = () => {
    console.log(`Credit Score Updated: ${creditScore}`);
    alert("Credit Score has been updated!");
  };

  const handleVestingEntitySubmit = () => {
    console.log(`Vesting Entity Updated: ${vestingEntity}`);
    alert("Vesting Entity has been updated!");
  };

  const handleDriversLicenseUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setDriversLicense(file);
      console.log(`Driver&apos;s License Uploaded: ${file.name}`);
      alert("Driver&apos;s License has been uploaded!");
    } else {
      alert("No file selected!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 pt-4">
      <Paper className="max-w-3xl w-full  shadow-none border p-8  bg-gray-50 ">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800 mt-16 text-center">Borrower Profile</h1>

        <Divider className="mb-6" />

        <Box className="mb-10">
          <Typography variant="h6" className="mb-2 text-gray-800"style={{
            fontStyle:lightTheme.fonts.heading,
            fontFamily:lightTheme.fonts.heading
          }} >
            Credit Score
          </Typography>
          <TextField
            fullWidth
            type="number"
            
            label="Enter Credit Score"
            value={creditScore}
            onChange={(e) => setCreditScore(e.target.value)}
            variant="outlined"
            className="mb-4"
            inputProps={{
              style: {
                height: "45px", // Increased height for better input area
                padding: "10px",
                fontStyle:lightTheme.fonts.heading,
            fontFamily:lightTheme.fonts.heading
              },
            }}
           // color="primary"
          />
          <Button
         
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreditScoreSubmit}
            sx={{
              padding: "12px",
              fontSize: "16px",
              textTransform: "none",
              fontStyle:lightTheme.fonts.heading,
              fontFamily:lightTheme.fonts.heading,
              '&:hover': {
                outline:'none !important',
                backgroundColor: lightTheme.colors.primary, // Darker blue on hover
              }
            }}
          >
            Update Credit Score
          </Button>
        </Box>

      

        <Box className="mb-6">
          <Typography variant="h6" className="mb-2 text-gray-800" style={{
            fontStyle:lightTheme.fonts.heading,
            fontFamily:lightTheme.fonts.heading
          }}>
            Vesting Entities & Document Storage
          </Typography>
          <TextField
            fullWidth
            label="Enter Vesting Entity"
            value={vestingEntity}
            onChange={(e) => setVestingEntity(e.target.value)}
            variant="outlined"
            className="mb-4"
            inputProps={{
              style: {
                height: "45px",
                padding: "10px",
                fontStyle:lightTheme.fonts.heading,
            fontFamily:lightTheme.fonts.heading
              },
            }}
            color="primary"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleVestingEntitySubmit}
            sx={{
              padding: "12px",
              fontSize: "16px",
              textTransform: "none",
              fontStyle:lightTheme.fonts.heading,
            fontFamily:lightTheme.fonts.heading,
              '&:hover': {
                backgroundColor: "#1976d2",
              }
            }}
          >
            Update Vesting Entity
          </Button>
        </Box>

        <Divider className="mb-6" />

        <Box className="mb-6">
          <Typography variant="h6" className="mb-2 text-gray-800" style={{
            fontStyle:lightTheme.fonts.heading,
            fontFamily:lightTheme.fonts.heading
          }}>
            Driver&apos;s License & Document Storage
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            component="label"
            sx={{
              padding: "12px",
              textTransform: "none",
              fontSize: "16px",
              '&:hover': {
                backgroundColor: "#f1f1f1",
              },
            }}
          >
            <CloudUploadIcon sx={{ marginRight: "8px" }} />
            Upload Driver&apos;s License
            <input
              type="file"
              accept="image/*,application/pdf"
              hidden
              onChange={handleDriversLicenseUpload}
            />
          </Button>

          {driversLicense && (
            <Typography variant="body1" className="mt-2 text-gray-700">
              Uploaded File: {driversLicense.name}
            </Typography>
          )}
        </Box>

        <Divider className="mb-6" />

        <Box className="mb-6">
          <Typography variant="h6" className="mb-2 text-gray-800">
            Link to SREO Page
          </Typography>
          <Link
            href="https://docs.google.com/spreadsheets/d/1_eftfAH9_-8r1PsLx59vbxAyIWdt21rL5G6cUgKHMA4/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            className="hover:underline"
          >
            Open SREO Spreadsheet
          </Link>
        </Box>
      </Paper>
    </div>
  );
};

export default BorrowerProfile;
