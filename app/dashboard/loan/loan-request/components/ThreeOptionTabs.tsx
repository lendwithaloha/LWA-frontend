"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

interface ThreeOptionsTabsProps {
    optionOneLabel: string;
    optionTwoLabel: string;
    optionThreeLabel: string;
    optionOneComponent: React.ReactNode;
    optionTwoComponent: React.ReactNode;
    optionThreeComponent: React.ReactNode;
}

const ThreeOptionsTabs: React.FC<ThreeOptionsTabsProps> = ({
    optionOneLabel,
    optionTwoLabel,
    optionThreeLabel,
    optionOneComponent,
    optionTwoComponent,
    optionThreeComponent,
}) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box>
            {/* Tabs */}
            <Tabs
                value={selectedTab}
                onChange={handleChange}
                centered
                sx={{
                    "& .MuiTab-root": {
                        fontSize: "18px",
                        textAlign:"left",


                        textTransform: "none",
                    },
                    "& .MuiTabs-indicator": {
                        backgroundColor: "black",
                        height: "3px",
                    },
                }}
            >
                <Tab label={optionOneLabel} />
                <Tab label={optionTwoLabel} />
                <Tab label={optionThreeLabel} />
            </Tabs>

            {/* Render the selected component */}
            <Box mt={2}>
                {selectedTab === 0 && optionOneComponent}
                {selectedTab === 1 && optionTwoComponent}
                {selectedTab === 2 && optionThreeComponent}
            </Box>
        </Box>
    );
};

export default ThreeOptionsTabs;
