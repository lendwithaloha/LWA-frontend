"use client";

import React  from "react";
import { Typography, Box, Link, Button, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material";
import {  Delete, Download, Folder } from "@mui/icons-material";
import {  RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addDocument, DocumentType, markFormCompleted, removeDocument } from "@/store/slice/csm/applicationSlice";
import LockedAlert from "@/components/dashboard/loan/application/common/alert";
import FileUploadButton from "@/components/upload_button";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const SignedDisclosureUpload: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = "agreements";
  const subTabKey = "signedDisclosures";


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
    dispatch(removeDocument({tabKey,subTabKey,name:documentName}));
  };

  const handleCompleteTask = () => {
    dispatch(markFormCompleted({ tabKey, subTabKey }));
    dispatch(updateSubTabProgress({ tabKey, subTabKey, isCompleted: true }));


  };


  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12">
      {/* Alert */}
      {
        isApplicationSubmitted && (
          <LockedAlert/>
        )
      }

      {/* Title */}
      <Typography
        variant="h5"
        className="font-heading text-gray-800 mb-4"
      >
        Upload your client’s signed disclosures
      </Typography>

      {/* Description */}
      <Typography variant="body1" className="text-gray-600 mb-6">
        A Signed Disclosure Form must be submitted by your Client before a loan
        file can be worked on by Lend with Loha. Please upload the form here.
      </Typography>

      {/* Required Document Section */}
      <Typography variant="body2" className="text-gray-800 font-semibold mb-2">
        Required Document:
      </Typography>
      <Link
        href="#"
        className="text-blue-600 underline text-sm md:text-base block mb-4"
      >
        Download broker disclosure
      </Link>

      {/* File Upload Section */}
      <FileUploadButton label="Upload photos" onChange={handleFileUpload} />


       {/* Uploaded Photos List */}
       <List>
          {fields.uploadedDocuments.map((file:DocumentType, index:number) => (
            <ListItem
              key={index}
              className="border border-gray-300 rounded-md mb-2"
            >
              <Folder className="text-gray-500 mr-4" />
              <ListItemText
                primary={file.name}
                secondary={`uploaded ${file.uploadDate}`}
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

      {/* Action Button */}
      <Button
        variant="contained"
        color="primary"
        className="bg-primary hover:bg-primary-dark w-full md:w-auto"
        onClick={handleCompleteTask}
      >
        I’ve completed this task
      </Button>

      {/* Tips Section */}
      <Box className="p-6 rounded-lg mt-6">
        <Typography
          variant="h6"
          className="text-gray-800 font-heading mb-2"
        >
          Tips from Lend with Loha:
        </Typography>
        <Typography variant="body2" className="text-gray-600 mb-2">
          Tip #1: This form is property-specific. It must be executed and dated
          for every loan submitted by your client.
        </Typography>
        <Typography variant="body2" className="text-gray-600">
          Tip #2: All Entity members must sign and date the form. Each member
          also should include their printed name and title.
        </Typography>
      </Box>
    </div>
  );
};

export default SignedDisclosureUpload;
