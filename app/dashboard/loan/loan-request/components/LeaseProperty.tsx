import React from "react";
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from "@mui/material";

interface LeaseFormProps {
    leaseAmount: string;
    leaseStartDate: string;
    subsidized: string;
    onLeaseAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onLeaseStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubsidizedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LeaseForm: React.FC<LeaseFormProps> = ({
    leaseAmount,
    leaseStartDate,
    subsidized,
    onLeaseAmountChange,
    onLeaseStartDateChange,
    onSubsidizedChange
}) => {
    return (
        <Box sx={{  p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Lease Amount */}
            <FormControl fullWidth>
                <FormLabel >Lease Amount</FormLabel>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Enter here"
                    value={leaseAmount}
                    onChange={onLeaseAmountChange}
                    InputProps={{
                        startAdornment: <span style={{ marginRight: 8, fontWeight: "bold" }}>$</span>
                    }}
                />
            </FormControl>

            {/* Lease Start Date */}
            <FormControl fullWidth>
                <FormLabel >When did the current lease start?</FormLabel>
                <TextField
                    type="date"
                    value={leaseStartDate}
                    onChange={onLeaseStartDateChange}
                />
            </FormControl>

            {/* Subsidized Lease Question */}
            <FormControl>
                <FormLabel >
                    Is your lease agreement paid for or subsidized by any government housing such as Section 8?
                </FormLabel>
                <RadioGroup row value={subsidized} onChange={onSubsidizedChange}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default LeaseForm;
