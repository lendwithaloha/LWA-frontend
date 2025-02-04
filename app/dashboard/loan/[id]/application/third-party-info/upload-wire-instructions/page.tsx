"use client";

import React from "react";
import {
  Typography,
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Download, Delete } from "@mui/icons-material";
import ReusableButton from "@/components/common_btn";
import FileUploadButton from "@/components/upload_button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addDocument, DocumentType, markFormCompleted, removeDocument } from "@/store/slice/csm/applicationSlice";
import LockedAlert from "@/components/dashboard/loan/application/common/alert";
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';


const UploadWireInstruction: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = "thirdPartyInfo";
  const subTabKey = "wireInstruction";

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
      {isApplicationSubmitted && (
       <LockedAlert/>
      )}

      {/* Title */}
      <Typography variant="h5" className="font-heading text-gray-800 mb-4">
        Now, upload the Wire Instructions
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        The Wire Instructions should be obtained from the title provider per the
        Policy Guidelines download link, as seen below. Wire Instructions should
        be uploaded here. It must be issued by the same title provider as the
        Preliminary Title Report.
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
      <ReusableButton label="I’ve completed this task" onTap={handleCompleteTask} />

      {/* Tips Section */}
      <Typography variant="h5" className="font-heading text-gray-800 mt-8 mb-4">
        Tips from Lend with Loha:
      </Typography>
      <Typography variant="body2" className="text-gray-600">
        <strong>Tip #1:</strong> The Wire Instructions should include specific
        details. The beneficiary name, ABA/routing number, account number, and
        beneficiary address are required.
      </Typography>
    </div>
  );
};

export default UploadWireInstruction;
