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
import { addDocument, DocumentType, markFormCompleted, removeDocument } from "@/store/slice/csm/applicationSlice";
import LockedAlert from "@/components/dashboard/loan/application/common/alert";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const UploadPrelimTitle: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = "thirdPartyInfo";
  const subTabKey = "perlimTitle";

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
      {/* Conditional Alert Display */}
      {isApplicationSubmitted && (
        <LockedAlert/>
      )}

      {/* Title */}
      <Typography variant="h5" className="font-heading text-gray-800 mb-4">
        Now, upload the Preliminary Title Report
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        The specific requirements for the Preliminary Title Report can be found
        in the Policy Guidelines download link, as seen below. The Preliminary
        Title Report should be uploaded here. It must be issued by the same
        title provider listed on the Closing Protection Letter.
      </Typography>
      <Link
        href="/application-docs/construction-holdback-process"
        target="_blank"
        className="text-blue-600 underline text-sm md:text-base"
      >
        Why do we need this?
      </Link>

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

      {/* Action Button */}
      <ReusableButton
        label="I’ve completed this task"
        onTap={handleCompleteTask}
      />

      {/* Tips Section */}
      <Typography variant="h5" className="font-heading text-gray-800 mt-8 mb-4">
        Tips from Lend with Loha:
      </Typography>
      <Typography variant="body2" className="text-gray-600">
        <strong>Tip #1:</strong> Property ownership must be listed as “Fee
        Simple” or “Fee”. The correct Lend with Loha mortgagee clause must be
        listed as the “Proposed Insured” or “Mortgagee”.
      </Typography>
    </div>
  );
};

export default UploadPrelimTitle;
