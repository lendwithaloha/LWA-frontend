"use client";


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  Button,
  Typography,
  Box,
  Alert,
  Link,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {  Download, Delete } from "@mui/icons-material";
import FileUploadButton from "@/components/upload_button";
import { addDocument, DocumentType, markFormCompleted, removeDocument } from "@/store/slice/csm/applicationSlice";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';


const UploadSignedPurchaseContract: React.FC = () => {

  const dispatch = useDispatch();
  const tabKey = "propertyInfo";
  const subTabKey = "signedPurchaseContract";


  const { fields, isFormCompleted } = useSelector((state: RootState) => state.application.tabs[tabKey].subTabs[subTabKey]);
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
      {/* Alert */}
      {isApplicationSubmitted && (
        <Alert severity="info" className="mb-6">
          Loan Application fields are locked. Changes to your loan cannot be
          made because your loan has been fully approved by Underwriting.
        </Alert>
      )}

      {/* Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-6">
        Upload your client’s Purchase Contract
      </Typography>

      {/* Description */}
      <Typography variant="body1" className="text-gray-600 mb-4">
        Please upload a Purchase Contract with the exact same address and Buyer
        name as the submitted loan application.
        <br />
        <Link
        href="/application-docs/construction-holdback-process"
        target="_blank" // Open in a new tab
        className="text-blue-600 underline text-sm md:text-base"
      >
          Why do we need this?

      </Link>
      </Typography>

      {/* File Upload Section */}
      <Box
        component="form"
        className="space-y-4 max-w-3xl mx-0"
        noValidate
        autoComplete="off"
      >
        {/* File Upload Button */}
        <FileUploadButton onChange={handleFileUpload} />

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

      <div className="flex justify-start mt-6">

        <Button
          onClick={handleCompleteTask}
          variant="contained"
          color="primary"
          className="bg-primary hover:bg-primary-dark"
          disabled={isFormCompleted}
        >
          {isFormCompleted ? 'Task Completed' : 'I’ve completed this task'}
        </Button>

      </div>

      {/* Tips Section */}
      <Typography variant="h5" className="text-gray-800 mt-8 mb-4">
        Tips from Lend with Loha:
      </Typography>
      <Typography variant="body1" className="text-gray-600">
        <strong>Tip #1:</strong> Check for initials and signatures. The Purchase
        Contract must be fully executed with initials and signatures in all
        designated places, along with all of the contract pages and any
        additional addendums.
      </Typography>
    </div>
  );
};

export default UploadSignedPurchaseContract;
