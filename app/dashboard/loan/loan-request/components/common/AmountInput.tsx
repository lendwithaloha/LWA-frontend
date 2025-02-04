import React from "react";
import { TextField, FormControl, FormLabel, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";

interface AmountInputProps {
    label: string;
    description: string;
    billingType: string;
    amount: string;
    onBillingChange: (event: React.MouseEvent<HTMLElement>, newBillingType: string | null) => void;
    onAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const AmountInput: React.FC<AmountInputProps> = ({
    label,
    description,
    billingType,
    amount,
    onBillingChange,
    onAmountChange,
    placeholder = "Enter here"
}) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {/* Toggle Buttons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ToggleButtonGroup
                    value={billingType}
                    exclusive
                    onChange={onBillingChange}
                    sx={{ borderRadius: "20px", overflow: "hidden", width: "fit-content" }}
                >
                    <ToggleButton value="monthly" sx={{ textTransform: "none", fontWeight: "bold" }}>Monthly</ToggleButton>
                    <ToggleButton value="annual" sx={{ textTransform: "none", fontWeight: "bold" }}>Annual</ToggleButton>
                </ToggleButtonGroup>

                {/* Label positioned correctly */}
                <Typography sx={{ fontSize: "14px" }}>{label}</Typography>
            </Box>


            {/* Input Label */}
            <FormLabel sx={{ fontWeight: "bold", fontSize: "14px" }}>{label}</FormLabel>

            {/* Text Input */}
            <TextField
                variant="outlined"
                placeholder={placeholder}
                value={amount}
                onChange={onAmountChange}
                InputProps={{
                    startAdornment: <span style={{ marginRight: 8, fontWeight: "bold" }}>$</span>
                }}
                fullWidth
            />

            {/* Description */}
            <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray" }}>
                {description}
            </Typography>
        </Box>
    );
};

export default AmountInput;
