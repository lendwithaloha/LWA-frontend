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

interface PropertyDetailsProps {
    data: {
        label: string;
        currentValue: string | number;
        tooltip?: string; // Optional tooltip for specific fields
    }[];
    onChange: (field: string, value: string, type: "current" | "afterCompletion") => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ data, onChange }) => {
    const [isEditable, setIsEditable] = useState(false);

    const handleInputChange = (
        field: string,
        type: "current" | "afterCompletion"
    ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(field, event.target.value, type);
    };

    const handleEditableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsEditable(event.target.value === "yes");
    };

    return (
        <Box >
            {/* Editable Selection */}
            <Box mb={3}>
                <Typography variant="subtitle1" mb={2}>
                    Are you going to be making any changes to the layout/floorplan and/or adding square footage?
                </Typography>
                <RadioGroup
                    row
                    value={isEditable ? "yes" : "no"}
                    onChange={handleEditableChange}
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </Box>

            {/* Header */}
            <Grid container spacing={2} alignItems="center" mb={2}>
                <Grid item xs={4}>
                    <Typography variant="subtitle1" >
                        Property Type
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1" >
                        Current
                    </Typography>
                </Grid>
                <Grid item xs={4} display="flex" alignItems="center">
                    <Typography variant="subtitle1" >
                        After Completion
                    </Typography>
                    <Tooltip title="Values expected after project completion">
                        <IconButton size="small">
                            <HelpOutline fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>

            {/* Rows */}
            {data.map((row, index) => (
                <Grid container spacing={2} alignItems="center" mb={2} key={index}>
                    {/* Label */}
                    <Grid item xs={4} display="flex" alignItems="center">
                        <Typography variant="body2">{row.label}</Typography>
                        {row.tooltip && (
                            <Tooltip title={row.tooltip}>
                                <IconButton size="small">
                                    <HelpOutline fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Grid>

                    {/* Current Value */}
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            value={row.currentValue}
                            onChange={handleInputChange(row.label, "current")}
                            placeholder="Current"
                            disabled={!isEditable} // Disable input if "No" is selected
                        />
                    </Grid>

                    {/* After Completion Value */}
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            placeholder="Enter here ..."
                            onChange={handleInputChange(row.label, "afterCompletion")}
                        />
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
};

export default PropertyDetails;
