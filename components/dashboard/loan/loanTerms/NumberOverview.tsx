

import {Button } from "@mui/material";
import { useState } from "react";
import { TermLoanData } from "@/utils/model/term.model";
import ReusableButton from "@/components/common_btn";

const documentDetails = [
  { label: "Pre Qualification letter", buttonText: "Download" },
  { label: "Loan Summary", buttonText: "Download" },
];

const callRequestDetails = [
  {
    label: "Get in touch with your relationship manager",
    buttonText: "Contact now",
  },
];

// Component
const NumberOverview = ({ data }: { data: TermLoanData }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };
  const loanDetails = data.loanDetails;
  const additionalLoanDetails = data.additionalDetail;
  const brokerCompDetails = data.brokerCompensation;

  return (
    <div>
      <div
        className="gap-3 flex flex-col md:flex-row w-full lg:w-2/3"
        style={{
          minHeight: "300px",
        }}
      >
        {/* Loan Details Section */}
        <div className="p-4 w-full lg:w-2/3 border-2 border-grey">
          <ul className="pr-4 m-0">
            {loanDetails.map((item, index) => (
              <li key={index} className="flex justify-between w-full py-2">
                <span className="font-normal text-black flex flex-row items-center gap-2 text-md w-3/4">
                  {item.icon && <item.icon />} {item.label}
                </span>
                <span className="text-black text-md text-right w-1/4">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
          <ReusableButton
            onTap={toggleDetails}
            label={
              showDetails
                ? "Hide Additional Loan Details"
                : "Show Additional Loan Details"
            }
          />

          {/* Additional Loan Details */}
          {showDetails && (
            <ul className="pr-4 m-0 mt-3">
              {additionalLoanDetails.map((item, index) => (
                <li key={index} className="flex justify-between w-full py-2">
                  <span className="font-normal text-black flex flex-row items-start gap-2 text-md w-1/3">
                    {item.label}
                  </span>
                  <span className="text-black text-md text-right w-2/3">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Broker Compensation and Documents */}
        <div className="flex flex-col gap-3 w-full lg:w-1/3">
          <div className="p-4 border-2 border-grey">
            <ul className="p-0 m-0">
              {brokerCompDetails.map((item, index) => (
                <li key={index} className="flex justify-between py-2 w-full">
                  <span className="font-normal text-black flex flex-row items-center gap-2 text-sm md:text-md w-3/4">
                    {item.icon && <item.icon />} {item.label}
                  </span>
                  {item.value && (
                    <span className="text-gray-800 text-sm md:text-md w-1/4 flex flex-row gap-1 items-center">
                      {item.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <ReusableButton label=" Edit Broker Comp" />
          </div>

          {/* Document Download Section */}
          <div className="p-4 border-2 border-grey">
            <ul className="p-0 m-0">
              {documentDetails.map((doc, index) => (
                <li
                  key={index}
                  className="flex justify-between py-2 w-full items-center"
                >
                  <span className="font-normal text-gray-800 text-sm md:text-md w-2/3">
                    {doc.label}
                  </span>
                  <ReusableButton variant="outlined" label={doc.buttonText} />
                </li>
              ))}
            </ul>
          </div>

          {/* Request a Call Section */}
          <div className="p-4 border-2 border-grey">
            <ul className="p-0 m-0">
              {callRequestDetails.map((call, index) => (
                <li
                  key={index}
                  className="flex justify-between py-2 w-full items-center"
                >
                  <span className="font-normal text-gray-800 text-sm md:text-md w-1/2">
                    {call.label}
                  </span>
                  <Button
                    variant="outlined"
                    style={{
                      textTransform: "none",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    {call.buttonText}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberOverview;
