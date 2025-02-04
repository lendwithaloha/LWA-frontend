"use client";

import { Typography } from "@mui/material";
import { Download } from "@mui/icons-material";
import ReusableButton from "@/components/common_btn";

const ACHInformationPage = () => {
  const file = {
    name: "Broker_67ce57507c0d_broker_questionnaire_1642630496851.pdf",
    date: "October 4, 2022 6:17 AM",
  };

  return (
    <div className="flex flex-col min-h-screen mt-10">
      {/* Page Title */}
      <Typography variant="h5" className="font-bold mb-4">
        ACH Information
      </Typography>
      <Typography className="mb-6">
        We need you to provide us ACH information in order to pay your broker
        compensation.
      </Typography>

      <ReusableButton
        variant="contained"
        label="Sign ACH on HelloSign"
        onTap={() => {}}
      />

      {/* Uploaded File */}
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-start bg-gray-100 p-3 rounded-md mb-2">
          <div className="flex items-center space-x-2">
            <Download className="text-gray-500" />
            <Typography className="text-gray-800">{file.name}</Typography>
          </div>
          <Typography className="text-sm text-gray-500">{file.date}</Typography>
        </div>
      </div>

      <ReusableButton variant="contained" label="Continue" onTap={() => {}} />
    </div>
  );
};

export default ACHInformationPage;
