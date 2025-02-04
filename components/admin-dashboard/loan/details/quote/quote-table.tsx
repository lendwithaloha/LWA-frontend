import React, { useState } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";

import { LuMoreVertical } from "react-icons/lu";
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddQuoteDrawer from "./add-quote-drawer";

const LoanQuotesTable = () => {
  type Quote = {
    id: number;
    lender: string;
    dscr: string;
    lenderExpense: string;
    term: string;
    ioVsPi: string;
    qualifyingLtv: string;
    quotedRate: string;
    ysp: string;
    lenderPoints: string;
    lenderProcessing: string;
    lwaProcessingFee: string;
    lwaPoints: string;
    pppStructure: string;
    financedIr: string;
    recourse: string;
  };

  const quotes: Quote[] = [
    {
      id: 1,
      lender: "CIVIC",
      dscr: "1",
      lenderExpense: "0.00%",
      term: "12 Months",
      ioVsPi: "IO",
      qualifyingLtv: "85%",
      quotedRate: "11%",
      ysp: "0%",
      lenderPoints: "1%",
      lenderProcessing: "$1,499.00",
      lwaProcessingFee: "$0.00",
      lwaPoints: "1.00%",
      pppStructure: "No Prepay",
      financedIr: "0",
      recourse: "Full Recourse",
    },
    {
      id: 2,
      lender: "Kiavi",
      dscr: "1.1",
      lenderExpense: "0.00%",
      term: "12 Months",
      ioVsPi: "IO",
      qualifyingLtv: "83%",
      quotedRate: "11.95%",
      ysp: "0%",
      lenderPoints: "1%",
      lenderProcessing: "$1,499.00",
      lwaProcessingFee: "$1,499.00",
      lwaPoints: "0.50%",
      pppStructure: "No Prepay",
      financedIr: "0",
      recourse: "Full Recourse",
    },
    {
      id: 3,
      lender: "Kiavi",
      dscr: "1.1",
      lenderExpense: "0.00%",
      term: "12 Months",
      ioVsPi: "IO",
      qualifyingLtv: "83%",
      quotedRate: "11.95%",
      ysp: "0%",
      lenderPoints: "1%",
      lenderProcessing: "$1,499.00",
      lwaProcessingFee: "$1,499.00",
      lwaPoints: "0.50%",
      pppStructure: "No Prepay",
      financedIr: "0",
      recourse: "Full Recourse",
    },
    {
      id: 4,
      lender: "CIVIC",
      dscr: "1",
      lenderExpense: "0.00%",
      term: "12 Months",
      ioVsPi: "IO",
      qualifyingLtv: "85%",
      quotedRate: "11%",
      ysp: "0%",
      lenderPoints: "1%",
      lenderProcessing: "$1,499.00",
      lwaProcessingFee: "$0.00",
      lwaPoints: "1.00%",
      pppStructure: "No Prepay",
      financedIr: "0",
      recourse: "Full Recourse",
    },
    {
      id: 5,
      lender: "CIVIC",
      dscr: "1",
      lenderExpense: "0.00%",
      term: "12 Months",
      ioVsPi: "IO",
      qualifyingLtv: "85%",
      quotedRate: "11%",
      ysp: "0%",
      lenderPoints: "1%",
      lenderProcessing: "$1,499.00",
      lwaProcessingFee: "$0.00",
      lwaPoints: "1.00%",
      pppStructure: "No Prepay",
      financedIr: "0",
      recourse: "Full Recourse",
    },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const closeDrawer = () => setIsDrawerOpen(false);
  const closeDrawer2 = () => setIsDrawerOpen2(false);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredColumn(index);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  };

  return (
    <div className="w-full p-4 md:p-6">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl font-medium text-gray-900">Collected quotes</h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Send All Quote
          </button>
          <button
            className="flex-1 sm:flex-none px-4 py-2 bg-primaryColor text-white rounded-md  transition-colors"
            onClick={() => setIsDrawerOpen(true)}
          >
            Add Quote
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 md:-mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 ">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 10,
                        background: "#f9fafb",
                      }}
                    >
                      Loan Details
                    </TableCell>
                    {quotes.map((_, index) => (
                      <TableCell
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          background:
                            hoveredColumn === index ? "#eee" : "#f9fafb",
                        }}
                      >
                        <Menu
                          as="div"
                          className="relative flex items-center justify-between"
                        >
                          <span> Quote {index + 1}</span>
                          <MenuButton className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                            <LuMoreVertical className="h-4 w-4 text-gray-500" />
                          </MenuButton>
                          <MenuItems className="absolute top-5 right-0 z-20 mt-3 w-40 bg-white rounded-md shadow-lg border border-gray-200 focus:outline-none">
                            <div className="py-1 font-normal">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active ? "bg-gray-100" : ""
                                    } w-full text-left px-4 py-2 text-sm `}
                                    onClick={() => setShowPopup(true)}
                                  >
                                    Send Quote
                                  </button>
                                )}
                              </Menu.Item>
                              <Divider />
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active ? "bg-gray-100" : ""
                                    } w-full text-left px-4 py-2 text-sm `}
                                    onClick={() => setIsDrawerOpen2(true)}
                                  >
                                    Edit
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </MenuItems>
                        </Menu>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { key: "Lender", accessor: "lender" },
                    { key: "DSCR Requirement", accessor: "dscr" },
                    { key: "Lender Expense Factor", accessor: "lenderExpense" },
                    { key: "Term", accessor: "term" },
                    { key: "IO vs PI", accessor: "ioVsPi" },
                    { key: "Qualifying LTV", accessor: "qualifyingLtv" },

                    { key: "YSP", accessor: "ysp" },
                    { key: "Lender Points", accessor: "lenderPoints" },
                    { key: "Lender Processing", accessor: "lenderProcessing" },
                    { key: "LWA Processing Fee", accessor: "lwaProcessingFee" },
                    { key: "LWA Points", accessor: "lwaPoints" },
                    { key: "PPP Structure", accessor: "pppStructure" },
                    { key: "Financed IR (mo)", accessor: "financedIr" },
                    { key: "Recourse", accessor: "recourse" },
                  ].map((row, rowIndex) => (
                    <TableRow key={row.key}>
                      <TableCell
                        style={{
                          position: "sticky",
                          left: 0,
                          zIndex: 10,
                          background: "#fff",
                        }}
                      >
                        {row.key}
                      </TableCell>
                      {quotes.map((quote, colIndex) => (
                        <TableCell
                          key={`${rowIndex}-${colIndex}`}
                          onMouseEnter={() => handleMouseEnter(colIndex)}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            background:
                              hoveredColumn === colIndex ? "#eee" : "#fff",
                          }}
                        >
                          {quote[row.accessor as keyof Quote]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <Modal
        open={showPopup}
        onClose={() => setShowPopup(false)}
        aria-labelledby="add-question-modal"
        aria-describedby="add-question-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: "90%",
            maxWidth: 400,
          }}
        >
          <p className="text-md mb-4">Confirm Sending Quote</p>
          <h1 className="font-medium text-xl">
            Are you sure you want to send Quote to the borrower
          </h1>
          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              onClick={() => setShowPopup(false)}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setShowPopup(false)}
              variant="contained"
              color="primary"
            >
              Yes, Send it
            </Button>
          </Box>
        </Box>
      </Modal>
      <AddQuoteDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        isAddQuote={true}
      />
      <AddQuoteDrawer
        isOpen={isDrawerOpen2}
        onClose={closeDrawer2}
        isAddQuote={false}
      />
    </div>
  );
};

export default LoanQuotesTable;
