import React from "react";
import { TextField, Box } from "@mui/material";

interface DateInputProps {
    label?: string;
    value: string;
    onChange: (date: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label = "Select Date", value, onChange }) => {
    return (
        <Box className="w-full">
            {/* Label */}
            <div className="mb-1">
                <label className="font-medium text-gray-700">{label}</label>
            </div>

            {/* Date Input */}
            <TextField
                fullWidth
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                InputLabelProps={{ shrink: true }}
            />
        </Box>
    );
};

export default DateInput;
