import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import QuoteCard from "./QuoteCard";

interface Quote {
  id: number;
  title: string;
  interestRate: string;
  monthlyPayment: string;
  loanTerm: string;
  quoteDate: string;
  isSaved?: boolean; // For differentiating saved quotes
}

interface QuotesGridProps {
  viewMode: "grid" | "list";
  quotes: Quote[];
  activeTab: number; // Add activeTab here
}

const QuotesGrid = ({ viewMode, quotes, activeTab }: QuotesGridProps) => {
  // Filter quotes based on activeTab
  const filteredQuotes =
    activeTab === 0
      ? quotes // All Quotes
      : quotes.filter((quote) => quote.isSaved); // Saved Quotes

  if (viewMode === "list") {
    // Render list view as a table
    return (
      <TableContainer component={Paper}>
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell>Placeholder</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Interest Rate</TableCell>
              <TableCell>Monthly Payment</TableCell>
              <TableCell>Loan Term</TableCell>
              <TableCell>Quote Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {filteredQuotes.map((quote) => (
              <QuoteCard key={quote.id} {...quote} viewMode="list" />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  // Render grid view as cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {filteredQuotes.map((quote) => (
        <QuoteCard key={quote.id} {...quote} viewMode="grid" />
      ))}
    </div>
  );
};

export default QuotesGrid;
