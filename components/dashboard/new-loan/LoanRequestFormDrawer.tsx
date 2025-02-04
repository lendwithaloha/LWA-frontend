"use client";
import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,

} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FixAndFlip from "./loan-strategies-fields/FixAndFlip";
import NewConstruction from "./loan-strategies-fields/NewConstruction";
import B4R from "./loan-strategies-fields/B4R";
import DSCR from "./loan-strategies-fields/DSCR";

interface SecondDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  loanType: string;
  onChangeLoanType:()=>void;
}

const SecondDrawer: React.FC<SecondDrawerProps> = ({ isOpen, onClose, loanType,onChangeLoanType }) => {


  const renderFieldsByLoanType = () => {
    switch (loanType) {
      case "Fix and Flip":
        return (
          <FixAndFlip/>
        );

      case "BRRRR Method":
        return (
       <B4R/>
        );

        case "New Construction":
          return (
          <NewConstruction/>
          );

          case "DSCR Loans":
            return (
            <DSCR/>
            );

       

      default:
        return (
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please select a valid loan type.
          </Typography>
        );
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 700, p: 3 }}>
        {/* Header Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6">Requesting Your Loan Inquiry</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            padding: 2,
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Selected Strategy
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {loanType}
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{ backgroundColor: "#6b6b6b", color: "#fff", borderRadius: "20px" }}
              onClick={() => {
                onClose(); // Close second drawer
                onChangeLoanType(); // Open first drawer
              }}
              className="hover:bg-primaryColor"
            >
              Change
            </Button>
          </Box>
          <Typography variant="body2">
            Buy, renovate, and sell for a profit... <a href="#">Learn More</a>
          </Typography>
        </Box>

        {/* Conditional Rendering of Form Fields */}
        {renderFieldsByLoanType()}

      </Box>
    </Drawer>
  );
};

export default SecondDrawer;
