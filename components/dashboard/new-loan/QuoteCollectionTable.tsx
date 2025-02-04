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
import { Tooltip } from "@/components/common/ToolTip";
import { PiQuestion } from "react-icons/pi";

const QuoteCollectionTable = ({ status }: { status: LoanStatus }) => {
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
        <TableHead className=" border-b-0">
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
              Loan Purpose
            </TableCell>
            <TableCell
              style={{ borderRight: "1px solid #CDCED8" }}
              className="bg-gray-100"
            >
              Investment Strategy
            </TableCell>
            <TableCell
              style={{ borderRight: "1px solid #CDCED8" }}
              className="bg-gray-100"
            >
              <Tooltip
                text="The Desiered Closing Date"
                className=" text-sm flex items-center justify-center py-2 text-gray-800 mt-2"
              >
                <span className="flex gap-1">
                  {" "}
                  Requested COE <PiQuestion
                    size={20}
                    className="text-black"
                  />{" "}
                </span>
              </Tooltip>
            </TableCell>
            <TableCell
              style={{ borderRight: "1px solid #CDCED8" }}
              className="bg-gray-100"
            >
              Date Created
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
              <TableCell>{row.loanPurpose}</TableCell>
              <TableCell>{row.investmentStrategy || "N/A"}</TableCell>
              <TableCell>{row.loanAmount}</TableCell>
              <TableCell>{row.dateCreated}</TableCell>
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

export default QuoteCollectionTable;
