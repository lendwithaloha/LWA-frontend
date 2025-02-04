"use client";

import React from "react";
import {
 
  Typography,
  Box,
  Link,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { Download, Delete } from "@mui/icons-material";
import ReusableButton from "@/components/common_btn";
import FileUploadButton from "@/components/upload_button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import LockedAlert from "@/components/dashboard/loan/application/common/alert";
import { addDocument, DocumentType, markFormCompleted, removeDocument } from "@/store/slice/csm/applicationSlice";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const UploadClosingProtectionLetter: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = "thirdPartyInfo";
  const subTabKey = "uploadClosingProtectionLetter";


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
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      {/* Conditional Alert Display */}
      {isApplicationSubmitted && (
        <LockedAlert/>
      )}

      {/* Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-6">
        Now, upload the Closing Protection Letter
      </Typography>

      {/* Description */}
      <Typography variant="body1" className="text-gray-600 mb-4">
        The Closing Protection Letter should be obtained from the title provider
        per the Policy Guidelines download link, as seen below. The Closing
        Protection Letter should be uploaded here. It must be issued by the same
        title provider as the Preliminary Title Report.
        <br />
        <Link
          href="/application-docs/construction-holdback-process"
          target="_blank"
          className="text-blue-600 underline text-sm md:text-base"
        >
          Why do we need this?
        </Link>
      </Typography>

      {/* Review Guidelines */}
      <Typography variant="subtitle1" className="text-gray-800 mb-2">
        Review Our Guidelines:
      </Typography>
      
      <Link
        href="/application-docs/construction-holdback-process"
        target="_blank"
        className="text-blue-600 underline text-sm md:text-base"
      >
        Download Policy Guidelines
      </Link>

      {/* File Upload Section */}
      <Box
        component="form"
        className="space-y-4 max-w-3xl mx-0"
        noValidate
        autoComplete="off"
      >
        {/* File Upload Button */}
        <FileUploadButton onChange={handleFileUpload} className="mt-4" />

        {/* Uploaded Files List */}
        <List>
          {fields.uploadedDocuments.map((file:DocumentType,index:number) => (
            <ListItem
              key={index}
              className="border border-gray-300 rounded-md mb-2"
            >
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
      </Box>

      {/* Complete Task Button */}
      <div className="flex justify-start mt-6">
        <ReusableButton
          label="I’ve completed this task"
          onTap={handleCompleteTask}
        />
      </div>

      {/* Tips Section */}
      <Typography variant="h5" className="text-gray-800 mt-8 mb-4">
        Tips from Lend with Loha:
      </Typography>
      <Typography variant="body1" className="text-gray-600">
        <strong>Tip #1:</strong> The Closing Protection Letter should include
        specific details. The issuing title company, property address, coverage
        amount, seller&apos;s name, and borrower&apos;s name are needed.
      </Typography>
    </div>
  );
};

export default UploadClosingProtectionLetter;
