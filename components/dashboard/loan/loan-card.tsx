"use client";
import { Chat, StarBorder, Visibility, Edit } from "@mui/icons-material";
import { Box, Button, Card, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PropertyUpdateDrawer from "./PropertyUpdateDrawer";

type Loan = {
  id: number;
  title: string;
  loanAmount: number;
  interestRate: number;
  address: string; // Example: "123 Main St, Springfield"
  loanNumber: string;
  documentDate: string;
  status: string;
  messages?: number;
  label?: string;
  city:string;

};

export const LoanCard = ({ loan }: { loan: Loan }) => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false); // To open/close the drawer

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => setDrawerOpen(false);



  const handleCardClick = () => {
    if (loan.status.toLowerCase() === "active") {
      router.push(`/dashboard/loan/details/${loan.id}`);
    }
  };

  return (
    <>
      <Card
        className="p-6 space-y-6 cursor-pointer max-w-[500px] border-b-0 shadow rounded-lg flex flex-col"
        onClick={handleCardClick}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <div className="bg-gray-100 rounded p-2">
                <StarBorder className="cursor-pointer text-[30px]" />
              </div>
              <div className="flex flex-col items-start">
                <span>LWA Loan ID</span>
                <div className="font-medium">#{loan.loanNumber}</div>
              </div>
            </div>
          </div>
          <span
            className={`${
              loan.status.toLowerCase() === "closed"
                ? "bg-red-200 text-red-600"
                : "bg-green-100 text-green-600"
            } px-3 py-1 rounded-full text-sm`}
          >
            {loan.status}
          </span>
        </div>

        <div>
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
        </div>

        <div className="flex flex-col border bg-blue-100 p-4 rounded">
          <div>
            <div className="text-gray-600 mb-1">Property</div>
            <div className="font-medium">{loan.address}, {loan.city}</div>
          </div>

          <Box display="flex" gap={2} mt={2}>
            <IconButton size="small" aria-label="view" className="bg-white border rounded">
              <Visibility fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="edit" className="bg-white border rounded" onClick={handleEditClick}>
              <Edit fontSize="small" />
            </IconButton>
          </Box>
        </div>

        {loan.status.toLowerCase() === "closed" ? (
          <div className="space-y-4 bg-gray-100 rounded p-4">
            <div className="font-normal text-base">Application Completed</div>
            <p className="text-sm">
              This loan application has been successfully completed.
            </p>
          </div>
        ) : (
          <div className="space-y-4 bg-blue-100 rounded p-4">
            <div className="font-normal text-base">Next Step</div>
            <p className="text-sm">
              We are waiting for some of your documents. Please upload the
              remaining files to continue.
            </p>
            <div className="flex justify-end items-center">
              <Button variant="contained" className="bg-primaryColor text-white">
                Upload Documents
              </Button>
            </div>
          </div>
        )}

        <div className="text-gray-500 text-sm self-end">
          Submitted on {loan.documentDate}
        </div>
      </Card>

      <PropertyUpdateDrawer
        visible={drawerOpen}
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
    </>
  );
};
