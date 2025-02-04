"use client";

import { Typography } from "@mui/material";
import { UploadFile, Download } from "@mui/icons-material";
import ReusableButton from "@/components/common_btn";

const BrokerLicensePage = () => {
    const files = [
        {
            name: "Broker_67ce57507c0d_broker_license_1713817673370.pdf",
            date: "April 22, 2024 11:28 PM",
        },
        {
            name: "Broker_67ce57507c0d_broker_license_1705611771881.png",
            date: "January 19, 2024 12:03 AM",
        },
        {
            name: "License_-_DRE_-_exp_270418.pdf",
            date: "December 15, 2023 1:23 AM",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen mt-10">
            {/* Page Title */}
            <Typography variant="h5" className="font-bold mb-4">
                Broker License
            </Typography>
            <Typography className="mb-6 text-start">
                If you&apos;re looking to provide loans in AZ, CA, MN, NC, NJ, NV, NY, OR, or
                UT, upload broker licenses.
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

            {/* Uploaded Files */}
            <div className="w-full space-y-3">
                {files.map((file, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
                    >
                        <div className="flex items-center space-x-2">
                            <Download className="text-gray-500" />
                            <Typography className="text-gray-800">{file.name}</Typography>
                        </div>
                        <Typography className="text-sm text-gray-500">{file.date}</Typography>
                    </div>
                ))}
            </div>

            {/* Continue Button */}
            <ReusableButton variant="contained" label="Continue" onTap={()=>{}} /> 

        </div>
    );
};

export default BrokerLicensePage;
