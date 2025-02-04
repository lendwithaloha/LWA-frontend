import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Button,
} from "@mui/material";
import QuoteDetailsModal from "./QuoteModal";

interface QuoteCardProps {
  id: number;
  title: string;
  interestRate: string;
  monthlyPayment: string;
  loanTerm: string;
  quoteDate: string;
  viewMode: "grid" | "list"; // Determines layout
}

const QuoteCard = (quote: QuoteCardProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
     // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewDetails = (quote: any) => {
    setSelectedQuote(quote);
    quote = selectedQuote;
    setModalOpen(true);
    return 
  };

  const {viewMode, ...quoteWithoutViewMode} = quote;

  const closeModal = () => {
    setSelectedQuote(null);
    setModalOpen(false);
  };
  if (viewMode === "list") {
    // List View: Render as a single table row
    return (
      <TableRow>
        {/* Placeholder Image */}
        <TableCell>
          <div className="w-16 h-16 bg-gray-300 rounded"></div>
        </TableCell>

        {/* Title */}
        <TableCell>{quote.title}</TableCell>

        {/* Interest Rate */}
        <TableCell>{quote.interestRate}</TableCell>

        {/* Monthly Payment */}
        <TableCell>{quote.monthlyPayment}</TableCell>

        {/* Loan Term */}
        <TableCell>{quote.loanTerm}</TableCell>

        {/* Quote Date */}
        <TableCell>{quote.quoteDate}</TableCell>

        {/* Action Button */}
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleViewDetails(quote)}
          >
            View Details
          </Button>
        </TableCell>
      </TableRow>
    );
  }

  // Grid View: Render as a card
  return (
    <div className="border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow p-4 py-8 flex flex-col gap-4">
      {/* Content Row */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Placeholder Image */}
        <div className="w-full sm:w-1/2 h-32 md:h-40 bg-gray-300 rounded"></div>

        {/* Text Content */}
        <div className="flex-1">
          <h6 className="text-lg font-semibold mb-2">{quote.title}</h6>
          <div className="text-gray-600 space-y-1">
            <p className="text-sm">Interest Rate: {quote.interestRate}</p>
            <p className="text-sm">Monthly Payment: {quote.monthlyPayment}</p>
            <p className="text-sm">Loan Term: {quote.loanTerm}</p>
          </div>
          <p className="text-sm text-gray-500 mt-2">Quote Date: {quote.quoteDate}</p>
        </div>
      </div>

      {/* Action Button */}
      <button
        className="w-full bg-primaryColor hover:bg-primaryColor/85 text-white font-medium py-2 px-4 rounded"
        onClick={() => handleViewDetails(quote)}
      >
        View Details
      </button>
      <QuoteDetailsModal
        open={modalOpen}
        onClose={closeModal}
        quote={{...quoteWithoutViewMode, isSaved: false}}
      />
    </div>
  );
};

export default QuoteCard;
