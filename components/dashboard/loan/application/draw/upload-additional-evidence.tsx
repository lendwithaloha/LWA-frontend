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

interface UploadAdditionalEvidenceProps {
  drawNumber: string; // Accept the draw number as a string (e.g., "One", "Two", etc.)
}

const UploadAdditionalEvidence: React.FC<UploadAdditionalEvidenceProps> = ({
  drawNumber,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; uploadedDate: string }[]>([]);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [taskSkipped, setTaskSkipped] = useState(false);

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
    setTaskSkipped(false); // Ensure "Skip" is not active
  };

  const handleTaskSkip = () => {
    setTaskSkipped(true);
    setTaskCompleted(false); // Ensure "Complete Task" is not active
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-12">
      {/* Page Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-6">
        Draw {drawNumber}: Upload Additional Evidence Associated with This Draw
        Request
      </Typography>

      {/* Description */}
      <Typography variant="body1" className="text-gray-600 mb-6">
        Please upload any relevant draw evidence that can help LendingHome to
        process your draw request. This could include floor plans, work permits,
        etc. There is no such thing as too much information!
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

      {/* Complete Task and Skip Buttons */}
      <Box className="flex gap-4 mt-6">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleTaskSkip}
          disabled={taskCompleted} // Disable if "Complete Task" is active
        >
          Skip
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleTaskComplete}
          disabled={uploadedFiles.length === 0 || taskSkipped} // Disable if no files or "Skip" is active
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
      {taskSkipped && (
        <Alert severity="info" className="mt-4">
          Task skipped.
        </Alert>
      )}
    </div>
  );
};

export default UploadAdditionalEvidence;
