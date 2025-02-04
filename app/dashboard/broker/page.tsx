"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import BrokerEntityPage from "./broker_entity";
import BrokerAgreementPage from "./broker_agreement";
import W9FormPage from "./w9_form_page";
import BrokerQuestionnairePage from "./broker_questionnaire";
import ACHInformationPage from "./ach_information";
import GovernmentIDPage from "./government_id";
import BrokerLicensePage from "./broker_license";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

// Define type for sidebar items
type SidebarItem = {
  label: string;
  completed: boolean;
};

// Sidebar items configuration
const initialSidebarItems: SidebarItem[] = [
  { label: "Broker Entity", completed: true },
  { label: "Broker Agreement", completed: false },
  { label: "W9 Form", completed: false },
  { label: "Broker Questionnaire", completed: true },
  { label: "ACH Information", completed: false },
  { label: "Government ID", completed: true },
  { label: "Broker License (optional)", completed: true },
];

// Tab content components
type TabContentProps = {
  activeTab: string;
  updateCompletionStatus: (tab: string, isComplete: boolean) => void;
};

const TabContent = ({ activeTab, updateCompletionStatus }: TabContentProps) => {
  switch (activeTab) {
    case "Broker Entity":
      return (
        <BrokerEntityPage
          onComplete={(isComplete: boolean) => {
            updateCompletionStatus("Broker Entity", isComplete);
          }}
        />
      );
    case "Broker Agreement":
      return <BrokerAgreementPage />;
    case "W9 Form":
      return <W9FormPage />;
    case "Broker Questionnaire":
      return <BrokerQuestionnairePage />;
    case "ACH Information":
      return <ACHInformationPage />;
    case "Government ID":
      return <GovernmentIDPage />;
    case "Broker License (optional)":
      return <BrokerLicensePage />;
    default:
      return <Typography>No content available</Typography>;
  }
};

// Sidebar component
type SidebarProps = {
  activeTab: string;
  sidebarItems: SidebarItem[];
  setActiveTab: (tab: string) => void;
};

const Sidebar = ({ activeTab, sidebarItems, setActiveTab }: SidebarProps) => (
  <div className="w-1/4 shadow-md border-l border-gray-200">
    <nav>
      {sidebarItems.map((item) => (
        <div
          key={item.label}
          className={`flex justify-between items-center px-4 py-3 border-b last:border-b-0 cursor-pointer ${
            activeTab === item.label
              ? "bg-gray-100 text-gray-800 border-l-4 border-primaryColor"
              : "bg-white text-gray-800"
          }`}
          onClick={() => setActiveTab(item.label)}
        >
          <Typography className="font-medium">{item.label}</Typography>
          {item.completed ? (
            <CheckCircleIcon
              className="h-5 w-5 text-primaryColor mr-2"
              aria-hidden="true"
            />
          ) : (
            <CheckCircleIcon
              className="h-5 w-5 text-gray-400 mr-2"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </nav>
  </div>
);

// Main application component
const BrokerApplication = () => {
  const [activeTab, setActiveTab] = useState<string>("Broker Entity");
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>(initialSidebarItems);

  // Update the completion status of a tab
  const updateCompletionStatus = (tab: string, isComplete: boolean) => {
    setSidebarItems((prevItems) => {
      // Check if the status actually needs updating
      const updatedItems = prevItems.map((item) =>
        item.label === tab && item.completed !== isComplete
          ? { ...item, completed: isComplete }
          : item
      );

      // Only trigger state update if items have changed
      if (JSON.stringify(prevItems) !== JSON.stringify(updatedItems)) {
        return updatedItems;
      }
      return prevItems;
    });
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        sidebarItems={sidebarItems}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 pl-6 pr-2 md:pl-24 md:pr-24">
        <TabContent
          activeTab={activeTab}
          updateCompletionStatus={updateCompletionStatus}
        />
      </main>
    </div>
  );
};

export default BrokerApplication;
