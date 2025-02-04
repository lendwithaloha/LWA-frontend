"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import ReusableButton from "@/components/common_btn";

const PropertyAddress = ({ link }: { link: string }) => {
  // Sample list of states
  const states = [
    "California",
    "Texas",
    "New York",
    "Florida",
    "Illinois",
    "Georgia",
  ];

  // State to store selected value
  const [state, setState] = useState("");

  return (
    <Container
      sx={{ marginTop: 8, marginBottom: 4 }}
      className="max-w-[550px] ml-8 max-sm:ml-0"
    >
      {/* Header */}
      <Typography variant="h5" fontWeight="semi-bold" sx={{ marginBottom: 3 }}>
        What is the address of the property you would like to purchase?
      </Typography>

      {/* Form */}
      <form>
        <Grid container spacing={2}>
          {/* Address Line 1 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 1"
              required
              helperText="This field is required"
            />
          </Grid>

          {/* Address Line 2 */}
          <Grid item xs={12}>
            <TextField fullWidth label="Address Line 2" />
          </Grid>

          {/* City */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City"
              required
              helperText="This field is required"
            />
          </Grid>

          {/* State Dropdown with Autocomplete */}
          <Grid item xs={6}>
            <Autocomplete
              freeSolo
              options={states}
              value={state}
              onChange={(event, newValue) => setState(newValue ?? "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  helperText="Type to search or add a custom value"
                />
              )}
            />
          </Grid>

          {/* ZIP Code */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Zip"
              required
              helperText="This field is required"
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: "8px",

            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ReusableButton variant="outlined" label="SKIP" link={link} />
          <ReusableButton label="NEXT" />
        </Box>
      </form>

      {/* Footer */}
    </Container>
  );
};

export default PropertyAddress;
