"use client"
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ApplicationProgress = () => {
  // Access tabs data from applicationSlice
  const tabs = useSelector((state: RootState) => state.application.tabs);

  // Function to display status as a colored circle
  const ShowStatus = (status: string): JSX.Element => {
    let circleColor: string;

    switch (status) {
      case "Completed":
        circleColor = "#4caf50"; // Green for completed
        break;
      case "In Progress":
        circleColor = "#ff9800"; // Orange for in-progress
        break;
      case "Not Started":
        circleColor = "#9e9e9e"; // Grey for not started
        break;
      default:
        circleColor = "#ffffff"; // White for unknown status
    }

    return (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: circleColor,
          border: "1px solid white",
        }}
      />
    );
  };


  // Render the checklist for application progress
  return (
    <div className="p-0 mt-6">
    <ul className="p-0 m-0">
      <li className="flex justify-between w-full py-2">
        <span className="font-normal text-black text-sm md:text-md w-3/4">
        Your Client&apos;s Loan Checklist
        </span>
        <span className="text-black text-sm md:text-md w-1/4">Status</span>
      </li>
      <hr />
      {Object.entries(tabs).map(([tabKey, tabData]) => (
        <li key={tabKey} className="flex justify-between py-2 w-full">
          <span className="font-normal text-gray-600 text-sm md:text-md w-3/4">
            {tabKey}
          </span>
          <span className="text-gray-600 text-sm md:text-md w-1/4 flex flex-row gap-1 items-center">
            {ShowStatus(tabData.status)} {tabData.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default ApplicationProgress;
