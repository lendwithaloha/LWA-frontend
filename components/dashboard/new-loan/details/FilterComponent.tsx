import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface FilterProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

interface FilterState {
  interestRateRange?: [number, number];
  loanAmount?: string;
  savedOnly: boolean;
}

const interestRateRanges = [
  { label: "Below 10%", range: [0, 10] },
  { label: "10% - 12%", range: [10, 12] },
  { label: "12% - 15%", range: [12, 15] },
  { label: "Above 15%", range: [15, Infinity] },
];

const FilterComponent = ({ open, onClose, onApply }: FilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    interestRateRange: undefined,
    loanAmount: "",
    savedOnly: false,
  });

  const handleRangeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (value === "") {
      setFilters({ ...filters, interestRateRange: undefined });
    } else {
      const parsedRange = value.split(",").map(Number) as [number, number];
      setFilters({ ...filters, interestRateRange: parsedRange });
    }
  };

  const handleInputChange =
    (field: keyof FilterState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ ...filters, [field]: event.target.value });
    };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, savedOnly: event.target.checked });
  };

  const handleApply = () => {
    onApply(filters);
    onClose(); // Close the drawer
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={4} width={300}>
        <Typography variant="h6" gutterBottom>
          Filter Options
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Interest Rate</InputLabel>
          <Select
            value={
              filters.interestRateRange
                ? filters.interestRateRange.join(",")
                : ""
            }
            onChange={handleRangeChange}
            displayEmpty
          >
            {interestRateRanges.map((option) => (
              <MenuItem
                key={option.label}
                value={option.range ? option.range.join(",") : ""}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Loan Amount"
          variant="outlined"
          fullWidth
          margin="normal"
          value={filters.loanAmount}
          onChange={handleInputChange("loanAmount")}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.savedOnly}
              onChange={handleCheckboxChange}
            />
          }
          label="Saved Quotes Only"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
          onClick={handleApply}
        >
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilterComponent;
