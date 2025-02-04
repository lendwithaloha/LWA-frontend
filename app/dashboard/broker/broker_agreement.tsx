"use client";

import React from 'react';
import { Typography } from '@mui/material';
import { Download } from "@mui/icons-material";
import ReusableButton from '@/components/common_btn';

// Type for uploaded file details
type UploadedFile = {
    name: string;
    date: string;
};

type UploadFileListProps = {
    files: UploadedFile[];
};


const UploadFileList = ({ files }: UploadFileListProps) => (
    <div className="mt-4 space-y-2">
        {files.map((file, idx) => (
            <div
                key={idx}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
            >
                <div className="flex items-center space-x-2">
                    <Download className="text-gray-500" />
                    <Typography>{file.name}</Typography>
                </div>
                <Typography className="text-sm text-gray-500">{file.date}</Typography>
            </div>
        ))}
    </div>
);

const BrokerAgreementPage = () => {
    const files: UploadedFile[] = [
        {
            name: 'Broker_67ce57507c0d_broker_agreement_1702592674947.pdf',
            date: 'December 15, 2023 1:28 AM',
        },
        {
            name: 'Broker_67ce57507c0d_broker_agreement_1642513265609.pdf',
            date: 'October 4, 2022 6:17 AM',
        },
    ];

    return (
        <div className="flex flex-col min-h-screen mt-10">
            <Typography variant="h5" className="font-bold mb-4">
                Broker Agreement
            </Typography>
            <Typography className="mb-4">
                Please read and eSign our Broker Agreement.
            </Typography>
            <Typography className="mb-6">
                If you selected Yes in the Broker Entity section - please sign the
                agreement as an entity. If you selected No - sign as an individual.
            </Typography>
            <ReusableButton variant="contained" label="Sign Broker Agreement on HelloSign" onTap={() => { }} />

            <UploadFileList files={files} />

            <ReusableButton variant="contained" label="Continue" onTap={() => { }} />

        </div>
    );
};

export default BrokerAgreementPage;
