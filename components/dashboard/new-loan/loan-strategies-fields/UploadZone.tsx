import React, { useState } from "react";
import { Box, Typography, CircularProgress, IconButton } from "@mui/material";
import {  Delete } from "@mui/icons-material";
import { LuUploadCloud } from "react-icons/lu";
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique IDs

interface UploadedFile {
  fileName: string;
  fileId: string;
}

interface UploadZoneProps {
  title: string;
  onUploadComplete: (files: UploadedFile[]) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ title, onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        // Simulate API call or integration
        const newFileId = uuidv4(); // Generate a unique file ID
        const newFile = { fileName: file.name, fileId: newFileId };
        setUploading(false);
        setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
        onUploadComplete([...uploadedFiles, newFile]);
      } catch (error) {
        setUploading(false);
        console.error("File upload failed", error);
      }
    }
  };

  const handleDeleteFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter((file) => file.fileId !== fileId);
    setUploadedFiles(updatedFiles);
    onUploadComplete(updatedFiles);
  };

  return (
    <Box sx={{ mb: 4 }}>
         
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Upload any additional documents to support your loan inquiry.
      </Typography>
      <Box
        sx={{
          border: "2px dashed",
          borderColor: "grey.400",
          padding: 4,
          borderRadius: 2,
          textAlign: "center",
          position: "relative",
          cursor: "pointer",
          "&:hover": {
            borderColor: "grey.500",
          },
        }}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={uploading}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            cursor: "pointer",
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          {uploading ? (
            <CircularProgress />
          ) : (
            <LuUploadCloud className="w-10 h-10 text-gray-400" />
          )}
          <Typography variant="body1" fontWeight="bold">
            {uploading ? "Uploading..." : "Upload your document"}
          </Typography>
          {!uploading && (
            <Typography variant="body2" color="textSecondary">
              Drag and drop your file or click to upload
            </Typography>
          )}
        </Box>
      </Box>

      {/* List of Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
            Uploaded Documents:
          </Typography>
          {uploadedFiles.map((file) => (
            <Box
              key={file.fileId}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 1,
                border: "1px solid grey",
                borderRadius: 1,
                mb: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="body2">{file.fileName}</Typography>
              <IconButton onClick={() => handleDeleteFile(file.fileId)}>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UploadZone;
