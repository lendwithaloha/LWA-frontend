"use client";

import React from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Link,
} from "@mui/material";
import { Download, Delete } from "@mui/icons-material";
import FileUploadButton from "@/components/upload_button";
import ReusableButton from "@/components/common_btn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LockedAlert from "@/components/dashboard/loan/application/common/alert";
import { addDocument, DocumentType, markFormCompleted, removeDocument } from "@/store/slice/csm/applicationSlice";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';

const UploadHazardInsurance: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = "thirdPartyInfo";
  const subTabKey = "hazardInsurance";


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
      {/* Alert */}
      {isApplicationSubmitted && (
        <LockedAlert/>
      )}

      {/* Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-2">
        Upload your client’s Hazard Insurance
      </Typography>

      {/* Description */}
      <Typography variant="body1" className="text-gray-600 mb-6">
        Hazard Insurance that complies with the policy guidelines linked below
        is required to close your loan. Once you&apos;ve arranged for coverage,
        please upload a copy of your Hazard Insurance policy where the primary
        insured party is the borrower on the loan. The policy must list the Lend
        with Loha Mortgagee clause, the loan number, the premium and deductible
        amount, and the address of the home.
      </Typography>

      {/* Guidelines Link */}
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
        <FileUploadButton onChange={handleFileUpload} className="mt-4" />

        {/* Uploaded Files */}
        <List>
          {fields.uploadedDocuments.map((file:DocumentType,index:number) => (
            <ListItem
              key={index}
              className="border border-gray-300 rounded-md mb-2"
            >
              <ListItemText
                primary={file.name}
                secondary={`Uploaded ${file.uploadDate}`}
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
                  className="text-blue-600"
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

        {/* Save and Continue Button */}
        <div className="flex justify-start mt-6">
          <ReusableButton label="Save and Continue" onTap={handleCompleteTask} />
        </div>
      </Box>
    </div>
  );
};

export default UploadHazardInsurance;
