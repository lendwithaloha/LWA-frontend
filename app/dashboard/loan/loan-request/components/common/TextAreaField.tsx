import React from "react";
import { TextField, FormControl, FormLabel } from "@mui/material";

interface TextAreaFieldProps {
    label: string;
    placeholder?: string;
    height?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, placeholder = "Enter text...", height = "100px", value, onChange }) => {
    return (
        <FormControl fullWidth>
            <FormLabel>{label}</FormLabel>
            <TextField
                multiline
                variant="outlined"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                sx={{ mt: 1, "& .MuiInputBase-root": { height } }} // Custom height
            />
        </FormControl>
    );
};

export default TextAreaField;
