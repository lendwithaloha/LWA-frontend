import React, { useState } from "react";
import {
    Box,
    Grid,
    TextField,
    Typography,
    Tooltip,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
} from "@mui/material";
import { HelpOutline } from "@mui/icons-material";

interface NewConstructPropertyTypesProps {
    data: {
        label: string;
        currentValue: string | number;
        tooltip?: string; // Optional tooltip for specific fields
    }[];
    onChange: (field: string, value: string) => void;
}




const NewConstructPropertyTypes: React.FC<NewConstructPropertyTypesProps> = ({ data, onChange }) => {







    return (
        <Box sx={{ py: 4 }}>
            {/* Editable Selection */}


            {/* Header */}
            <Grid container spacing={2} alignItems="center" mb={2}>

                <Typography variant="subtitle1" >
                    Enter the value of the land alone, excluding any structures on the property, especially if the current structure will be demolished for new construction.                    </Typography>



            </Grid>

            {/* Rows */}
            {data.map((row, index) => (
                <Grid container spacing={2} alignItems="center" mb={2} key={index}>
                    {/* Label */}
                    <Grid item xs={12} display="flex" justifyContent={"space-between"} alignItems="center">
                        <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>

                            <Typography variant="body2" >{row.label}</Typography>
                            {row.tooltip && (
                                <Tooltip title={row.tooltip}>
                                    <IconButton size="small">
                                        <HelpOutline fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                        <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>

                            <TextField

                                type="text"
                                InputProps={{
                                    placeholder: "Enter Here",
                                }}
                            />
                        </Box>
                    </Grid>






                </Grid>
            ))}
        </Box>
    );
};

export default NewConstructPropertyTypes;


