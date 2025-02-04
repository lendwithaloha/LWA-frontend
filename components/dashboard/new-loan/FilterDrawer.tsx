import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  filterInquiries,
  resetFilters as resetReduxFilters,
} from "@/store/slice/loan-inquiry/loanSlice";

const FilterDrawer = () => {
  const dispatch = useDispatch();

  const handleApplyFilters = () => {
    dispatch(filterInquiries(filters));
    // setIsDrawerOpen(false); // Close the drawer
  };

  const resetFilters = () => {
    setFilters({
      dateCreated: "",
      propertyAddress: "",
      loanPurpose: "",
    });
    dispatch(resetReduxFilters());
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateCreated: "",
    propertyAddress: "",
    loanPurpose: "",
  });

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const handleFilterChange =
    (field: string) => (event: SelectChangeEvent<string>) => {
      setFilters({ ...filters, [field]: event.target.value });
    };

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 200, // Adjust the height as needed
        width: 250, // Adjust the width as needed
      },
    },
  };

  return (
    <>
      {/* Filter Button */}
      <Button variant="outlined" onClick={toggleDrawer(true)}>
        Filter
      </Button>

      {/* Filter Drawer */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 400, p: 3 }}>
          {" "}
          {/* Increased width to 400px */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6">Filter</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {/* Filter Options */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Date Created
            </Typography>
            <FormControl fullWidth>
              <Select
                value={filters.dateCreated}
                onChange={handleFilterChange("dateCreated")}
                displayEmpty
                MenuProps={menuProps}
              >
                <MenuItem value="">Choose</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="thisWeek">This Week</MenuItem>
                <MenuItem value="thisMonth">This Month</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Property Address
            </Typography>
            <FormControl fullWidth>
              <Select
                value={filters.propertyAddress}
                onChange={handleFilterChange("propertyAddress")}
                displayEmpty
                MenuProps={menuProps}
              >
                <MenuItem value="">Choose</MenuItem>
                <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                <MenuItem value="New York">New York</MenuItem>
                <MenuItem value="Chicago">Chicago</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Loan Purpose
            </Typography>
            <FormControl fullWidth>
              <Select
                value={filters.loanPurpose}
                onChange={handleFilterChange("loanPurpose")}
                displayEmpty
                MenuProps={menuProps}
              >
                <MenuItem value="">Choose</MenuItem>
                <MenuItem value="Purchase">Purchase</MenuItem>
                <MenuItem value="Refinance">Refinance</MenuItem>
                <MenuItem value="Fix and Flip">Fix and Flip</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Reset and Apply Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button variant="outlined" onClick={resetFilters}>
              Reset
            </Button>
            <Button variant="contained" onClick={handleApplyFilters}>
              Apply
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
