import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

interface TabInputProps {
    label: string; // Label for the input (e.g., "Tax amount", "Insurance amount")
    description: string; // Description below the input
    onTabChange?: (tab: string) => void; // Callback for tab change
    onValueChange?: (value: string) => void; // Callback for input value change
}

const TabInput: React.FC<TabInputProps> = ({
    label,
    description,
    onTabChange,
    onValueChange,
}) => {
    const [activeTab, setActiveTab] = useState("Monthly");
    const [value, setValue] = useState("");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (onTabChange) onTabChange(tab);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        if (onValueChange) onValueChange(inputValue);
    };

    return (
        <Box >
            {/* Tabs */}
        
            <Box className="flex items-center mb-2">
                <Button
                    variant={activeTab === "Monthly" ? "contained" : "outlined"}
                    onClick={() => handleTabClick("Monthly")}
                    className="text-sm"
                    sx={{
                        borderRadius: "8px 0 0 8px", // Rounded on the left side only
                        borderRight: "none", // Remove the right border for connection
                        zIndex: activeTab === "Monthly" ? 1 : 0, // Ensure active tab is visually above
                    }}
                >
                    Monthly
                </Button>
                <Button
                    variant={activeTab === "Annual" ? "contained" : "outlined"}
                    onClick={() => handleTabClick("Annual")}
                    className="text-sm"
                    sx={{
                        borderRadius: "0 8px 8px 0", // Rounded on the right side only
                        borderLeft: "none", // Remove the left border for connection
                        zIndex: activeTab === "Annual" ? 1 : 0, // Ensure active tab is visually above
                    }}
                >
                    Annual
                </Button>
                <Typography variant="body1" className="ml-4">
                    {label}
                </Typography>
            </Box>


            {/* Input Field */}
            <TextField
                fullWidth
                placeholder="Enter here"
                InputProps={{
                    startAdornment: (
                        <Box component="span" className="text-gray-500 mr-1">
                            $
                        </Box>
                    ),
                }}
                value={value}
                onChange={handleInputChange}
            />

            {/* Description */}
            <Typography variant="body2" color="textSecondary" className="mt-1">
                {description}
            </Typography>
        </Box>
    );
};

export default TabInput;
