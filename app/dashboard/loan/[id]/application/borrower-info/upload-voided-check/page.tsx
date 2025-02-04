"use client";

import React from "react";
import {
  Typography,
  Box,
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

const UploadVoidedCheck: React.FC = () => {
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
        Upload a voided check corresponding with your client’s bank statements
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        Please provide a voided check that corresponds with your client’s
        provided bank statements.
      </Typography>

      {/* File Upload Section */}
      <Box className="space-y-4 mb-6">
        <FileUploadButton onChange={handleFileUpload} />

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

      {/* Tips Section */}
      <Typography
        variant="h5"
        className="font-heading text-gray-800 mt-8 mb-4"
      >
        Tips from Lend with Loha:
      </Typography>
      <Typography variant="body2" className="text-gray-600">
        <strong>Tip #1:</strong> Your client’s monthly payments will be pulled
        from the account corresponding to the check. If the borrower prefers
        to have your monthly payments pulled from a different account, there
        may be additional documentation required to confirm the borrower has
        access to this account.
      </Typography>
    </div>
  );
};

export default UploadVoidedCheck;
