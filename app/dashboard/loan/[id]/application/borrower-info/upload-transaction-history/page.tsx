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
import LockedAlert from "@/components/dashboard/loan/application/common/alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addDocument, DocumentType, markFormCompleted, removeDocument } from "@/store/slice/csm/applicationSlice";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const UploadTransactionHistory: React.FC = () => {
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
      {isApplicationSubmitted && <LockedAlert />}

      {/* Title */}
      <Typography variant="h5" className="font-heading text-gray-800 mb-4">
        Next, fill out your Experience Verification Sheet
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        Please complete the experience sheet and tell us about the investment
        property flips you have completed in the past 24 months. For our
        purposes, a completed flip meets the following criteria:
      </Typography>
      <ul className="text-gray-600 mb-6 list-disc ml-6">
        <li>
          The property must have been owned for more than 30 days, but for less
          than 36 months, and sold or converted into a rental property in the
          last 24 months.
        </li>
        <li>
          The sale price of the property must have been greater or equal to
          $50,000.
        </li>
      </ul>

      {/* Example Documents */}
      <Typography variant="subtitle1" className="text-gray-800 mb-2">
        Example Documents:
      </Typography>
      <Link
        href="/application-docs/construction-holdback-process"
        target="_blank"
        className="text-blue-600 underline text-sm md:text-base"
      >
        Sample project experience template
      </Link>

      {/* File Upload Section */}
      <Box className="space-y-4 mb-6">
        <FileUploadButton onChange={handleFileUpload} className="mt-4" />

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

      {/* Submit Button */}
      <ReusableButton label="I’ve completed this task" onTap={handleCompleteTask} />
    </div>
  );
};

export default UploadTransactionHistory;
