"use client";

import { useState, useRef } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { Download, FileCopyOutlined } from "@mui/icons-material";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const quoteData = [
  {
    quoteName: "Quote 1",
    rates: { rate: "11.00%", points: "2.50%", processing: "$2,000" },
    leverage: {
      ltc: "79.76%",
      ltArv: "46.25%",
      ltvBase: "$0",
      budgetFinanced: "$250,000",
      financedPayments: "$27,500",
      totalLoan: "$277,500",
      estimatedCash: "$70,438",
    },
    payment: { term: "24 months", prepayment: "No Prepay" },
  },
  {
    quoteName: "Quote 2",
    rates: { rate: "10.50%", points: "2.00%", processing: "$1,800" },
    leverage: {
      ltc: "80.00%",
      ltArv: "47.00%",
      ltvBase: "$0",
      budgetFinanced: "$255,000",
      financedPayments: "$28,000",
      totalLoan: "$280,000",
      estimatedCash: "$71,500",
    },
    payment: { term: "18 months", prepayment: "3 Months Prepay" },
  },
  {
    quoteName: "Quote 3",
    rates: { rate: "12.00%", points: "3.00%", processing: "$2,200" },
    leverage: {
      ltc: "78.50%",
      ltArv: "45.50%",
      ltvBase: "$0",
      budgetFinanced: "$248,000",
      financedPayments: "$26,000",
      totalLoan: "$275,000",
      estimatedCash: "$72,000",
    },
    payment: { term: "36 months", prepayment: "No Prepay" },
  },
];

export default function QuoteComparison() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [visibleQuotes, setVisibleQuotes] = useState(quoteData.map((quote) => quote.quoteName));
  const tableRef = useRef<HTMLDivElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleQuoteVisibility = (quoteName: string) => {
    setVisibleQuotes((prev) =>
      prev.includes(quoteName) ? prev.filter((name) => name !== quoteName) : [...prev, quoteName]
    );
  };

  const filteredQuotes = quoteData.filter((quote) => visibleQuotes.includes(quote.quoteName));

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["Comparing Quotes"],
      ["", ...filteredQuotes.map((q) => q.quoteName)],
      ["Rates and Fees"],
      ["Rate", ...filteredQuotes.map((q) => q.rates.rate)],
      ["Points (%)", ...filteredQuotes.map((q) => q.rates.points)],
      ["Processing", ...filteredQuotes.map((q) => q.rates.processing)],
      ["Leverage"],
      ["LTC", ...filteredQuotes.map((q) => q.leverage.ltc)],
      ["LT-ARV", ...filteredQuotes.map((q) => q.leverage.ltArv)],
      ["LTV - Base Loan (0%)", ...filteredQuotes.map((q) => q.leverage.ltvBase)],
      ["Budget Financed (100%)", ...filteredQuotes.map((q) => q.leverage.budgetFinanced)],
      ["Financed Payments (24 months)", ...filteredQuotes.map((q) => q.leverage.financedPayments)],
      ["Total Loan Amount", ...filteredQuotes.map((q) => q.leverage.totalLoan)],
      ["Estimated Cash to Close", ...filteredQuotes.map((q) => q.leverage.estimatedCash)],
      ["Payment Structure"],
      ["Term", ...filteredQuotes.map((q) => q.payment.term)],
      ["Prepayment Penalty", ...filteredQuotes.map((q) => q.payment.prepayment)],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Quotes Comparison");
    XLSX.writeFile(wb, "quotes-comparison.xlsx");
  };

  // Export to PDF
  const exportToPDF = async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("quotes-comparison.pdf");
  };

  // Export to Image
  const exportToImage = async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current);
    const link = document.createElement("a");
    link.download = "quotes-comparison.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      <Button variant="contained" className="bg-primary text-white" onClick={() => setOpen(true)}>
        Compare Quotes
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-lg font-bold">Comparing Quotes</span>
          <button onClick={handleMenuOpen} className="hover:bg-primaryColor/10 p-2 rounded-md">
            <Download />
            <span className="text-md font-light">Export As</span>
          </button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={exportToExcel}>Export as Excel</MenuItem>
            <MenuItem onClick={exportToPDF}>Export as PDF</MenuItem>
            <MenuItem onClick={exportToImage}>Export as Image</MenuItem>
          </Menu>
        </DialogTitle>
        <DialogContent className="overflow-x-auto">
          <div className="flex gap-4 mb-4">
            {quoteData.map((quote) => (
              <FormControlLabel
                key={quote.quoteName}
                control={
                  <Checkbox
                    checked={visibleQuotes.includes(quote.quoteName)}
                    onChange={() => toggleQuoteVisibility(quote.quoteName)}
                  />
                }
                label={quote.quoteName}
              />
            ))}
          </div>
          <div ref={tableRef} className="mt-4 border p-4 bg-white rounded-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left">Category</th>
                  {filteredQuotes.map((q) => (
                    <th key={q.quoteName} className="py-2 px-4">
                      {q.quoteName}
                      <FileCopyOutlined className="ml-2 inline-block h-4 w-4 text-gray-500 cursor-pointer" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="font-bold py-2 px-4" colSpan={filteredQuotes.length + 1}>
                    Rates and Fees
                  </td>
                </tr>
                {["rate", "points", "processing"].map((key) => (
                  <tr key={key}>
                    <td className="py-2 px-4">{key.toUpperCase()}</td>
                    {filteredQuotes.map((q) => (
                      <td key={q.quoteName} className="py-2 px-4">
                        {q.rates[key as keyof typeof q.rates]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t">
                  <td className="font-bold py-2 px-4" colSpan={filteredQuotes.length + 1}>
                    Leverage
                  </td>
                </tr>
                {["ltc", "ltArv", "ltvBase", "budgetFinanced", "financedPayments", "totalLoan", "estimatedCash"].map(
                  (key) => (
                    <tr key={key}>
                      <td className="py-2 px-4">{key.toUpperCase()}</td>
                      {filteredQuotes.map((q) => (
                        <td key={q.quoteName} className="py-2 px-4">
                          {q.leverage[key as keyof typeof q.leverage]}
                        </td>
                      ))}
                    </tr>
                  )
                )}
                <tr className="border-t">
                  <td className="font-bold py-2 px-4" colSpan={filteredQuotes.length + 1}>
                    Payment Structure
                  </td>
                </tr>
                {["term", "prepayment"].map((key) => (
                  <tr key={key}>
                    <td className="py-2 px-4">{key.toUpperCase()}</td>
                    {filteredQuotes.map((q) => (
                      <td key={q.quoteName} className="py-2 px-4">
                        {q.payment[key as keyof typeof q.payment]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
