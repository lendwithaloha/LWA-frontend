import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Tooltip, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// Define the type for each option in the options array
interface Option {
    label: string;
    value: string;
    tooltip?: string; // Tooltip is optional
}

// Define the props type for the component
interface RadioSelectProps {
    question: string;
    options: Option[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioSelect: React.FC<RadioSelectProps> = ({ question, options, value, onChange }) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{question}</FormLabel>
            <RadioGroup value={value} onChange={onChange}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={
                            <>
                                {option.label}
                                {option.tooltip && (
                                    <Tooltip title={option.tooltip}>
                                        <IconButton size="small" sx={{ ml: 1 }}>
                                            <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </>
                        }
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioSelect;
