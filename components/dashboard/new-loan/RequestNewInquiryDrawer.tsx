"use client";
import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ConstructionIcon from "@mui/icons-material/Construction";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RepeatIcon from "@mui/icons-material/Repeat";

interface FirstDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (loanType: string) => void;
}

const FirstDrawer: React.FC<FirstDrawerProps> = ({ isOpen, onClose, onProceed }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const investmentStrategies = [
    { title: "Fix and Flip", description: "Buy, renovate, and sell properties for profit.", icon: <HomeRepairServiceIcon /> },
    { title: "New Construction", description: "Finance for building new properties.", icon: <ConstructionIcon /> },
    { title: "BRRRR Method", description: "Buy, Rehab, Rent, Refinance, and Repeat.", icon: <RepeatIcon /> },
    { title: "DSCR Loans", description: "Loans based on the property's cash flow rather than income.", icon: <AccountBalanceIcon /> },
  ];

  const filteredStrategies = investmentStrategies.filter((strategy) =>
    strategy.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 500, p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Requesting Your Loan Inquiry
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Search Field */}
        <TextField
          fullWidth
          placeholder="Search loan types..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          sx={{ mb: 3, borderRadius: 2 }}
        />

        {/* Investment Strategies List */}
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Choose Investment Strategy
        </Typography>
        <List>
          {filteredStrategies.map((strategy, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 3,
                mb: 2,
                p: 3,
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
              onClick={() => onProceed(strategy.title)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ListItemAvatar>
                  <Avatar sx={{  width: 48, height: 48 }} className="bg-primaryColor ">
                    {strategy.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      {strategy.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {strategy.description}
                    </Typography>
                  }
                />
              </Box>
              <ArrowForwardIosIcon fontSize="small" />
            </ListItem>
          ))}
        </List>

        {/* Proceed Button */}
        {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            onClick={() => onProceed(searchQuery || "Custom Loan Type")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderRadius: "12px",
              padding: "10px 20px",
            }}
          >
            Proceed
            <ArrowForwardIosIcon fontSize="small" />
          </Button>
        </Box> */}
      </Box>
    </Drawer>
  );
};

export default FirstDrawer;
