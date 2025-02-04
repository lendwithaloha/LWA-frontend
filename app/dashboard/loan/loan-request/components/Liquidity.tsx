import React from "react";
import {
    Box,
    Typography,
    TextField,
    Grid,
    Button,
    Select,
    MenuItem,
    IconButton,
    InputAdornment,
    RadioGroup,
    FormControlLabel,
    Radio,
    Tooltip,
} from "@mui/material";
import { Add, Delete, HelpOutline } from "@mui/icons-material";
import { LiquidityFormData } from "../types/LiquidityFormData";
import CommaSeparatedTextField from "./common/AmountField";



interface LiquidityProps {
    formData: LiquidityFormData;
    onChange: <K extends keyof LiquidityFormData>(
        field: K,
        value: LiquidityFormData[K]
    ) => void;
}

const Liquidity: React.FC<LiquidityProps> = ({ formData, onChange }) => {
    const handleAccountChange = (index: number, field: "type" | "amount", value: string) => {
        const updatedAccounts = formData.accounts.map((account, i) =>
            i === index ? { ...account, [field]: value } : account
        );
        onChange("accounts", updatedAccounts);
    };

    const handleAddAccount = () => {
        onChange("accounts", [...formData.accounts, { type: "", amount: "" }]);
    };

    const handleDeleteAccount = (index: number) => {
        const updatedAccounts = formData.accounts.filter((_, i) => i !== index);
        onChange("accounts", updatedAccounts);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onChange("document", event.target.files[0]);
        }
    };

    const handleDeleteFile = () => {
        onChange("document", null);
    };

    return (
        <Box>
            {/* Account Types Section */}
            <Typography variant="h6" mb={3}>
                Liquidity
            </Typography>
            <Typography variant="subtitle1" mb={2}>
                Account Types
            </Typography>
            {formData.accounts.map((account, index) => (
                <Box
                    key={index}
                    display="flex"
                    alignItems="flex-end" // Aligns all fields and the button to the bottom
                    gap={2} // Adds spacing between the elements
                    mb={2}
                >
                    {/* First Field */}
                    <Box flex={1}>
                        {index === 0 ? (
                            <TextField fullWidth disabled value="Cash" />
                        ) : (
                            <>
                                <Typography variant="body2" color="textSecondary" mb={1}>
                                    Account Type
                                </Typography>
                                <Select
                                    fullWidth
                                    value={account.type}
                                    onChange={(e) => handleAccountChange(index, "type", e.target.value)}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        Choose
                                    </MenuItem>
                                    <MenuItem value="Bank Account">Bank Account</MenuItem>
                                    <MenuItem value="Investments">Investments</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </>
                        )}
                    </Box>

                    {/* Second Field */}
                    <Box flex={1}>
                        <Typography variant="body2" color="textSecondary" mb={1}>
                            Total Amount
                        </Typography>
                        <CommaSeparatedTextField />
                    </Box>

                    {/* Delete Button */}
                    {index > 0 && (
                        <Box>
                            <IconButton onClick={() => handleDeleteAccount(index)}>
                                <Delete />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            ))}


            <Button
                variant="outlined"
                onClick={handleAddAccount}
                sx={{ mt: 2, display: "flex", justifyContent: "center", alignItems: "center" }}
                className="w-1/2 bg-primaryColor text-white hover:bg-blue-600"
            >
                <Add />
            </Button>

            {/* Upcoming Liquidity Events */}
            <Box mt={4}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="body2" color="textSecondary">
                        Any upcoming liquidity events?
                    </Typography>
                    <Tooltip title="Liquidity events like bonus payouts, asset sales, etc.">
                        <IconButton size="small">

                            <HelpOutline fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <RadioGroup
                    row
                    value={formData.upcomingEvents}
                    onChange={(e) => onChange("upcomingEvents", e.target.value)}
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </Box>

            {/* Concerns Section */}
            <Box mt={4}>
                <Typography variant="body2" color="textSecondary" mb={1}>
                    Are there any concerns you have that may impact our ability to close this loan?
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    placeholder="Enter concerns here"
                    value={formData.concerns}
                    onChange={(e) => onChange("concerns", e.target.value)}
                />
            </Box>

            {/* Supporting Document */}
            <Box mt={4}>
                <Typography variant="subtitle1" mb={2}>
                    Supporting Document (Optional)
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                    Upload any additional documents to support your loan inquiry.
                </Typography>
                <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                    Upload Document
                    <input
                        type="file"
                        hidden
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.png,.jpg"
                    />
                </Button>
                {formData.document && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            border: "1px solid #ddd",
                            borderRadius: 1,
                            p: 2,
                            mt: 1,
                        }}
                    >
                        <Typography>{formData.document.name}</Typography>
                        <IconButton onClick={handleDeleteFile}>
                            <Delete />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Liquidity;
