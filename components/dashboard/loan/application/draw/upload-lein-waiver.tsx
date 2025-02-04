"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Link,
} from "@mui/material";
import { CloudUpload, Download, Delete } from "@mui/icons-material";

interface UploadLienWaiverProps {
  drawNumber: string; // Accept the draw number as a string (e.g., "One", "Two", etc.)
}

const UploadLienWaiver: React.FC<UploadLienWaiverProps> = ({ drawNumber }) => {
  // Explicitly type the uploaded files
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; uploadedDate: string }[]>([]);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        uploadedDate: new Date().toISOString().split("T")[0],
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileRemove = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleTaskComplete = () => setTaskCompleted(true);

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-12">
      {/* Page Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-6">
        Draw {drawNumber}: Upload Any Lien Waivers Associated with This Draw
        Request
      </Typography>

      {/* Description */}
      <Typography variant="body1" className="text-gray-600 mb-4">
        Lien waivers are an important piece of protection for both you and us. A
        properly executed lien waiver helps avoid materialmen liens which can
        be costly and can impede your ability to sell the property. Only
        LendingHome lien waiver templates are accepted. Your draw administrator
        will provide you with lien waiver templates.
      </Typography>

      {/* Example Documents */}
      <Typography variant="h6" className="font-heading text-gray-800 mb-2">
        Example Documents:
      </Typography>
      <Link
        href="#"
        underline="hover"
        className="text-primary text-sm block mb-4"
      >
        Download the provided lien waivers
      </Link>

      {/* File Upload Section */}
      <Box className="space-y-4">
        {/* Upload Button */}
        <Button
          variant="outlined"
          startIcon={<CloudUpload />}
          component="label"
        >
          Upload File
          <input
            hidden
            type="file"
            multiple
            onChange={handleFileUpload}
            accept="application/pdf"
          />
        </Button>

        {/* Uploaded Files List */}
        <List>
          {uploadedFiles.map((file,index) => (
            <ListItem
              key={index}
              className="border border-gray-300 rounded-md mb-2"
            >
              <ListItemText
                primary={file.name}
                secondary={`uploaded ${file.uploadedDate}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="download"
                  className="text-primary"
                >
                  <Download />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  className="text-red-600"
                  onClick={() => handleFileRemove(file.name)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Complete Task Button */}
      <Box className="flex mt-6">
        <Button
          variant="contained"
          color="primary"
          onClick={handleTaskComplete}
          disabled={uploadedFiles.length === 0 || taskCompleted} // Disable if no files or already completed
        >
          I&apos;ve completed this task
        </Button>
      </Box>

      {/* Task Status */}
      {taskCompleted && (
        <Alert severity="success" className="mt-4">
          Task completed successfully!
        </Alert>
      )}
    </div>
  );
};

export default UploadLienWaiver;
