"use client";

import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";

// Define the type for the props
interface DrawFormProps {
  drawNumber: string; // Accept the draw number as a string (e.g., "one", "two", etc.)
}

// Sample data for the draw schedule
const drawScheduleData = [
  {
    drawNo: 1,
    targetAmount: "$0.00",
    actualComplete: "7.450%",
    authorizedAmount: "$10,000.00",
    status: "Disbursed",
  },
  {
    drawNo: 2,
    targetAmount: "$0.00",
    actualComplete: "10.800%",
    authorizedAmount: "$14,500.00",
    status: "Disbursed",
  },
  {
    drawNo: 3,
    targetAmount: "$0.00",
    actualComplete: "8.860%",
    authorizedAmount: "$11,894.00",
    status: "Disbursed",
  },
  {
    drawNo: 4,
    targetAmount: "$0.00",
    actualComplete: "13.400%",
    authorizedAmount: "$17,980.00",
    status: "Disbursed",
  },
  {
    drawNo: 5,
    targetAmount: "$0.00",
    actualComplete: "8.670%",
    authorizedAmount: "$11,632.00",
    status: "Disbursed",
  },
  {
    drawNo: 6,
    targetAmount: "$0.00",
    actualComplete: "7.130%",
    authorizedAmount: "$9,566.00",
    status: "Disbursed",
  },
  {
    drawNo: 7,
    targetAmount: "$0.00",
    actualComplete: "12.840%",
    authorizedAmount: "$17,235.00",
    status: "Disbursed",
  },
  {
    drawNo: 8,
    targetAmount: "$0.00",
    actualComplete: "10.520%",
    authorizedAmount: "$14,114.00",
    status: "Disbursed",
  },
  {
    drawNo: 9,
    targetAmount: "$0.00",
    actualComplete: "-",
    authorizedAmount: "-",
    status: "Unsubmitted",
  },
];

const DrawForm: React.FC<DrawFormProps> = ({ drawNumber }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-12">
      {/* Page Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-6">
        Draw {drawNumber}: Request a Draw Form
      </Typography>

      {/* Description */}
      <Typography variant="body1" className="text-gray-600 mb-4">
        Thank you for requesting your draw form. Your draw administrator will
        send it to you within 48 hours. It will also be available through your
        dashboard. Once we receive a completed form back from you, we will
        order an inspection, if necessary, which takes 2-3 days to be completed.
        While you wait for the draw form, please upload paid invoices, receipts,
        and photos.
      </Typography>

      {/* Link to Guide */}
      <Link href="#" className="text-blue-600 hover:underline mb-6 block">
        View the Construction Draw Process Quick Start Guide
      </Link>

      {/* Table Title */}
      <Typography variant="h5" className="text-gray-800 font-bold mb-4">
        Draw Schedule
      </Typography>

      {/* Draw Schedule Table */}
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">Draw No.</TableCell>
              <TableCell className="font-semibold">Target Amount</TableCell>
              <TableCell className="font-semibold">Actual % Complete</TableCell>
              <TableCell className="font-semibold">Authorized Amount</TableCell>
              <TableCell className="font-semibold">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drawScheduleData.map((row) => (
              <TableRow
                key={row.drawNo}
                className={row.status === "Unsubmitted" ? "bg-gray-100" : ""}
              >
                <TableCell>{row.drawNo}</TableCell>
                <TableCell>{row.targetAmount}</TableCell>
                <TableCell>{row.actualComplete}</TableCell>
                <TableCell>{row.authorizedAmount}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DrawForm;
