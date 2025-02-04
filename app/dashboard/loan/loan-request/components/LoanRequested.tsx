import React from "react";
import {
    Box,
    Typography,
    TextField,
    Switch,
    FormControlLabel,
    RadioGroup,
    FormControl,
    FormControlLabel as RadioLabel,
    Radio,
    Tooltip,
    IconButton,
    Grid,
} from "@mui/material";
import { HelpOutline } from "@mui/icons-material";

interface LoanRequestedProps {
    formData: {
        isMaxLeverage: boolean;
        specificLoanAmount: string;
        specificLTV: string;
        financeMortgage: string;
        creditScore: string;
        rentalsOwned: string;
        propertiesSold: string;
        lifetimeSales: string;
    };
    onChange: <K extends keyof LoanRequestedProps['formData']>(
        field: K,
        value: LoanRequestedProps['formData'][K]
    ) => void;
}

const LoanRequested: React.FC<LoanRequestedProps> = ({ formData, onChange }) => {
    const handleInputChange =
        <K extends keyof LoanRequestedProps['formData']>(field: K) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(field, event.target.value as LoanRequestedProps['formData'][K]);
        };

    const handleToggleChange =
        (field: keyof LoanRequestedProps['formData']) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(field, event.target.checked as LoanRequestedProps['formData'][typeof field]);
        };

    const renderFieldWithLabel = <K extends keyof LoanRequestedProps['formData']>(
        label: string,
        fieldName: K,
        placeholder: string,
        adornment?: string
    ) => (
        <Box mb={3}>
            <Typography variant="body2" color="textSecondary" mb={1}>
                {label}
            </Typography>
            <TextField
                fullWidth
                placeholder={placeholder}
                value={formData[fieldName]}
                onChange={handleInputChange(fieldName)}
                InputProps={
                    adornment
                        ? {
                              startAdornment: adornment === "$" ? <Typography>$</Typography> : null,
                              endAdornment: adornment === "%" ? <Typography>%</Typography> : null,
                          }
                        : undefined
                }
            />
        </Box>
    );

    return (
        <Box>
            {/* Loan Amount Requested */}
            <Typography variant="h6" mb={2}>
                Loan Amount Requested
            </Typography>

            {/* Max Leverage */}
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.isMaxLeverage}
                        onChange={handleToggleChange("isMaxLeverage")}
                        color="primary"
                    />
                }
                label="Max Leverage"
            />

            {formData.isMaxLeverage && (
                <Typography
                    variant="body2"
                    color="textSecondary"
                    mt={1}
                    sx={{ fontStyle: "italic" }}
                >
                    We will prioritize the least amount of cash out of pocket for you,
                    maximizing the use of Other People’s Money (OPM).
                </Typography>
            )}

            {/* Specific Loan Amount & LTV */}
            <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    {renderFieldWithLabel("Specific Loan Amount", "specificLoanAmount", "Enter here", "$")}
                </Grid>
                <Grid item xs={6}>
                    {renderFieldWithLabel("Specific LTV", "specificLTV", "Enter here", "%")}
                </Grid>
            </Grid>

            {/* Finance Mortgage Payments */}
            <Box mt={3}>
                <FormControl>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="body2" color="textSecondary">
                            Do you want to finance your mortgage payments?
                        </Typography>
                        <Tooltip title="This refers to whether you'd like to include your mortgage payments in the financing.">
                            <IconButton size="small">
                                <HelpOutline fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <RadioGroup
                        row
                        value={formData.financeMortgage}
                        onChange={handleInputChange("financeMortgage")}
                    >
                        <RadioLabel value="yes" control={<Radio />} label="Yes" />
                        <RadioLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Box>

            {/* Estimated Credit Score */}
            <Box mt={3}>
                {renderFieldWithLabel(
                    "Estimated Credit Score",
                    "creditScore",
                    "Enter here"
                )}
            </Box>

            {/* Experience Section */}
            <Box mt={4}>
                <Typography variant="h6" mb={1}>
                    Experience
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                    Only properties where you can be connected to title count toward
                    experience.
                </Typography>

                {/* Experience Fields */}
                {renderFieldWithLabel(
                    "Current number of rentals owned",
                    "rentalsOwned",
                    "Enter here ..."
                )}
                {renderFieldWithLabel(
                    "Total number of properties sold in the last 2 years",
                    "propertiesSold",
                    "Enter here ..."
                )}
                {renderFieldWithLabel(
                    "Total number of lifetime sales",
                    "lifetimeSales",
                    "Enter here ..."
                )}
            </Box>
        </Box>
    );
};

export default LoanRequested;
