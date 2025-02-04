"use client";

import { Typography } from "@mui/material";
import { UploadFile, Download } from "@mui/icons-material";
import ReusableButton from "@/components/common_btn";


const GovernmentIDPage = () => {
    const file = {
        name: "ID_-_Brian_Fung.pdf",
        date: "October 4, 2022 6:17 AM",
    };

    return (
        <div className="flex flex-col min-h-screen mt-10">
            {/* Page Title */}
            <Typography variant="h5" className="font-bold mb-4">
                Broker&apos;s Government ID
            </Typography>
            <Typography className="mb-6 text-center">
                Please upload your driver&apos;s license or government-issued ID (driver&apos;s
                license, US passport, US military ID) to verify your identity.
            </Typography>

            {/* Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white w-full mb-6">
                <UploadFile fontSize="large" className="text-gray-500" />
                <Typography className="mt-2 text-gray-500">Upload Documents</Typography>
                <Typography className="text-sm text-gray-400 mt-1">
                    Accepted File Types: .bmp, .docx, .gif, .jpeg, .jpg, .pdf, .png, .rtf,
                    .tif, .tiff, .txt, .heic
                </Typography>
            </div>

            {/* Uploaded File */}
            <div className="w-full">
                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-4">
                    <div className="flex items-center space-x-2">
                        <Download className="text-gray-500" />
                        <Typography className="text-gray-800">{file.name}</Typography>
                    </div>
                    <Typography className="text-sm text-gray-500">{file.date}</Typography>
                </div>
            </div>

            {/* Continue Button */}
            <ReusableButton variant="contained" label="Continue" onTap={()=>{}} /> 
        </div>
    );
};

export default GovernmentIDPage;
