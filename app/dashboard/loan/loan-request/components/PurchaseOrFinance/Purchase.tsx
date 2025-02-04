import React from "react";
import {
    Box,
    Grid,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    InputAdornment,
} from "@mui/material";
import CommaSeparatedTextField from "../common/AmountField";

interface PurchaseFormProps {
    formData: {
        isUnderContract: string;
        purchasePrice: string;
        closeOfEscrow: string; // Use string because <input type="date"> outputs a string in YYYY-MM-DD format
    };
    onChange: (field: string, value: any) => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ formData, onChange }) => {
    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(field, event.target.value);
    };

    return (
        <Box sx={{ p: 4 }}>
            {/* Is the property under contract */}
            <Box mb={3}>
                <Typography variant="body2" color="textSecondary" mb={1}>
                    Is the property under contract?
                </Typography>
                <RadioGroup
                    row
                    value={formData.isUnderContract}
                    onChange={handleInputChange("isUnderContract")}
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </Box>

            {/* Purchase Price and Close of Escrow */}
            <Grid container spacing={3}>
                {/* Purchase Price */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Purchase price
                    </Typography>
                    <CommaSeparatedTextField/>
                </Grid>

                {/* Close of Escrow */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Close of escrow
                    </Typography>
                    <TextField
                        fullWidth
                        type="date"
                        value={formData.closeOfEscrow}
                        onChange={handleInputChange("closeOfEscrow")}
                        InputProps={{
                            placeholder: "Pick a date",
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PurchaseForm;
