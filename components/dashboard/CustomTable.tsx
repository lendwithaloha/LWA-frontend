"use client";

import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TablePagination,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Column<T> = {
  label: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
};

type CustomTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  title: string;
  customStyles?: Record<string, React.CSSProperties>;
};

// Helper function to resolve the accessor
const resolveAccessor = <T,>(
  accessor: keyof T | ((item: T) => React.ReactNode),
  item: T
): React.ReactNode => {
  if (typeof accessor === "function") {
    return accessor(item);
  }

  const value = item[accessor];

  // Ensure value is a valid ReactNode or cast it if you&apos;re confident
  return value as React.ReactNode;
};

const CustomTable = <T,>({
  data,
  columns,
  title,
}: CustomTableProps<T>) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box padding={0}>
      {isMobile ? (
        <Box>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          {paginatedData.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  {resolveAccessor(columns[0].accessor, item)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {columns.slice(1).map((col, colIndex) => (
                  <Typography key={colIndex} variant="body2">
                    <strong>{col.label}:</strong>{" "}
                    {resolveAccessor(col.accessor, item)}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
          <Box mt={2}>
            <TablePagination
              component="div"
              count={data.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col, index) => (
                  <TableCell key={index}>
                    <strong>{col.label}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex}>
                      {resolveAccessor(col.accessor, item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Box>
  );
};

export default CustomTable;
