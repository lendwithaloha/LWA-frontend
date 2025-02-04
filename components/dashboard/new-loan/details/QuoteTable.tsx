import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

interface Quote {
  id: number;
  title: string;
  interestRate: string;
  monthlyPayment: string;
  loanTerm: string;
  quoteDate: string;
}

interface QuoteTableProps {
  quotes: Quote[];
}

const QuoteTable: React.FC<QuoteTableProps> = ({ quotes }) => {
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
          {quotes.map((quote) => (
            <TableRow key={quote.id}>
              {/* Placeholder Image */}
              <TableCell>
                <div className="w-24 h-24 bg-gray-300 rounded"></div>
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
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuoteTable;
        