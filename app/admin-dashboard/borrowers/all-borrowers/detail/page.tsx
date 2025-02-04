"use client";
// Import your components
import GuarantorDetails from "@/components/admin-dashboard/borrowers/GuarantorDetails";
// import LoanQueries from "./components/LoanQueries";
// import Declaration from "./components/Declaration";
// import Documents from "./components/Documents";
// import TeamPreferences from "./components/TeamPreferences";
// import ScheduleOfRealEstate from "./components/ScheduleOfRealEstate";
import { ArrowBack } from "@mui/icons-material";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import DocumentsComponent from "@/components/admin-dashboard/borrowers/Documents";
import DeclarationsForm from "@/components/dashboard/profile/Declaration";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("Guarantor Details");

  const sidebarItems = [
    { name: "Guarantor Details" },
    { name: "Loan Queries" },
    { name: "Declaration" },
    { name: "Documents" },
    { name: "Team Preferences" },
    { name: "Schedule of Real Estate" },
  ];

  // Map activeSection to components
  const sectionComponents: { [key: string]: JSX.Element } = {
    "Guarantor Details": <GuarantorDetails />,
    // "Loan Queries": <LoanQueries />,
    Declaration: <DeclarationsForm />,
    Documents: <DocumentsComponent />,
    // "Team Preferences": <TeamPreferences />,
    // "Schedule of Real Estate": <ScheduleOfRealEstate />,
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] gap-4 lg:gap-10">
      {/* Sidebar */}
      <div className="w-full lg:w-80 border-r lg:flex-shrink-0 h-auto lg:h-full lg:fixed">
        <div className="p-4 lg:p-6">
          <a
            href="/admin-dashboard/borrowers/all-borrowers"
            className="flex gap-2 mb-4 lg:mb-5"
          >
            <ArrowBack />
            Back
          </a>
          <div className="flex justify-center mb-6 lg:mb-8">
            <UserCircleIcon className="w-16 h-16 text-gray-500" />
          </div>
          <nav className="space-y-2 lg:space-y-4">
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveSection(item.name)}
                className={`w-full text-left text-gray-800 px-3 py-2 rounded-md lg:px-4 lg:py-2 ${
                  item.name === activeSection
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:ml-80">
        <div className="p-4 lg:pl-10 lg:p-8 overflow-y-auto">
          {/* Render the corresponding component */}
          {sectionComponents[activeSection as keyof typeof sectionComponents]}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
