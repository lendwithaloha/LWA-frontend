import React from "react";
import {
    Box,
    Grid,
    TextField,
    Tooltip,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";
import { HelpOutline } from "@mui/icons-material";
import CommaSeparatedTextField from "../common/AmountField";

interface RefinanceFormProps {
    formData: Record<string, any>;
    onChange: (field: string, value: any) => void;
}

const RefinanceForm: React.FC<RefinanceFormProps> = ({ formData, onChange }) => {
    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(field, event.target.value);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
                {/* SOW Completed Since Purchase */}
                <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" color="textSecondary">
                            SOW Completed Since Purchase
                        </Typography>
                        <Tooltip title="Scope of Work (SOW) completed after the purchase of the property.">
                            <IconButton size="small">
                                <HelpOutline fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <CommaSeparatedTextField/>
                </Grid>

                {/* SOW Remaining */}
                <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" color="textSecondary">
                            SOW Remaining
                        </Typography>
                        <Tooltip title="Scope of Work (SOW) that still needs to be completed for the project.">
                            <IconButton size="small">
                                <HelpOutline fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <CommaSeparatedTextField/>
                </Grid>

                {/* Current Unpaid Loan Balance */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Current unpaid loan balance
                    </Typography>
                    <CommaSeparatedTextField/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RefinanceForm;
