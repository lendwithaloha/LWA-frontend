import React from "react";
import {
    Box,
    Grid,
    TextField,
    // RadioGroup,
    // Radio,
    Typography,
    // InputAdornment,
} from "@mui/material";
import CommaSeparatedTextField from "../common/AmountField";
import { Tooltip } from "@/components/common/ToolTip";
import HelpIcon from "@mui/icons-material/Help";


interface NewConstPurchaseProps {
    formData: {
        isUnderContract: string;
        purchasePrice: string;
        closeOfEscrow: string; // Use string because <input type="text"> outputs a string in YYYY-MM-DD format
    };
    onChange: (field: string, value: any) => void;
}

const NewConstPurchase: React.FC<NewConstPurchaseProps> = ({ formData, onChange }) => {
    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(field, event.target.value);
    };

    return (
        <Box sx={{ p: 4 }}>
            {/* Is the property under contract */}


            {/* Purchase Price and Close of Escrow */}
            <Grid container spacing={3}>
                {/* Purchase Price */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Original Purchase price
                    </Typography>
                    <CommaSeparatedTextField />
                </Grid>

                {/* Close of Escrow */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Estimated As-is Value
                    </Typography>
                    <TextField
                        fullWidth
                        type="text"
                        value={formData.closeOfEscrow}
                        onChange={handleInputChange("closeOfEscrow")}
                        InputProps={{
                            placeholder: "Enter Here",
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className="flex gap-2 items-center"><Typography variant="body2" color="textSecondary" mb={1}>
                        SOW completed since Purchase
                    </Typography>
                        <Tooltip text="Scope of Work (SOW) that still needs to be completed for the project.">
                            <HelpIcon />
                        </Tooltip></div>
                    <CommaSeparatedTextField />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div className="flex gap-2 items-center"><Typography variant="body2" color="textSecondary" mb={1}>
                        SOW Remaining

                    </Typography>
                        <Tooltip text="Scope of Work (SOW) that still needs to be completed for the project.">
                            <HelpIcon />
                        </Tooltip></div>
                    <CommaSeparatedTextField />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Soft Costs

                    </Typography>
                    <TextField
                        fullWidth
                        type="text"
                        value={formData.closeOfEscrow}
                        onChange={handleInputChange("closeOfEscrow")}
                        InputProps={{
                            placeholder: "Enter Here",
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Hard Costs

                    </Typography>
                    <TextField
                        fullWidth
                        type="text"
                        value={formData.closeOfEscrow}
                        onChange={handleInputChange("closeOfEscrow")}
                        InputProps={{
                            placeholder: "Enter Here",
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Current Unpaid loan balance

                    </Typography>
                    <TextField
                        fullWidth
                        type="text"
                        value={formData.closeOfEscrow}
                        onChange={handleInputChange("closeOfEscrow")}
                        InputProps={{
                            placeholder: "Enter Here",
                        }}
                    />
                </Grid>


                <Grid item xs={12} sm={12}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Site Value

                    </Typography>
                    <TextField
                        fullWidth
                        type="text"
                        value={formData.closeOfEscrow}
                        onChange={handleInputChange("closeOfEscrow")}
                        InputProps={{
                            placeholder: "Enter Here",
                        }}
                    />
                    <span>Enter the value of the land alone, excluding any structures on the property, especially if the current structure will be demolished for new construction.</span>
                </Grid>


            </Grid>


        </Box>
    );
};

export default NewConstPurchase;
