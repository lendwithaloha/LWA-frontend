"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  LoanStatus,
  selectInquiry,
} from "@/store/slice/loan-inquiry/loanSlice";

const QuoteTable = ({ status }: { status: LoanStatus }) => {
  const data = useSelector((state: RootState) => state.loan.filteredInquiries);
  const rows = data.filter((inquiry) => inquiry.status === status);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleNavigate = (id: number) => {
    dispatch(selectInquiry(id));
    router.push(`/dashboard/new-loan/details/${id}`);
  };

  if (!rows || rows.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">No loan inquiries found.</p>
      </div>
    );
  }

  return (
    <TableContainer component={Paper} className="shadow-md rounded-md">
      <Table>
        {/* Table Head */}
        <TableHead>
          <TableRow>
            <TableCell
              style={{ borderRight: "1px solid #CDCED8" }}
              className="bg-gray-100"
            >
              Property Address
            </TableCell>
            <TableCell
              style={{ borderRight: "1px solid #CDCED8" }}
              className="bg-gray-100"
            >
              Loan Amount
            </TableCell>
            <TableCell
              style={{ borderRight: "1px solid #CDCED8" }}
              className="bg-gray-100"
            >
              LTV
            </TableCell>
            <TableCell
              style={{ borderRight: "1px solid #CDCED8" }}
              className="bg-gray-100"
            >
              Rate
            </TableCell>
            <TableCell
              style={{ borderRight: "1px solid #CDCED8" }}
              className="bg-gray-100"
            >
              Points
            </TableCell>
            <TableCell
              style={{ borderRight: "1px solid #CDCED8" }}
              className="bg-gray-100"
            >
              Last Updated
            </TableCell>
            <TableCell
              style={{ borderRight: "1px solid #CDCED8" }}
              className="bg-gray-100"
            >
              Processing Fee
            </TableCell>
            <TableCell
              style={{ borderRight: "1px solid #CDCED8" }}
              className="bg-gray-100"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.propertyAddress}</TableCell>
              <TableCell>{row.loanAmount}</TableCell>
              <TableCell>{row.ltv}</TableCell>
              <TableCell>{row.rate}</TableCell>
              <TableCell>{row.points}</TableCell>
              <TableCell>{row.lastUpdated}</TableCell>
              <TableCell>{row.processingFee}</TableCell>

              <TableCell>
                <IconButton
                  onClick={() => handleNavigate(row.id)}
                  aria-label="View details"
                >
                  <Visibility />
                </IconButton>
                <IconButton aria-label="Edit">
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuoteTable;
