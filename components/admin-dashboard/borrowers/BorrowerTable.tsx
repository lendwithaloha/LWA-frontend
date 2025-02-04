import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Menu,
  MenuItem,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  DialogContentText,
} from "@mui/material";
import { Visibility, Edit, FilterList } from "@mui/icons-material";
import { Borrower } from "./dummyData";
import { useRouter } from "next/navigation";
interface BorrowerTableProps {
  borrowers: Borrower[];
}

export default function BorrowerTable({ borrowers }: BorrowerTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [borrowerList, setBorrowerList] = useState<Borrower[]>(borrowers);
  const [viewBorrower, setViewBorrower] = useState<Borrower | null>(null);
  const [editBorrower, setEditBorrower] = useState<Borrower | null>(null);
  const [deleteBorrower, setDeleteBorrower] = useState<Borrower | null>(null);

  useEffect(() => {
    setBorrowerList(borrowers);
  }, [borrowers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filter: string) => {
    setSelectedFilter(filter);
    setFilterAnchorEl(null);
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = () => {
    router.push("/admin-dashboard/borrowers/all-borrowers/detail");
    // setViewBorrower(borrower)
  };

  const handleEdit = (borrower: Borrower) => {
    setEditBorrower(borrower);
  };

  const handleEditSave = () => {
    if (editBorrower) {
      setBorrowerList((prevList) =>
        prevList.map((borrower) =>
          borrower.id === editBorrower.id ? editBorrower : borrower
        )
      );
      setEditBorrower(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteBorrower) {
      const updatedList = borrowerList.filter(
        (borrower) => borrower.id !== deleteBorrower.id
      );
      setBorrowerList(updatedList);
      setDeleteBorrower(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteBorrower(null);
  };

  const filteredBorrowers = React.useMemo(() => {
    return borrowerList.filter((borrower) => {
      const searchFields = [
        borrower.name,
        borrower.email,
        borrower.phoneNumber,
      ].map((field) => (field ?? "").toLowerCase());
      const matchesSearchQuery = searchFields.some((field) =>
        field.includes(searchQuery)
      );

      if (selectedFilter === "all") return matchesSearchQuery;
      if (selectedFilter === "highCreditScore")
        return matchesSearchQuery && borrower.creditScore >= 700;
      if (selectedFilter === "lowCreditScore")
        return matchesSearchQuery && borrower.creditScore < 700;
      if (selectedFilter === "ongoingLoans")
        return matchesSearchQuery && borrower.ongoingLoans > 0;

      return matchesSearchQuery;
    });
  }, [borrowerList, searchQuery, selectedFilter]);

  useEffect(() => {
    if (page * rowsPerPage >= filteredBorrowers.length && page > 0) {
      setPage(0);
    }
  }, [filteredBorrowers, page, rowsPerPage]);

  const paginatedBorrowers = filteredBorrowers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="mb-4 max-md:w-screen max-md:-ml-9 ">
      <div className="flex max-md:flex-col max-md:items-start gap-3 justify-between items-center mb-4">
        <TextField
          label="Search by Name, Email, or Phone"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ maxWidth: "400px", marginRight: "1rem" }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={handleFilterClick}
          style={{ whiteSpace: "nowrap" }}
        >
          Filters
        </Button>
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={() => setFilterAnchorEl(null)}
        >
          <MenuItem onClick={() => handleFilterClose("all")}>
            All Borrowers
          </MenuItem>
          <MenuItem onClick={() => handleFilterClose("highCreditScore")}>
            High Credit Score (700+)
          </MenuItem>
          <MenuItem onClick={() => handleFilterClose("lowCreditScore")}>
            Low Credit Score (&lt; 700)
          </MenuItem>
          <MenuItem onClick={() => handleFilterClose("ongoingLoans")}>
            With Ongoing Loans
          </MenuItem>
        </Menu>
      </div>
      <TableContainer component={Paper} style={{ marginTop: "1.5rem" }}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="borrowers table"
          className="max-md:w-screen"
        >
          <TableHead>
            <TableRow>
              <TableCell>Borrower Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Credit Score</TableCell>
              <TableCell>Ongoing Loans</TableCell>
              <TableCell>Date Registered</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBorrowers.length > 0 ? (
              paginatedBorrowers.map((borrower) => (
                <TableRow key={borrower.id}>
                  <TableCell>{borrower.name}</TableCell>
                  <TableCell>{borrower.email}</TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",

                      maxWidth: {
                        xs: 100, // Apply a smaller max width for extra small screens
                        sm: 150, // Apply a medium width for small screens
                        md: "auto", // Full width for medium and larger screens
                      },
                    }}
                  >
                    {borrower.phoneNumber}
                  </TableCell>
                  <TableCell>{borrower.creditScore}</TableCell>
                  <TableCell>{borrower.ongoingLoans}</TableCell>
                  <TableCell>
                    {new Date(borrower.dateRegistered).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="view" onClick={() => handleView()}>
                      <Visibility />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(borrower)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No borrowers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredBorrowers.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>

      {/* View Modal */}
      <Dialog
        open={Boolean(viewBorrower)}
        onClose={() => setViewBorrower(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Borrower Details</DialogTitle>
        <DialogContent>
          {viewBorrower && (
            <Box>
              <Typography variant="h6">{viewBorrower.name}</Typography>
              <Typography>Email: {viewBorrower.email}</Typography>
              <Typography>Phone: {viewBorrower.phoneNumber}</Typography>
              <Typography>Credit Score: {viewBorrower.creditScore}</Typography>
              <Typography>
                Ongoing Loans: {viewBorrower.ongoingLoans}
              </Typography>
              <Typography>
                Registered Date:{" "}
                {new Date(viewBorrower.dateRegistered).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setViewBorrower(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={Boolean(editBorrower)}
        onClose={() => setEditBorrower(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Borrower</DialogTitle>
        <DialogContent>
          {editBorrower && (
            <>
              <TextField
                fullWidth
                margin="dense"
                label="Name"
                value={editBorrower.name}
                onChange={(e) =>
                  setEditBorrower({ ...editBorrower, name: e.target.value })
                }
              />
              <TextField
                fullWidth
                margin="dense"
                label="Email"
                value={editBorrower.email}
                onChange={(e) =>
                  setEditBorrower({ ...editBorrower, email: e.target.value })
                }
              />
              <TextField
                fullWidth
                margin="dense"
                label="Phone Number"
                value={editBorrower.phoneNumber}
                onChange={(e) =>
                  setEditBorrower({
                    ...editBorrower,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                margin="dense"
                label="Credit Score"
                type="number"
                value={editBorrower.creditScore}
                onChange={(e) =>
                  setEditBorrower({
                    ...editBorrower,
                    creditScore: Number(e.target.value),
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditBorrower(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={Boolean(deleteBorrower)}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "error.main" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          {deleteBorrower && (
            <DialogContentText>
              Are you sure you want to delete{" "}
              <strong>{deleteBorrower.name}</strong>? This action cannot be
              undone.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
