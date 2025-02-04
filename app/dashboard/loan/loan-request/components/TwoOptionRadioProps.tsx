"use client"
import React, { useState } from "react";
import { Box, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface TwoOptionRadioProps {
    optionOneLabel: string;
    optionTwoLabel: string;
    optionOneComponent: React.ReactNode;
    optionTwoComponent: React.ReactNode;
}

const TwoOptionRadio: React.FC<TwoOptionRadioProps> = ({
    optionOneLabel,
    optionTwoLabel,
    optionOneComponent,
    optionTwoComponent,
}) => {
    const [selectedOption, setSelectedOption] = useState<string>("optionOne");

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box>
            {/* Radio Group */}
            <RadioGroup
                row
                value={selectedOption}
                onChange={handleOptionChange}
                sx={{ }}
            >
                <FormControlLabel
                    value="optionOne"
                    control={<Radio />}
                    label={optionOneLabel}
                />
                <FormControlLabel
                    value="optionTwo"
                    control={<Radio />}
                    label={optionTwoLabel}
                />
            </RadioGroup>

            {/* Render the selected component */}
            <Box>
                {selectedOption === "optionOne" && optionOneComponent}
                {selectedOption === "optionTwo" && optionTwoComponent}
            </Box>
        </Box>
    );
};

export default TwoOptionRadio;
