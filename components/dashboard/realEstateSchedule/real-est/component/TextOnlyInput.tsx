import { TextField } from "@mui/material";
import React, { useState } from "react";

interface TextOnlyInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
}

const TextOnlyInput: React.FC<TextOnlyInputProps> = ({ label, value, onChange, placeholder, required }) => {
    const [inputValue, setInputValue] = useState(value); // Internal state to track input

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const textValue = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces
        setInputValue(textValue);
        onChange(textValue); // Pass to parent component
    };

    return (
        <div className="flex flex-col w-full">
            <label className="mb-1 font-medium text-gray-700">{label}</label>
            <TextField
                fullWidth
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
                required={required}
                inputProps={{ pattern: "[a-zA-Z ]*" }} // Ensure only letters & spaces
            />
        </div>
    );
};

export default TextOnlyInput;
