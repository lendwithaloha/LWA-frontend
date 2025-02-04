"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Tab,
  Tabs,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BorrowerTable from "../../../components/admin-dashboard/borrowers/BorrowerTable";
import {
  Borrower,
  borrowers,
} from "../../../components/admin-dashboard/borrowers/dummyData";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
      style={{
        opacity: value === index ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

export default function BorrowersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(0);
  const [allBorrowersFilter, setAllBorrowersFilter] = useState<"all" | "new">(
    "all"
  );
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Responsive breakpoints

  useEffect(() => {
    if (pathname.includes("active-borrowers")) {
      setActiveTab(1);
    } else if (pathname.includes("inactives-borrowers")) {
      setActiveTab(2);
    } else {
      setActiveTab(0);
    }
  }, [pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) {
      router.push("/admin-dashboard/borrowers/all-borrowers");
    } else if (newValue === 1) {
      router.push("/admin-dashboard/borrowers/active-borrowers");
    } else if (newValue === 2) {
      router.push("/admin-dashboard/borrowers/inactives-borrowers");
    }
  };

  const handleAllBorrowersFilterChange = (
    event: SelectChangeEvent<"all" | "new">
  ) => {
    const newValue = event.target.value as "all" | "new";
    setAllBorrowersFilter(newValue);
    if (newValue === "new") {
      router.push("/admin-dashboard/borrowers/all-borrowers?filter=new");
    } else {
      router.push("/admin-dashboard/borrowers/all-borrowers");
    }
  };

  const filterBorrowers = (): Borrower[] => {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    let filtered = borrowers;

    if (activeTab === 0) {
      if (allBorrowersFilter === "new") {
        filtered = borrowers.filter(
          (b) => new Date(b.dateRegistered) > thirtyDaysAgo
        );
      }
    } else if (activeTab === 1) {
      filtered = borrowers.filter((b) => b.ongoingLoans > 0);
    } else if (activeTab === 2) {
      filtered = borrowers.filter((b) => b.ongoingLoans === 0);
    }

    return filtered;
  };

  return (
    <div className="container mx-auto p-4 max-md:p-2">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        className="mb-4"
        variant={isSmallScreen ? "scrollable" : "standard"}
        scrollButtons={isSmallScreen ? "auto" : false}
        sx={{
          "& .MuiTabs-indicator": { backgroundColor: "#1976d2" },
          "& .Mui-selected": { color: "#1976d2 !important" },
          flexWrap: isSmallScreen ? "wrap" : "nowrap",
        }}
      >
        <Tab
          label={
            <div className="flex items-center">
              <Select
                value={allBorrowersFilter}
                onChange={handleAllBorrowersFilterChange}
                size="small"
                sx={{
                  width: isSmallScreen ? "100px" : "150px",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >
                <MenuItem value="all">All Borrowers</MenuItem>
                <MenuItem value="new">New Borrowers</MenuItem>
              </Select>
            </div>
          }
        />
        <Tab label="Active Borrowers" />
        <Tab label="Inactive Borrowers" />
      </Tabs>

      <TabPanel value={activeTab} index={0}>
        <BorrowerTable borrowers={filterBorrowers()} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <BorrowerTable borrowers={filterBorrowers()} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <BorrowerTable borrowers={filterBorrowers()} />
      </TabPanel>
    </div>
  );
}
