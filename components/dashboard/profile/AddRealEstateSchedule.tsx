import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Modal,
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import RealEstateModal from "@/components/dashboard/realEstateSchedule/real-est/component/RealEstateModal";

const AddRealEstateSchedule = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openRealEstateModal, setOpenRealEstateModal] = useState(false); // State for RealEstateModal

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenRealEstateModal = () => setOpenRealEstateModal(true); // Open RealEstateModal
  const handleCloseRealEstateModal = () => setOpenRealEstateModal(false); // Close RealEstateModal

  const handleDelete = () => {
    console.log("Item deleted");
    setOpenModal(false);
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        fontFamily: "Roboto, sans-serif",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      {/* Header Section */}
      <Typography variant="h5" gutterBottom>
        Add Your Schedule of Real Estate
      </Typography>
      <Typography variant="body1" gutterBottom>
        Add your schedule of real estate by uploading an existing file or
        entering the details manually. Uploaded files will be processed using
        OCR to extract and map the relevant information into the appropriate
        fields.
      </Typography>

      {/* Buttons Section */}
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          marginTop: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Button variant="outlined" fullWidth>
          Download Sample File
        </Button>
        <Button variant="contained" fullWidth onClick={handleOpenRealEstateModal}>
          Add Manually
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Box} className="bg-white">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">
                Added real estate schedule
              </TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>

            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">
                <IconButton>
                  <Visibility />
                </IconButton>
                <IconButton>
                  <Edit />
                </IconButton>
                <IconButton onClick={handleOpenModal}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="delete-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Real Estate Modal */}
      <RealEstateModal open={openRealEstateModal} onClose={handleCloseRealEstateModal} />
    </Box>
  );
};

export default AddRealEstateSchedule;
