"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ReusableButton from "@/components/common_btn";

const BridgeRateCalculator = () => {
  // State management
  const [state, setState] = useState("CA");
  const [propertyType, setPropertyType] = useState("Single Family");
  const [ficoScore, setFicoScore] = useState("720-739");
  const [refinance, setRefinance] = useState("No");
  const [brokerPoints, setBrokerPoints] = useState("0%");

  return (
    <Container sx={{ marginTop: 8, marginBottom: 4, maxWidth: "1240px" }}>
      {/* Header */}
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 3 }}>
        Estimate Your Bridge Rate
      </Typography>

      {/* Borrower Information Section */}
      <Box sx={{ border: "1px solid #ccc", padding: 4, borderRadius: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
          Borrower Information
        </Typography>

        <Grid container spacing={2}>
          {/* Property State */}
          <Grid item xs={6} md={3}>
            <Typography variant="body2">Property State</Typography>
            <Select
              fullWidth
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value="CA">CA</MenuItem>
              <MenuItem value="TX">TX</MenuItem>
              <MenuItem value="NY">NY</MenuItem>
            </Select>
          </Grid>

          {/* Property Type */}
          <Grid item xs={6} md={3}>
            <Typography variant="body2">Property Type</Typography>
            <Select
              fullWidth
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <MenuItem value="Single Family">Single Family</MenuItem>
              <MenuItem value="Multi-Family">Multi-Family</MenuItem>
              <MenuItem value="Commercial">Commercial</MenuItem>
            </Select>
          </Grid>

          {/* FICO Score */}
          <Grid item xs={6} md={3}>
            <Typography variant="body2">Est. FICO Score</Typography>
            <Select
              fullWidth
              value={ficoScore}
              onChange={(e) => setFicoScore(e.target.value)}
            >
              <MenuItem value="720-739">720-739</MenuItem>
              <MenuItem value="740-759">740-759</MenuItem>
              <MenuItem value="760+">760+</MenuItem>
            </Select>
          </Grid>

          {/* Refinance */}
          <Grid item xs={6} md={3}>
            <Typography variant="body2">Refinance</Typography>
            <Select
              fullWidth
              value={refinance}
              onChange={(e) => setRefinance(e.target.value)}
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
            </Select>
          </Grid>

          {/* Purchase Price */}
          <Grid item xs={6} md={3}>
            <Typography variant="body2">Purchase Price</Typography>
            <TextField fullWidth placeholder="$200,000" />
          </Grid>

          {/* Purchase Loan Amount */}
          <Grid item xs={6} md={3}>
            <Typography variant="body2">Est. Construction Costs</Typography>
            <TextField fullWidth placeholder="$150,000" />
          </Grid>
          {/*  Loan Result */}

          {/* Estimated Cost of Rehab */}
          <Grid item xs={6} md={3}>
            <Typography variant="body2">Loan to Total Cost</Typography>
            <TextField fullWidth placeholder="85%" />
          </Grid>
          <Grid item xs={6} md={3} alignSelf={"end"}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                mt: 1,
                fontSize: "12px",
              }}
            >
              You qualify for a loan up to <strong> 85%</strong> ($191,250).
            </Typography>
          </Grid>

          {/* After Repair Value */}
          <Grid item xs={6} md={3}>
            <Typography variant="body2">
              Completed/After Repair Value (ARV)
            </Typography>
            <TextField fullWidth placeholder="$300,000" />
          </Grid>
          <Grid item xs={6} md={3} alignSelf={"end"}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1, fontSize: "12px" }}
            >
              After-repair loan-to-value is <strong>63.75%</strong>.{" "}
            </Typography>
          </Grid>
        </Grid>

        <div className="flex max-md:flex-col max-md:items-start gap-2 items-center justify-between mt-5 mb-4">
          <Typography sx={{ fontSize: "1x" }} color="textDisabled">
            Initial Disbursement <br />
            <strong className="text-black font-medium">$154,897</strong>
          </Typography>
          <Typography sx={{ fontSize: "1x" }} color="textDisabled">
            Future Construction Funding <br />
            <strong className="text-black font-medium">$25,000</strong>
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>
            Total Loan Amount: <br />
            <strong>$175,000</strong>
          </Typography>
        </div>
        <Typography className="mb-4">
          Remaining Borrower Equity Contribution: $0
        </Typography>

        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ marginBottom: 3 }}
        >
          Broker Origination Compensation
        </Typography>

        <Grid container spacing={2}>
          {/* Broker Points */}
          <Grid item xs={6}>
            <Typography variant="body2">Broker Points</Typography>
            <Select
              fullWidth
              value={brokerPoints}
              onChange={(e) => setBrokerPoints(e.target.value)}
            >
              <MenuItem value="0%">0%</MenuItem>
              <MenuItem value="1%">1%</MenuItem>
              <MenuItem value="2%">2%</MenuItem>
            </Select>
          </Grid>

          {/* Broker Admin Fee */}
          <Grid item xs={6}>
            <Typography variant="body2">Broker Admin Fee</Typography>
            <TextField fullWidth placeholder="$0" />
          </Grid>
        </Grid>
        <Typography variant="subtitle1" sx={{ marginTop: 3 }} fontWeight="500">
          Rates have been calculated &#128509;
        </Typography>
      </Box>

      {/* Broker Compensation Section */}
      <Typography className="mt-8">
        Based on the provided information, your borrower has qualified for the
        following:
      </Typography>
      {/* Rate Results */}
      <Box sx={{ marginTop: 2 }}>
        {/* Rate Table */}
        <div className="flex flex-col ">
          <div className="bg-[#d6f5ec] border p-2 uppercase text-xs">
            Lowest Rate
          </div>
          {[12].map((term, index) => (
            <div
              className=" border mb-4 max-md:flex-col flex items-start justify-between p-5 py-8 gap-5 shadow  "
              key={index}
            >
              <div className="flex flex-col gap-1 ">
                <p className="text-xs"> Loan Type:</p>
                <p className="text-lg  font-medium"> {term} Months </p>
                <p className="text-blue-500 text-xs mt-5">
                  SHOW/ADD BROKER COMPONSATION{" "}
                </p>
              </div>
              <p>
                Est. Monthly Payment
                <br /> $1,031.25
              </p>
              <p>
                Borrower Interest Rate
                <br /> 8.25%
              </p>
              <p>
                Total Borrower Points
                <br /> 1.00%
              </p>
              <p>
                Total Borrower Fees
                <br /> $1,750.00
              </p>
              <ReusableButton
                label="Choose"
                link="/start/bridge-broker/eligibilty"
              />
            </div>
          ))}
        </div>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          marginTop: 6,
          textAlign: "center",
          borderTop: "1px solid #ccc",
          paddingTop: 2,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Need a custom loan amount? Call 1 (844) 415-4663
        </Typography>
      </Box>
    </Container>
  );
};

export default BridgeRateCalculator;
