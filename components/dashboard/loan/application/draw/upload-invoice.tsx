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
} from "@mui/material";
import { CloudUpload, Download, Delete } from "@mui/icons-material";

interface UploadInvoiceProps {
  drawNumber: string; // Accept the draw number as a string (e.g., "One", "Two", etc.)
}

const UploadInvoice: React.FC<UploadInvoiceProps> = ({ drawNumber }) => {
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "Document_Not_Needed_-_Pro.pdf", uploadedDate: "2024-09-26" },
  ]);
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

  const handleTaskComplete = () => {
    setTaskCompleted(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-12">
      {/* Page Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-6">
        Draw {drawNumber}: Upload Your Invoice(s) for this Draw Request
      </Typography>

      {/* Description */}
      <Typography variant="body1" className="text-gray-600 mb-6">
        Invoices for materials and labor help our team understand the extent of
        the investment you&apos;ve made and the quality of materials used. Keep in
        mind that we only give credit for installed materials and performed
        labor.
      </Typography>

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
          {uploadedFiles.map((file,index:number) => (
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
      <Box className="mt-6">
        {taskCompleted ? (
          <Alert severity="success" className="w-fit">
            I&apos;ve completed this task
          </Alert>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleTaskComplete}
            disabled={uploadedFiles.length === 0}
          >
            I&apos;ve completed this task
          </Button>
        )}
      </Box>
    </div>
  );
};

export default UploadInvoice;
