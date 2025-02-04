"use client";
import React from "react";
import {
  Typography,
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Download, Delete } from "@mui/icons-material";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addDocument, DocumentType, markFormCompleted, removeDocument } from "@/store/slice/csm/applicationSlice";
import FileUploadButton from "@/components/upload_button";
import LockedAlert from "@/components/dashboard/loan/application/common/alert";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const UploadSpousalConsentDocument: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = "guarantorInfo";
  const subTabKey = "spousalConsent";


  const { fields } = useSelector((state: RootState) => state.application.tabs[tabKey].subTabs[subTabKey]);
  const { isApplicationSubmitted } = useSelector((state: RootState) => state.application);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const uploadDate = new Date().toISOString().split("T")[0];
        const document = { name: file.name, uploadDate } as DocumentType;
        dispatch(addDocument({ tabKey, subTabKey, ...document }));
      });
    }
  };

  const handleFileRemove = (documentName: string) => {
    dispatch(removeDocument({ tabKey, subTabKey, name: documentName }));
  };

  const handleCompleteTask = () => {
    dispatch(markFormCompleted({ tabKey, subTabKey }));
    dispatch(updateSubTabProgress({ tabKey, subTabKey, isCompleted: true }));

  };


  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12">
      {/* Alert */}
      {isApplicationSubmitted && (
        <LockedAlert />
      )}

      {/* Title */}
      <Typography variant="h5" className="font-heading text-gray-800 mb-4">
        Upload your client’s executed spousal consent form for your guarantor
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        If the guarantor is married or separated and living in a community
        property state, LendingHome will obtain a signed spousal consent form.
      </Typography>

      {/* Required Document Section */}
      <Box className="rounded-lg shadow-sm mb-6">
        <Typography
          variant="h6"
          className="text-gray-800 font-bold mb-4 border-b pb-2"
        >
          Required Document:
        </Typography>
        <Link
          href="#"
          underline="hover"
          className="text-primary mb-4 block text-sm"
        >
          Download Template
        </Link>

        {/* File Upload Section */}
        <FileUploadButton label="Upload photos" onChange={handleFileUpload} />


        {/* Uploaded Files List */}
        <List>
          {fields.uploadedDocuments.map((file: DocumentType, index: number) => (
            <ListItem
              key={index}
              className="border border-gray-300 rounded-md mb-2"
            >
              <ListItemText
                primary={file.name}
                secondary={`Uploaded on ${file.uploadDate}`}
                primaryTypographyProps={{
                  className: "text-gray-800 truncate",
                }}
                secondaryTypographyProps={{
                  className: "text-gray-500",
                }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
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

      {/* Action Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCompleteTask}

        className="bg-primary hover:bg-primary-dark w-full md:w-auto"
      >
        I’ve completed this task
      </Button>
    </div>
  );
};

export default UploadSpousalConsentDocument;
