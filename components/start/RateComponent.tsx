import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const RateTable = () => {
  const [filter, setFilter] = useState<string>("all");

  // Sample data for loans
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

  // Handle filter change
  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Top Navbar with Filters */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6">
          You qualified for the following loans.
        </Typography>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          sx={{
            "& .MuiToggleButton-root": {
              borderRadius: "20px",
              padding: "8px 16px",
              fontWeight: "bold",
              textTransform: "none",
            },
            "& .Mui-selected": {
              backgroundColor: "#bbf7d0",
              color: "#047857",
            },
          }}
        >
          <ToggleButton value="all">All Loans</ToggleButton>
          <ToggleButton value="interest">Interest Only</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Loan Options */}
      <Grid container spacing={2}>
        {loanData.map((loan, index) => (
          <Grid item xs={12} key={index}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Highlight Tag */}
              {loan.tag && (
                <Box
                  sx={{
                    backgroundColor: "#bbf7d0",
                    padding: "4px 12px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {loan.tag.toUpperCase()}
                </Box>
              )}

              {/* Loan Details */}
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={2}>
                    <Typography variant="subtitle2">Loan Type</Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {loan.type}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="subtitle2">
                      Est. Monthly Payment
                    </Typography>
                    <Typography variant="body1">{loan.payment}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="subtitle2">
                      Borrower Interest Rate
                    </Typography>
                    <Typography variant="body1">{loan.rate}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="subtitle2">
                      Total Borrower Points
                    </Typography>
                    <Typography variant="body1">{loan.points}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="subtitle2">
                      Total Borrower Fees
                    </Typography>
                    <Typography variant="body1">{loan.fees}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#047857",
                        "&:hover": { backgroundColor: "#065f46" },
                      }}
                    >
                      Choose
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>

              {/* Divider */}
              <Divider sx={{ marginX: "16px" }} />

              {/* Footer */}
              <Box sx={{ padding: "8px 16px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0369a1",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Show/Add Broker Compensation
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RateTable;
