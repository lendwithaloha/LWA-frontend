import { TextField } from "@mui/material";
import React, { useState } from "react";

type FormattedNumberInputProps = {
    label: string;
    value: number | string;
    onChange: (value: number) => void;
    placeholder?: string;
    required?: boolean;
};

const FormattedNumberInput: React.FC<FormattedNumberInputProps> = ({ label, value, onChange, placeholder, required }) => {
    const [inputValue, setInputValue] = useState(value.toString());

    const formatNumber = (num: string) => {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/,/g, "");
        if (/^\d*$/.test(rawValue)) {
            setInputValue(rawValue);
            onChange(Number(rawValue));
        }
    };

    return (
        <div className="flex flex-col w-full">
            <label className="mb-1 font-medium text-gray-700">{label}</label>
            <TextField
                fullWidth
                placeholder={placeholder}
                value={formatNumber(inputValue)}
                onChange={handleChange}
                required={required}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
        </div>
    );
};

export default FormattedNumberInput;
