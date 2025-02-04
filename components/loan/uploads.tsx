'use client';

import React, { useState } from 'react';
import { Box, Typography, List, ListItem, Link } from '@mui/material';
import { CloudUpload, Description } from '@mui/icons-material'; // Import Description icon for PDF files

// Define types for the document categories
interface Document {
  name: string;
}

interface DocumentCategories {
  loanDocuments: Document[];
  borrowerDocuments: Document[];
  guarantorDocuments: Document[];
}

const DocumentUploadPage: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<Document[]>([]);
  const [documents] = useState<DocumentCategories>({
    loanDocuments: [
      { name: 'Lease - 2617 Redwood Ave. - Tanisha Douglas - 250930 - 187.pdf' },
    ],
    borrowerDocuments: [
      { name: 'Entity Docs - 2617 Redwood ave. LLC - Cert of Organization.pdf' },
      { name: 'ACH - Voided Check - Capital One.pdf' },
    ],
    guarantorDocuments: [
      { name: 'ID - Drivers License - Semhar Woldeyesus - exp 320104.pdf' },
    ],
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file) => ({ name: file.name }));
      setSelectedFiles(fileArray);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, padding: 3, textAlign: 'left' }}>
      <Typography variant="h4" gutterBottom>
        Your loan files
      </Typography>

      {/* Upload Section */}
      <Box
        sx={{
          padding: 3,
          marginBottom: 2,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '2px dashed #d1d1d1', // Lighter dashed border color
          borderRadius: 2, // Rounded corners for the box
          textAlign: 'center',
        }}
      >
        <CloudUpload sx={{ fontSize: 40, marginBottom: 1 }} />
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Drop files here to upload
        </Typography>
        <Typography variant="body1">
          or{' '}
          <Link
            component="button"
            variant="body1"
            onClick={() => document.getElementById('file-input')?.click()}
            sx={{
              textDecoration: 'underline',
              color: 'primary.main',
              cursor: 'pointer',
            }}
          >
            choose files
          </Link>
        </Typography>
        <input
          type="file"
          id="file-input"
          hidden
          multiple
          onChange={handleFileChange}
        />
      </Box>

      {/* jump to */}
      <Box sx={{ padding: 2 }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'inline' }}>
        Jump to: {/* Bold label */}
      </Typography>
      <Link
        href="#loan-documents"
        sx={{ textDecoration: 'none', color: 'primary.main', cursor: 'pointer' }}
      >
        Loan Documents
      </Link>
      ,{/* Comma separator */}
      <Link
        href="#borrower-documents"
        sx={{ textDecoration: 'none', color: 'primary.main', cursor: 'pointer' }}
      >
        Borrower Documents
      </Link>
      ,{/* Comma separator */}
      <Link
        href="#guarantor-documents"
        sx={{ textDecoration: 'none', color: 'primary.main', cursor: 'pointer' }}
      >
        Guarantor Documents
      </Link>
    </Box>

      {/* Document Categories */}
      <Box sx={{ marginBottom: 3 }}>
        {Object.keys(documents).map((category, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              {category.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </Typography>
            <List sx={{ listStyleType: 'disc', marginLeft: 3 }}> {/* Add disc bullets */}
              {documents[category as keyof DocumentCategories].map((doc, i) => (
                <ListItem key={i}>
                  {/* Check if the document name ends with '.pdf' */}
                  {doc.name.toLowerCase().endsWith('.pdf') ? (
                    <>
                      <Description sx={{ fontSize: 20, marginRight: 1 }} /> {/* Document Icon */}
                      <Link
                        href={`#`} // You can link to the PDF if it&apos;s available online or link it to an actual URL
                        sx={{
                          textDecoration: 'underline',
                          color: 'primary.main',
                          cursor: 'pointer',
                        }}
                      >
                        {doc.name}
                      </Link>
                    </>
                  ) : (
                    <Typography variant="body1" component="span">
                      {doc.name}
                    </Typography>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>

      {/* Selected Files Section */}
      {selectedFiles.length > 0 && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Selected Files:</Typography>
          {selectedFiles.map((file, index) => (
            <Typography key={index} variant="body1">
              {file.name}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DocumentUploadPage;


