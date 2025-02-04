import React, { useState } from "react";
import { Tabs, Tab, Button, IconButton, Box } from "@mui/material";
import { GridView, ViewList, FilterList } from "@mui/icons-material";
import QuotesGrid from "./QuotesGrid";
import FilterComponent from "./FilterComponent";

type ViewMode = "grid" | "list";

const quotesData = [
  {
    id: 1,
    title: "Prime Capital Loans",
    interestRate: "12.5%",
    monthlyPayment: "$2,300",
    loanTerm: "30 Years",
    quoteDate: "Dec 8, 2024",
    isSaved: false,
  },
  {
    id: 2,
    title: "Prime Capital Loans",
    interestRate: "10.5%",
    monthlyPayment: "$1,900",
    loanTerm: "15 Years",
    quoteDate: "Dec 9, 2024",
    isSaved: true,
  },
  {
    id: 3,
    title: "Trusted Funding",
    interestRate: "11.0%",
    monthlyPayment: "$2,000",
    loanTerm: "20 Years",
    quoteDate: "Dec 10, 2024",
    isSaved: false,
  },
];

const LoanQuotesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filteredQuotes, setFilteredQuotes] = useState(quotesData);
  // const [modalOpen, setModalOpen] = useState<boolean>(false);

  // const [selectedQuote, setSelectedQuote] = useState<any>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const applyFilters = (filters: {
    interestRateRange?: [number, number];
    loanAmount?: string;
    savedOnly: boolean;
  }) => {
    let updatedQuotes = [...quotesData];

    // Filter by interest rate range
    if (filters.interestRateRange) {
      const [min, max] = filters.interestRateRange;
      updatedQuotes = updatedQuotes.filter((quote) => {
        const rate = parseFloat(quote.interestRate.replace("%", ""));
        return rate >= min && rate <= max;
      });
    }

    // Filter by loan amount (substring match for simplicity)
    if (filters.loanAmount) {
      updatedQuotes = updatedQuotes.filter((quote) =>
        quote.monthlyPayment.includes(filters.loanAmount ?? "")
      );
    }

    // Filter by saved quotes
    if (filters.savedOnly) {
      updatedQuotes = updatedQuotes.filter((quote) => quote.isSaved);
    }

    setFilteredQuotes(updatedQuotes);
    setFilterOpen(false); // Close the filter drawer after applying
  };

  const getDisplayedQuotes = () => {
    if (activeTab === 1) {
      return filteredQuotes.filter((quote) => quote.isSaved);
    }
    return filteredQuotes;
  };
  // const handleViewDetails = (quote: string) => {
  //   setSelectedQuote(quote);
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setSelectedQuote(null);
  //   setModalOpen(false);
  // };

  return (
    <div className="p-4 bg-gray-50">
      {/* Tabs */}
      <Box borderBottom={1} borderColor="divider" className="mb-4">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Quote Tabs"
        >
          <Tab label="All Quotes" />
          <Tab label="Saved Quotes" />
        </Tabs>
      </Box>
      {/* Toolbar */}
      <div className="flex justify-end items-center space-x-2 mb-4">
        <IconButton onClick={() => setViewMode("grid")} aria-label="Grid View">
          <GridView />
        </IconButton>
        <IconButton onClick={() => setViewMode("list")} aria-label="List View">
          <ViewList />
        </IconButton>
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={() => setFilterOpen(true)}
        >
          Filter
        </Button>
      </div>
      {/* Filter Component */}
      <FilterComponent
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={applyFilters}
      />
      {/* Quotes List/Grid */}
      <QuotesGrid
        viewMode={viewMode}
        activeTab={activeTab}
        quotes={getDisplayedQuotes()}
      />
    </div>
  );
};

export default LoanQuotesPage;
