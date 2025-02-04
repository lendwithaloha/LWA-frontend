"use client";

import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import {

  Typography,
  Grid,
  Box,

  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { LuUploadCloud } from "react-icons/lu";
import {
  documentCategories,
  faqs,
  loanDocumtFiles,
} from "@/utils/model/document.model";

import LoanDocument from "@/components/dashboard/loan/document/loan-documents";

export default function DocumentsPage() {


  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="flex flex-row bg-gray-50 max-sm:flex-col text-md ">
      <div
        className="flex-1 max-w-[1140px] md:mx-auto p-5  "
        {...getRootProps()}
      >
        <Grid item xs={12} md={8} className="my-5">
          <Typography gutterBottom className="my-6 text-3xl font-extralight">
            Your Loan Files
          </Typography>

          {/* File Upload Box */}
          <div className="border-[2px] font-bold  mb-6  text-2xl border-black max-w-[1100px] rounded-lg border-dashed mx-auto flex flex-col items-center justify-center py-6 px-10">
            <LuUploadCloud className="text-[80px] text-gray-200" />
            <input type="hidden" name="" {...getInputProps()} />
            {!isDragActive ? (
              <div className="text-center">
                <p className="text-center">Drop Your files here to upload </p>

                <p className="text-blue-600 font-bold">or choose file </p>
              </div>
            ) : (
              <p className="text-center">Drop Your files here </p>
            )}
          </div>
          {/*Jump To */}
          <div className="flex flex-wrap items-center text-center max-sm:">
            <p className="font-bold">Jump to: </p>
            {documentCategories.map((category, index) => (
              <div key={index} className="flex ml-2">
                <p className="underline cursor-pointer hover:text-blue-500 font-light">
                  {" "}
                  {category + ","}{" "}
                </p>
              </div>
            ))}
          </div>
          {/* Document Links */}
          {loanDocumtFiles.map((doc, index) => (
            <LoanDocument key={index} title={doc.title} names={doc.names} />
          ))}
        </Grid>
      </div>

      <Divider orientation="vertical" flexItem />

      <div className="p-7 max-w-[400px] ">
        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h6" gutterBottom>
              FAQ
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                disableGutters
                elevation={0}
                square
                sx={{
                  border: "none",
                  backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity))",
                  "&:before": {
                    display: "none",
                    // Removes the top divider line
                  },
                }}
              >
                <AccordionSummary
                  sx={{
                    padding: 0, // Remove padding from the summary
                    "& .MuiAccordionSummary-content": {
                      margin: 0, // Remove margin inside summary
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#1976d2",
                      textDecoration: "underline blue",
                      fontSize: "18px",
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: "0px" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      borderLeft: "2px solid #ccc",
                      paddingLeft: "14px",
                      fontSize: "18px",
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Grid>
      </div>
    </div>
  );
}
