"use client";


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import {  Download, Delete, Folder } from "@mui/icons-material";
import FileUploadButton from "@/components/upload_button";
import { addDocument, DocumentType, markFormCompleted, removeDocument } from "@/store/slice/csm/applicationSlice";
import LockedAlert from '@/components/dashboard/loan/application/common/alert';
import { updateSubTabProgress } from '@/store/slice/csm/userSlice';


const UploadPropertyPhotos: React.FC = () => {
  const dispatch = useDispatch();
  const tabKey = "propertyInfo";
  const subTabKey = "propertyPhoto";


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
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      {/* Alert */}
      {isApplicationSubmitted && (<LockedAlert />
      )}

      {/* Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-6">
        Upload Pictures
      </Typography>

      {/* Description */}
      <Typography variant="body1" className="text-gray-600 mb-4">
        In order to have the best experience, we strongly encourage you to
        provide photos of the property that are no more than 6 months old.
        Providing photos can yield a faster and more accurate valuation,
        expedite the draw process.
      </Typography>
      <Typography variant="body2" className="text-gray-500 mb-4">
        Recommended Photos:
        <br />
        Kitchen (2-3) <br />
        Bedroom(s) (1 each) <br />
        Bathroom(s) (1 each) <br />
        Front of house (1) <br />
        Back of house (1) <br />
        Sides of house (1 each) <br />
        General
      </Typography>

      {/* File Upload Section */}
      <Box
        component="form"
        className="space-y-4 max-w-3xl mx-0"
        noValidate
        autoComplete="off"
      >
        {/* Upload Button */}
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
      </Box>

      {/* Complete Task Button */}
      <div className="flex justify-start mt-6">

        <Button
          onClick={handleCompleteTask}
          variant="contained"
          color="primary"
          className="bg-primary hover:bg-primary-dark"
        >
          I’ve completed this task
        </Button>

      </div>
    </div>
  );
};

export default UploadPropertyPhotos;
