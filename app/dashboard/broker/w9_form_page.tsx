"use client";

import {  Typography } from "@mui/material";
import { Download } from "@mui/icons-material";
import ReusableButton from "@/components/common_btn";

const W9FormPage = () => {
    const files = [
        {
            name: "Broker_67ce57507c0d_w9_1646110817716.pdf",
            date: "October 4, 2022 6:17 AM",
        },
        {
            name: "Broker_67ce57507c0d_broker_w9_1642630371509.pdf",
            date: "October 4, 2022 6:17 AM",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen mt-10">
            {/* Page Title */}
            <Typography variant="h5" className="font-bold mb-4">
                W9 Form
            </Typography>
            <Typography className="mb-6">Please eSign the W9 Form.</Typography>

            <ReusableButton variant="contained" label="Sign W9 Form on HelloSign" onTap={() => { }} />


            {/* Uploaded Files */}
            <div className="w-full max-w-3xl">
                {files.map((file, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-2"
                    >
                        <div className="flex items-center space-x-2">
                            <Download className="text-gray-500" />
                            <Typography className="text-gray-800">{file.name}</Typography>
                        </div>
                        <Typography className="text-sm text-gray-500">{file.date}</Typography>
                    </div>
                ))}
            </div>

            <ReusableButton variant="contained" label="Continue" onTap={() => { }} />
        </div>
    );
};

export default W9FormPage;
