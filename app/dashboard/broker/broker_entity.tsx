"use client";

import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import ReusableButton from '@/components/common_btn';

type UploadedFile = {
    name: string;
    date: string;
};

type UploadSectionProps = {
    title: string;
    description: string;
    uploadedFiles: UploadedFile[];
};
type BrokerEntityPageProps = {
    onComplete: (isComplete: boolean) => void;
};

const UploadSection = ({ title, description, uploadedFiles }: UploadSectionProps) => (
    <section className="mt-8">
        <Typography variant="h6" className="font-semibold mb-4">
            {title}
        </Typography>
        <Typography className="mb-4">{description}</Typography>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-white">
            <UploadFile fontSize="large" />
            <Typography className="mt-2 text-gray-500">Upload Documents</Typography>
            <Typography className="text-sm text-gray-400">
                Accepted File Types: .bmp, .docx, .gif, .jpeg, .jpg, .pdf, .png, .rtf, .tif, .tiff, .txt, .heic
            </Typography>
        </div>
        {/* Uploaded Files */}
        <div className="mt-4 space-y-2">
            {uploadedFiles.map((file, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                    <Typography>{file.name}</Typography>
                    <Typography className="text-sm text-gray-500">{file.date}</Typography>
                </div>
            ))}
        </div>
    </section>
);

const BrokerEntityPage = ({ onComplete }: BrokerEntityPageProps) => {
    const goodStandingFiles: UploadedFile[] = [
        {
            name: 'Business_Search_COGS_-_220224_Active_Status.pdf',
            date: 'December 15, 2023 1:24 AM',
        },
        {
            name: 'Broker_67ce57507c0d_certificate_of_good_standing_1646110717841.pdf',
            date: 'October 4, 2022 6:17 AM',
        },
        {
            name: '20210812_LLC_Statement_of_Information__-_California_Secretary_of_State_(receipt).pdf',
            date: 'October 4, 2022 6:17 AM',
        },
    ];

    const incorporationFiles: UploadedFile[] = [
        {
            name: 'Broker_67ce57507c0d_org_agreement_1646110698993.pdf',
            date: 'October 4, 2022 6:17 AM',
        },
        {
            name: 'Articles_of_Organization_-_Lend_with_Aloha_LLC.pdf',
            date: 'October 4, 2022 6:17 AM',
        },
    ];

    // Simulated logic to check if the form is completed
    useEffect(() => {
        const isFormComplete = true; // Replace with actual validation logic
        onComplete(isFormComplete);
    }, [onComplete]);

    return (
        <div className="flex flex-col min-h-screen mt-10">
            <Typography variant="h5" className="font-bold mb-4">
                Broker Entity
            </Typography>
            <Typography className="mb-6">Do you have a broker entity?</Typography>

            <div>
                <label className="block mb-4">
                    <input type="radio" name="brokerEntity" value="yes" defaultChecked />
                    <span className="ml-2">Yes</span>
                </label>
                <label className="block">
                    <input type="radio" name="brokerEntity" value="no" />
                    <span className="ml-2">No</span>
                </label>
            </div>

            <UploadSection
                title="Confirmation of Good Standing"
                description="Please upload a confirmation of good standing with the Secretary of State&apos;s website where you formed the entity. The confirmation must be current within 180 days from when you submit your application."
                uploadedFiles={goodStandingFiles}
            />

            <UploadSection
                title="Broker article of incorporation/operating agreement"
                description="Please upload the complete executed article of incorporation / operating agreement that shows the broker of record has the ability to bind and make decisions on behalf of the entity."
                uploadedFiles={incorporationFiles}
            />

            <ReusableButton variant="contained" label="Continue" onTap={() => { }} />

        </div>
    );
};

export default BrokerEntityPage;
