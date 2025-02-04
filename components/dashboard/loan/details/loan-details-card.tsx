"use client";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import { Button, Card, IconButton } from "@mui/material";
import DocumentUploadDrawer from "./common/DocumentUploadDrawer";
import PropertyUpdateDrawer from "../PropertyUpdateDrawer";

type Loan = {
  id: number;
  title: string;
  loanAmount: number;
  interestRate: number;
  address: string;
  loanNumber: string;
  documentDate: string;
  messages?: number;
  label?: string;
  status: string;
  city: string;
};

export const LoanDetailsCard = ({ loan }: { loan: Loan }) => {
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expanded, setExpanded] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false); // To open/close the drawer

  const handleEditClick = () => {
    setUpdateDrawerOpen(true);
  };
  const handleDrawerClose = () => setUpdateDrawerOpen(false);

  const documentDetails = [
    {
      label: "Property Insurance",
      requirements: ["Requirement 1", "Requirement 2"],
    },
    {
      label: "Property Ownership",
      requirements: ["Proof of Ownership", "Deed Copy"],
    },
    { label: "Renovation Estimates or Plans", requirements: ["Plans PDF"] },
    {
      label: "Contract or Purchase Agreement",
      requirements: ["Signed Document"],
    },
    { label: "Tax Returns (last 2 years)", requirements: ["Signed Document"] },
    { label: "Property Address Details", requirements: ["Signed Document"] },
  ];

  // const handleExpand = () => setExpanded(!expanded);

  return (
    <Card
      className="bg-gray-50/0 p-6 space-y-6 overflow-visible cursor-pointer rounded-lg border-none shadow-none flex flex-col"
      style={{
        width: expanded ? "760px" : "400px",
        transition: "width 0.5s ease-in-out",
      }}
    >
      {/* {expanded ? (
        <div
          className="absolute hidden lg:flex items-center justify-center top-[50%] -right-3 z-100 w-10 h-10 bg-white rounded-full"
          onClick={handleExpand}
        >
          <ArrowBackIos className="text-center" />
        </div>
      ) : (
        <div
          className="absolute hidden lg:flex items-center justify-center top-[50%] -right-5 z-100 p-2 bg-white rounded-full"
          onClick={handleExpand}
        >
          <ArrowForwardIos />
        </div>
      )} */}
      {/* 
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/loan">
            <ArrowBack />
          </Link>
          <p className="text-lg"> Back</p>
        </div>
        {expanded && (
          <Button className="bg-primaryColor text-white">Edit</Button>
        )}
      </div> */}

      <div
        className={`flex justify-between items-start ${
          !expanded ? "flex-col gap-2" : "flex"
        }`}
      >
        {/* <div>
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <div className="bg-white rounded p-2">
              <StarBorder className="cursor-pointer text-[30px]" />
            </div>
            <div className="flex flex-col items-start">
              <span>LWA Loan ID</span>
              <div className="font-medium">#{loan.loanNumber}</div>
            </div>
          </div>
        </div> */}
        {/* <div>
          <div className="text-gray-600 mb-1">Requested Amount</div>
          <div className="font-medium text-xl flex justify-between">
            <p>${loan.loanAmount.toLocaleString()}</p>
            {loan.messages && (
              <div className="bg-white rounded-xl w-[70px] px-2 justify-between border p-1 flex gap-2 items-center">
                <Chat className="cursor-pointer text-[20px]" />
                <span className="text-xs bg-black rounded-full text-white p-1">
                  {loan.messages}
                </span>
              </div>
            )}
          </div>
        </div> */}
      </div>

      <div>
        <div className="space-y-4 bg-gray-100 rounded p-4">
          <div className="font-normal">Next Step</div>
          <div className="font-semibold">Upload Required Documents</div>
          <p className="text-sm">
            We are waiting for some of your documents. Please upload the
            remaining files to continue.
          </p>
          <div className="flex justify-end items-center">
            <Button
              variant="contained"
              className="bg-primaryColor"
              onClick={() => setDrawerOpen(true)}
            >
              Upload Documents
            </Button>
          </div>
        </div>
        <h1 className="font-semibold mt-3">About Your Loan Query</h1>
        <div className="flex flex-col  mt-4 rounded mb-3">
          <div className="text-gray-600 mb-1">Property</div>

          <div className="font-medium flex gap-4">
            <span>
              {loan.address}, {loan.city}
            </span>
            <IconButton
              size="small"
              aria-label="edit"
              className="bg-white border w-8 rounded"
              onClick={handleEditClick}
            >
              <Edit fontSize="small" />
            </IconButton>
          </div>
        </div>
        <div>
          <p>Strategy</p>
          <p>Fix and Flip</p>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <p>Requested Amount</p>
          <p>$ {loan.loanAmount}</p>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <p>Date Submitted </p>
          <p>Jan 24, 2024</p>
        </div>
        <DocumentUploadDrawer
          documents={documentDetails}
          drawerOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </div>

      <PropertyUpdateDrawer
        visible={updateDrawerOpen}
        onClose={handleDrawerClose}
        // onSubmit={handleUpdateSubmit}
        propertyData={{
          id: loan.id,
          address: loan.address.split(",")[0].trim(),
          city: loan.address.split(",")[1]?.trim() || "",
          state: "",
          zip: "",
          propertyType: "Residential",
          entity: "",
          percentageOwnership: 100,
          investmentStrategy: "Hold",
          acquisitionDate: "",
          acquisitionPrice: loan.loanAmount,
          status: loan.status,
          isBudgetCompleted: false,
          budgetReason: "",
          isRented: false,
          rentalIncome: 0,
          isTiedToLoan: false,
          loanBalance: 0,
          contractPrice: loan.loanAmount,
          currentMarketValue: loan.loanAmount,
        }}
      />
    </Card>
  );
};
