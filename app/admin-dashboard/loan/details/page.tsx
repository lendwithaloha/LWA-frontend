"use client";
import DocumentsComponent from "@/components/admin-dashboard/borrowers/Documents";
import GrantorCard from "@/components/admin-dashboard/loan/details/grantor-card";
import LoanQuery from "@/components/admin-dashboard/loan/details/loan-query/loan-query";
import LoanQuotesTable from "@/components/admin-dashboard/loan/details/quote/quote-table";
import { ArrowBack } from "@mui/icons-material";
import { Tabs, Tab, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const [value, setValue] = useState(3);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center gap-12">
        <IconButton onClick={() => router.back()}>
          <ArrowBack />
        </IconButton>
        <div className="flex ml-10">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Loan Query" className="mr-4" />
            <Tab label="Loan Analysis" className="mr-4" />
            <Tab label="Quotes" className="mr-4" />
            <Tab label="Documents" className="mr-4" />
            <Tab label="Schedule Reastate" />
          </Tabs>
        </div>
      </div>

      {value === 0 && (
        <div>
          {" "}
          <LoanQuery />{" "}
        </div>
      )}
      {value === 1 && <div>Loan Analysis Content</div>}
      {value === 2 && (
        <div>
          <LoanQuotesTable />
        </div>
      )}
      {value === 3 && <DocumentsComponent />}
      {value === 4 && <div>Schedule Reastate Content</div>}
    </div>
  );
};

export default page;
