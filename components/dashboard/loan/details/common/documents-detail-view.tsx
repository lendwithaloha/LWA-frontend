import { ArrowBack } from "@mui/icons-material";
import { Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import UpdateTab from "../tabs/update-tab";
import HistoryTab from "../tabs/history-tab";

interface DocumentsDetailViewProps {
  onBack: () => void;
}

const DocumentsDetailView: React.FC<DocumentsDetailViewProps> = ({
  onBack,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <div className="p-5 bg-gray-50 h-screen">
      <div className="flex gap-2 mb-3 cursor-pointer " onClick={onBack}>
        <ArrowBack />
        <Typography>Back</Typography>
      </div>
      <div className="flex gap-3 tex-sm p-3">
        <Image
          src="/images/loan-icon.png"
          alt="File Icon"
          width={50}
          height={50}
        />
        <p className="flex flex-col justify-around">
          Proof Of income
          <span className="text-xs text-gray-600">Submited on January</span>
        </p>
        <div className="ml-auto">
          <span className="px-3 py-1 text-xs bg-black text-white rounded-full">
            Feedback Given
          </span>
        </div>
      </div>
      <div className="w-full my-4 border-b ">
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Update" />
          <Tab label="History" />
        </Tabs>
      </div>
      <div>{selectedTab === 0 ? <UpdateTab /> : <HistoryTab />}</div>
    </div>
  );
};

export default DocumentsDetailView;
