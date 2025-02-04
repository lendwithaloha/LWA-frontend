"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Grid,
  Autocomplete,
} from "@mui/material";
import ReusableButton from "@/components/common_btn";

export default function NewLoan({
  detailsVisbile = false,
  link,
}: {
  detailsVisbile?: boolean;
  link: string;
}) {
  const [entityType, setEntityType] = useState("");
  const [entityTypeChange, setEntityTypeChange] = useState(""); /// Track selected entity type
  const [suffix, setSuffix] = useState("");
  const handleEntityChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEntityType(event.target.value);
  };
  const handleEntityTypeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEntityTypeChange(event.target.value);
  };
  const handleSufixChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSuffix(e.target.value);
  };

  const states = [
    "-- Create New Guarantor --",
    "Guarantor-1",
    "New York Guarantor",
    "Guarantor Florida",
  ];
  const router = useRouter();
  // State to store selected value
  const [state, setState] = useState("");
  return (
    <Container className="max-w-[650px] overflow-hidden ">
      <Box
        sx={{
          marginTop: 4,
          padding: 4,
          paddingLeft: 8,
        }}
      >
        <Typography variant="h5" gutterBottom className="my-4">
          Start a New Loan
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: 3 }}
          className="font-serif"
        >
          Get started by creating a new entity and guarantor or select from
          existing profiles.
        </Typography>

        {/* Borrower Entities Section */}
        <Typography
          variant="subtitle1"
          sx={{ marginBottom: 2, fontWeight: "500" }}
        >
          Borrower Entities
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            select
            label="Entity"
            value={entityType}
            onChange={handleEntityChange}
            sx={{ border: 0 }}
            className=" border-b-1"
          >
            <MenuItem value="create-entity">-- Create New Entity --</MenuItem>
            <MenuItem value="entity1">Entity 1</MenuItem>
            <MenuItem value="entity2">Entity 2</MenuItem>
          </TextField>
        </FormControl>

        {/* Conditional Rendering for Create New Entity */}
        {entityType === "create-entity" && (
          <>
            {/* Entity Name and Type */}
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={6}>
                <TextField fullWidth label="Entity Name" />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Entity Type"
                  value={entityTypeChange}
                  onChange={(e) => handleEntityTypeChange(e)}
                >
                  <MenuItem value="llc">LLC</MenuItem>
                  <MenuItem value="corporation">Corporation</MenuItem>
                  <MenuItem value="partnership">Partnership</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {/* Experience Section */}
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Experience
            </Typography>
            <FormControl>
              <FormLabel>
                How many flips have been completed under this entity in the last
                2 years?
              </FormLabel>
              <RadioGroup>
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="None"
                />
                <FormControlLabel
                  value="1-4"
                  control={<Radio />}
                  label="1-4 properties"
                />
                <FormControlLabel
                  value="5+"
                  control={<Radio />}
                  label="5 or more properties"
                />
              </RadioGroup>
            </FormControl>
          </>
        )}
        {entityType !== "create-entity" && detailsVisbile && (
          <Box>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              New Construction Experience
            </Typography>
            <FormControl>
              <FormLabel className="mb-2">
                Verify how many new construction projects have you exited in the
                last 5 years?
              </FormLabel>
              <RadioGroup>
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="None"
                />
                <FormControlLabel
                  value="1-4"
                  control={<Radio />}
                  label="1-4 properties"
                />
                <FormControlLabel
                  value="5+"
                  control={<Radio />}
                  label="5 or more properties"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        )}

        {/* Guarantor Section */}
        {(entityType === "create-entity" ||
          entityType === "entity1" ||
          entityType === "entity2") && (
          <>
            <Typography
              variant="subtitle1"
              sx={{ marginBottom: 2, marginTop: 3, fontWeight: "500" }}
            >
              Guarantor
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              label="Search All Guarantor Profiles"
              sx={{ marginBottom: 2 }}
            />

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

            {state === "-- Create New Guarantor --" && (
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={6}>
                  <TextField fullWidth label="First Name" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Last Name" />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label="Suffix"
                    value={suffix}
                    onChange={(e) => handleSufixChange(e)}
                  >
                    <MenuItem value="jr">Jr.</MenuItem>
                    <MenuItem value="sr">Sr.</MenuItem>
                    <MenuItem value="iii">III</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            )}
          </>
        )}

        {/* Submit Button */}
        <Box
          sx={{
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            gap: "20px",
            justifyContent: "space-between",
            marginTop: 3,
          }}
        >
          <h6
            className="text-blue-700 underline text-xl cursor-pointer"
            onClick={() => router.back()}
          >
            {" "}
            Go back
          </h6>
          <ReusableButton label="NEXT" link={link} />
        </Box>
      </Box>
    </Container>
  );
}
