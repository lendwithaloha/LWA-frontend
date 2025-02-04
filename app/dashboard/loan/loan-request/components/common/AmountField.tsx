import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

const CommaSeparatedTextField = () => {
  const [value, setValue] = useState("");

  // Function to format number with commas
  const formatNumberWithCommas = (value: string) => {
    // Remove non-numeric characters except "."
    const numericValue = value.replace(/[^0-9.]/g, "");
    // Format with commas
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatNumberWithCommas(inputValue);
    setValue(formattedValue);
  };

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Enter amount"
        value={value}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <Box component="span" className="text-gray-500 mr-1">
              $
            </Box>
          ),
        }}
      />
    </Box>
  );
};

export default CommaSeparatedTextField;
