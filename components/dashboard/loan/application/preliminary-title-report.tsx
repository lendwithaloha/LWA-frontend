'use client';

import React from 'react';
import { Typography, Box, Link, Button, Alert } from '@mui/material';

const UploadPrelimTitle: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12">
  
          <Alert severity="info" className="mb-6">
        Loan Application fields are locked. Changes to your loan cannot be made
        because your loan has been fully approved by Underwriting.
      </Alert>
       

      {/* Title */}
      <Typography variant="h5" className="text-gray-800 mb-4">
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
        target="_blank" // Open in a new tab
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
        target="_blank" // Open in a new tab
        className="text-blue-600 underline text-sm md:text-base"
      >
        Download Policy Guidelines

      </Link>

      {/* Uploaded Files */}
      <Box className="space-y-4 mb-6">
        {[
          {
            name: 'Title_-_Supplemental_PIL_-_240820.pdf',
            date: '2024-08-20',
          },
          {
            name: 'Title_-_Prelim_-_240820.pdf',
            date: '2024-08-20',
          },
        ].map((file, index) => (
          <Box
            key={index}
            className="flex justify-between items-center bg-white p-3 rounded-lg border"
          >
            <Typography className="text-gray-800">{file.name}</Typography>
            <Typography className="text-gray-500 text-sm">
              uploaded {file.date}
            </Typography>
            <Button
              variant="text"
              color="primary"
              className="text-primary hover:underline"
            >
              Download
            </Button>
          </Box>
        ))}
      </Box>

      {/* Action Button */}
      <Button
        variant="contained"
        color="primary"
        className="bg-primary hover:bg-primary-dark mb-8"
      >
        I’ve completed this task
      </Button>

      {/* Tips Section */}
        <Typography variant="h6" className="text-gray-800 mt-8 mb-4">
          Tips from Lend with Loha:
        </Typography>
        <Typography variant="body2" className="text-gray-600">
          <strong>Tip #1:</strong> Property ownership must be listed as “Fee
          Simple” or “Fee”. The correct Lend with Loha mortgagee clause must be listed as
          the “Proposed Insured” or “Mortgagee”.
        </Typography>
      </div>
  );
};

export default UploadPrelimTitle;
