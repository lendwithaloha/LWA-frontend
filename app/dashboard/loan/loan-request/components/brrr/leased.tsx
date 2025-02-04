import React, { useState } from "react";
import { Box, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import CommaSeparatedTextField from "../common/AmountField";

const LeaseForm = () => {
  const [subsidized, setSubsidized] = useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubsidized((event.target as HTMLInputElement).value);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Lease Amount */}
      <Typography variant="body1" sx={{ mb: 1 }}>
        Lease Amount
      </Typography>
     <CommaSeparatedTextField/>

      {/* Lease Start Date */}
      <Typography variant="body1" sx={{ mb: 1 }}>
        When did the current lease start?
      </Typography>
      <TextField
        fullWidth
        placeholder="Pick a date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mb: 3 }}
      />

      {/* Subsidized Lease Question */}
      <Typography variant="body1" sx={{ mb: 1 }}>
        Is your lease agreement paid for or subsidized by any government housing such as Section 8?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          row
          value={subsidized}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default LeaseForm;
