// src/components/LeaseAgreementUploader.tsx
"use client"
import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";  // Import RootState
import { addFile, removeFile, toggleVacancyStatus } from "@/store/slice/leaseAgreementSlice";  // Import actions

const LeaseAgreementUploader: React.FC = () => {
  const dispatch = useDispatch();
  const { files, isVacant } = useSelector((state: RootState) => state.leaseAgreement); // Access state

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      uploadedFiles.forEach((file) => {
        dispatch(addFile(file));  // Dispatch action to add files
      });
    }
  };

  const handleDeleteFile = (index: number) => {
    dispatch(removeFile(index));  // Dispatch action to remove file
  };

  const handleCompleteTask = () => {
    if (files.length > 0 || isVacant) {
      alert("Task marked as complete");
    } else {
      alert("Please upload a file or mark as vacant");
    }
  };

 

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "20px auto",
        padding: "16px",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Upload your client’s lease agreement
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Please provide a current lease. If the property is vacant, you can skip this step.
      </Typography>

      <Box
        sx={{
          border: "2px dashed #ccc",
          borderRadius: "8px",
          padding: "16px",
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 40, color: "gray", marginBottom: 2 }} />
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Drag and drop files into this window to upload, or{" "}
          <Button variant="text" component="label">
            choose file
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </Button>
        </Typography>
        
      </Box>

      {files.length > 0 && (
        <List>
          {files.map((file, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #f0f0f0" }}>
              <ListItemText primary={file.name} secondary="Uploaded just now" />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleDeleteFile(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      <Box sx={{ display: "flex", marginTop: 3 }}>
        <Button
          variant={isVacant ? "contained" : "outlined"}
          sx={{
            backgroundColor: isVacant ? "#007531" : undefined,
            color: isVacant ? "#fff" : undefined,
            "&:hover": {
              backgroundColor: isVacant ? "#005a25" : undefined,
            },
          }}
          onClick={() => dispatch(toggleVacancyStatus())} // Dispatch action to toggle vacancy status
        >
          {isVacant ? "Property is vacant" : "Mark as vacant"}
        </Button>
        <Button
          variant="contained"
          disabled={files.length === 0 && !isVacant}
          onClick={handleCompleteTask}
        >
          I’ve completed this task
        </Button>
      </Box>
    </Box>
  );
};

export default LeaseAgreementUploader;
