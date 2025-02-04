import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { UploadZone } from "@/components/upload-zone"; // Replace with actual upload component
import React from "react";

interface RevisionModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const RevisionModal: React.FC<RevisionModalProps> = ({
  isModalOpen,
  handleCloseModal,
}) => {
  const reasons = ["Incorrect Information", "Missing Details", "Other"]; // Example options

  return (
    <div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box className="bg-white rounded-md shadow-md p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px]">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h6" className="font-normal">
              Request Revision for Quote
            </Typography>
            <Button onClick={handleCloseModal} className="text-gray-600">
              ✕
            </Button>
          </div>
          <Typography className="text-sm text-gray-500 mb-4">
            Provide a detailed explanation below to help us address your request
            promptly.
          </Typography>

          {/* Reason for Revision */}
          <Typography className="text-sm font-normal mb-1">
            Reason for Revision
          </Typography>
          <TextField
            select
            fullWidth
            size="small"
            variant="outlined"
            className="mb-4"
            defaultValue=""
            placeholder="Choose"
          >
            <MenuItem value="">Choose</MenuItem>
            {reasons.map((reason, index) => (
              <MenuItem key={index} value={reason}>
                {reason}
              </MenuItem>
            ))}
          </TextField>

          {/* Details Input */}
          <Typography className="text-sm font-normal mb-1">Details</Typography>
          <TextField
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            placeholder="Enter here..."
            className="mb-4"
          />

          {/* Upload Supporting Documents */}
          <Typography className="text-sm font-normal mb-1">
            Upload Supporting Documents (optional)
          </Typography>
          <div className="mb-6 border-2 border-dashed rounded p-4">
            <UploadZone
              title="Upload your documents"
              onUploadComplete={() => {}}
              isUploaded={false}
            />
            <Typography className="text-xs text-gray-500 text-center mt-2">
              Maximum 3 files - Total Max 10 MB
            </Typography>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <Button
              onClick={handleCloseModal}
              className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="bg-primaryColor px-6 py-2 text-white"
            >
              Submit Request
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RevisionModal;
