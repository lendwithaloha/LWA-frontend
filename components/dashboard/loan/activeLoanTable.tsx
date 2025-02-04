"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";
import {
  Button,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Filter, Add } from "@mui/icons-material";
import { LoanCard } from "./loan-card";
import FirstDrawer from "../new-loan/RequestNewInquiryDrawer";
import SecondDrawer from "../new-loan/LoanRequestFormDrawer";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Origination = () => {
  const [isFirstDrawerOpen, setIsFirstDrawerOpen] = useState(false);
  const [isSecondDrawerOpen, setIsSecondDrawerOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const applications = useSelector(
    (state: RootState) => state.applications.list
  );

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    loanAmount: "",
    address: "",
  });

  // Create unique options for dropdowns
  const loanAmountOptions = Array.from(
    new Set(applications.map((app) => app.loanAmount))
  ).sort((a, b) => a - b);

  const addressOptions = Array.from(
    new Set(applications.map((app) => app.address))
  ).sort();

  // Separate active and closed loans
  const activeLoans = applications.filter((app) => app.status === "active");
  const closedLoans = applications.filter((app) => app.status === "closed");

  // Apply filters to loans
  const filterLoans = (loans: typeof applications) => {
    return loans.filter((loan) => {
      const matchesAmount =
        !filters.loanAmount || loan.loanAmount === Number(filters.loanAmount);
      const matchesAddress =
        !filters.address || loan.address === filters.address;
      return matchesAmount && matchesAddress;
    });
  };

  // Add this line to define activeTab
  const currentLoans = filterLoans(activeLoans);

  const handleProceedFromFirstDrawer = (loanType: string) => {
    setSelectedLoanType(loanType);
    setIsFirstDrawerOpen(false);
    setIsSecondDrawerOpen(true);
  };

  const handleCloseSecondDrawer = () => {
    setIsSecondDrawerOpen(false);
    setSelectedLoanType("");
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      loanAmount: "",
      address: "",
    });
  };
  const handleOnclose = () => {
    setIsFilterDrawerOpen(false);
    handleClearFilters();
  };

  const router = useRouter();

  const handleNewLoanRequest = () => {
    router.push("/dashboard/loan/loan-request"); // Replace with your desired route
  };
  
  return (
    <div className="mx-auto p-6 max-sm:p-3">
      <div className="flex justify-between items-center mb-8 pr-10 max-sm:flex-col gap-4 max-sm:p-0">
        <div className="flex gap-4 items-center justify-between">
          <div>
            <Link
              href="/dashboard/loan"
              className="flex items-center gap-2 border-b-2 border-gray-300 py-2"
            >
              Active Loans
              <span
                className="bg-black text-white px-2 py-0.5 rounded-full text-sm"
                style={{ borderWidth: "50%" }}
              >
                {activeLoans.length}
              </span>
            </Link>
          </div>
          <div>
            <Link
              href="/dashboard/closed-loan"
              className="flex items-center gap-2"
            >
              Closed Applications
              <span className="bg-black text-white px-2 py-0.5 rounded-full text-sm">
                {closedLoans.length}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outlined"
            startIcon={<Filter />}
            className="text-gray-700"
            onClick={() => setIsFilterDrawerOpen(true)}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            className="bg-primaryColor"
            onClick={handleNewLoanRequest}
          >
            New Loan Request
          </Button>
        </div>
      </div>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={isFilterDrawerOpen}
        onClose={() => handleOnclose()}
      >
        <div className="w-80 p-6">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h6">Filter Loans</Typography>
            <Button onClick={handleClearFilters}>Clear</Button>
          </div>

          <div className="flex flex-col gap-4">
            <FormControl fullWidth>
              <InputLabel>Loan Amount</InputLabel>
              <Select
                value={filters.loanAmount}
                label="Loan Amount"
                onChange={(e) =>
                  handleFilterChange("loanAmount", e.target.value)
                }
              >
                <MenuItem value="">All</MenuItem>
                {loanAmountOptions.map((amount) => (
                  <MenuItem key={amount} value={amount}>
                    ${amount.toLocaleString()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Property Address</InputLabel>
              <Select
                value={filters.address}
                label="Property Address"
                onChange={(e) => handleFilterChange("address", e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {addressOptions.map((address) => (
                  <MenuItem key={address} value={address}>
                    {address}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </Drawer>

      <FirstDrawer
        isOpen={isFirstDrawerOpen}
        onClose={() => setIsFirstDrawerOpen(false)}
        onProceed={handleProceedFromFirstDrawer}
      />
      <SecondDrawer
        isOpen={isSecondDrawerOpen}
        onClose={handleCloseSecondDrawer}
        loanType={selectedLoanType}
        onChangeLoanType={() => {
          setIsSecondDrawerOpen(false); // Close second drawer
          setIsFirstDrawerOpen(true); // Open first drawer
        }}
      />

      <div className="flex gap-4 max-md:flex-col flex-wrap">
        {currentLoans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default Origination;
