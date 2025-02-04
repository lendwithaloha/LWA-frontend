"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import ReusableButton from "@/components/common_btn";

const BridgeRateCalculator = () => {
  // State management
  const [state, setState] = useState("CA");
  const [selectedTab, setSelectedTab] = useState(0);
  const [propertyType, setPropertyType] = useState("Single Family");
  const [ficoScore, setFicoScore] = useState("720-739");
  const [refinance, setRefinance] = useState("No");
  const [term, setTerm] = useState("3");
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [brokerPoints, setBrokerPoints] = useState("0%");
  const loanData = [
    {
      type: "5/1 Adjustable",
      payment: "$828.81",
      rate: "7.375%",
      points: "0.000%",
      fees: "$0.00",
      tag: "Lowest Rate",
    },
    {
      type: "Interest-Only 5/1 Adjustable",
      payment: "$737.50",
      rate: "7.375%",
      points: "0.000%",
      fees: "$0.00",
      tag: "",
    },
  ];

  // Handle tab change
  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: React.SetStateAction<number>
  ) => {
    setSelectedTab(newValue);
  };
  return (
    <Container sx={{ marginTop: 4, marginBottom: 4, maxWidth: "1240px" }}>
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
              size="small"
              sx={{}}
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
              size="small"
              sx={{}}
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
              size="small"
              sx={{}}
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
              size="small"
              sx={{}}
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
            <TextField size="small" fullWidth placeholder="$200,000" />
          </Grid>

          {/* Purchase Loan Amount */}
          <Grid item xs={6} md={3}>
            <Typography variant="body2">Estimated Home Value</Typography>
            <TextField size="small" fullWidth placeholder="$150,000" />
          </Grid>
          {/* Remaining Mortgage */}
          <Grid item xs={6} md={3}>
            <Typography variant="body2">Remaining Mortgage</Typography>
            <TextField size="small" fullWidth placeholder="$150,000" />
          </Grid>
          {/*  Loan Result */}
          {/* Remaining Mortgage */}
          <Grid item xs={6} md={3}>
            <Typography variant="body2">Prop. Acquisition Date</Typography>
            <TextField
              size="small"
              sx={{}}
              fullWidth
              placeholder="09/07/2024"
            />
          </Grid>
          {}
          {/* Remaining Mortgage */}
          <Grid item xs={6} md={3}>
            <Typography variant="body2">Prepayment Penalty</Typography>
            <Select
              size="small"
              sx={{}}
              fullWidth
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            >
              <MenuItem value="3">3-year-term</MenuItem>
              <MenuItem value="5">5-year-term</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ marginBottom: 3, marginTop: 4 }}
        >
          Broker Origination Compensation
        </Typography>

        <Grid container spacing={2}>
          {/* Broker Points */}
          <Grid item xs={6}>
            <Typography variant="body2">Broker Points</Typography>
            <Select
              size="small"
              sx={{}}
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
            <TextField size="small" fullWidth placeholder="$0" />
          </Grid>
        </Grid>
        <div className="bg-[#eefbf7] mt-5 p-5">
          <div className="flex max-sm:flex-col max-sm:item-start gap-4 justify-between items-center">
            <h1 className="font-bold text-black">
              Debt Service Coverage Ratio
            </h1>
            <button
              className="border rounded  p-2 text-[10px] border-[#00615c] text-[#00615c]"
              onClick={() => setShowAdd(!showAdd)}
            >
              {!showAdd ? "Add DSCR information" : "Remove DSCR information"}
            </button>
          </div>
          {showAdd && (
            <div>
              <Box
                sx={(theme) => ({
                  backgroundColor: "#f0fdf4", // Light green background
                  marginTop: "18px",
                  marginBottom: "22px",
                  borderRadius: "8px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexDirection: "row", // Default: Two-column layout
                  [theme.breakpoints.down("md")]: {
                    flexDirection: "column", // Stack on smaller screens
                  },
                })}
              >
                {/* Fields */}
                {[
                  { label: "Est. Monthly Rental Income", defaultValue: "$0" },
                  {
                    label: "Est. Annual Property Insurance",
                    defaultValue: "$0",
                  },
                  { label: "Est. Annual Property Taxes", defaultValue: "$0" },
                  {
                    label: "Est. Monthly HOA Fee",
                    defaultValue: "$0",
                    helperText: "* When Applicable",
                  },
                ].map((field, index) => (
                  <Box key={index}>
                    <Typography variant="body1" gutterBottom>
                      {field.label}
                    </Typography>
                    <TextField
                      defaultValue={field.defaultValue}
                      size="medium"
                      type="number"
                      placeholder="$0"
                      sx={{
                        borderRadius: "4px",
                        border: "none",
                        display: "flex",
                      }}
                    />
                    {field.helperText && (
                      <Typography variant="caption" sx={{ color: "#6b7280" }}>
                        {field.helperText}
                      </Typography>
                    )}
                  </Box>
                ))}

                {/* Footer Section */}
              </Box>
              <Box
                sx={{
                  gridColumn: "span 2",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2">
                  Estimated DSCR Calculation: <strong>1.20</strong>
                </Typography>
              </Box>
            </div>
          )}
        </div>
        <Typography variant="subtitle1" sx={{ marginTop: 3 }} fontWeight="500">
          Rates have been calculated &#128509;
        </Typography>
      </Box>

      {/* Broker Compensation Section */}
      <div className="flex justify-between mt-5 max-sm:flex-col">
        <Typography className="mt-8 text-xs">
          You qualified for the following loans.
        </Typography>
        <Box sx={{ marginBottom: "16px" }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: "bold",
                padding: "8px 16px",
              },
              "& .Mui-selected": {
                color: "#047857",
              },
            }}
          >
            <Tab label="All Loans" />
            <Tab label="Interest Only" />
          </Tabs>
        </Box>
      </div>
      {/* Rate Results */}
      <Box sx={{ marginTop: 2 }}>
        {/* Rate Table */}
        <div className="flex flex-col ">
          <div className="bg-[#d6f5ec] border p-2 uppercase text-xs">
            Lowest Rate
          </div>
          {loanData.map((term, index) => (
            <div
              className=" border mb-4 max-md:flex-col flex items-start justify-between p-5 py-8 gap-5 shadow  "
              key={index}
            >
              <div className="flex flex-col gap-1 ">
                <p className="text-xs"> Loan Type:</p>
                <p className="text-lg  font-medium"> {term.type} </p>
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
