import React, { useState } from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { UploadFile, Visibility, Replay, Check } from "@mui/icons-material";

type FileDetails = {
  name: string;
  url: string;
  submitted: boolean;
};

type FileUploaderProps = {
  onFileUpload?: (file: FileDetails) => void;
  onFileSubmit?: (fileName: string) => void;
};

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUpload,
  onFileSubmit,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<FileDetails[]>([]);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const newFile: FileDetails = {
        name: file.name,
        url: URL.createObjectURL(file),
        submitted: false,
      };
      setUploadedFiles((prev) => [...prev, newFile]);
      onFileUpload?.(newFile);
    }
  };

  const handleFileSubmit = (fileName: string) => {
    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.name === fileName ? { ...file, submitted: true } : file
      )
    );
    onFileSubmit?.(fileName);
  };

  const handleResetUpload = () => {
    setUploadedFiles([]);
  };

  const handlePreview = (fileUrl: string) => {
    setPreviewFile(fileUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setPreviewFile(null);
    setIsModalOpen(false);
  };

  return (
    <Box>
      {/* Modal for File Preview */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: { xs: "0", md: "700px", lg: "1100px" },
            maxHeight: "100vh",
            overflow: "auto",
            display: { xs: "none", md: "block" },
          }}
        >
          {previewFile ? (
            <iframe
              src={previewFile}
              title="File Preview"
              width="100%"
              height="600px"
              style={{ border: "none" }}
            />
          ) : (
            <Typography variant="body1">No file to preview</Typography>
          )}
        </Box>
      </Modal>

      {/* File Upload Section */}
      {uploadedFiles.length === 0 ? (
        <label className="block border-2 border-dashed border-gray-400 rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50">
          <input
            type="file"
            style={{ display: "none" }}
            accept=".pdf,.docx,.png,.jpg"
            onChange={handleFileUpload}
          />
          <UploadFile />
          <p>Upload your document</p>
        </label>
      ) : (
        uploadedFiles.map((file) => (
          <Box
            key={file.name}
            className="relative border rounded p-4 mb-2 flex flex-col"
          >
            {file.submitted && (
              <span className="absolute top-2 right-2 text-primaryColor flex items-center gap-1 border p-1 rounded-md bg-gray-50">
                <Check /> Submitted
              </span>
            )}
            <span className="font-medium">{file.name}</span>
            <Box className="flex gap-2 mt-2">
              <IconButton onClick={() => handlePreview(file.url)}>
                <Visibility />
              </IconButton>
              <IconButton onClick={handleResetUpload}>
                <Replay />
              </IconButton>
              {!file.submitted && (
                <Button
                  onClick={() => handleFileSubmit(file.name)}
                  variant="contained"
                >
                  Submit
                </Button>
              )}
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default FileUploader;
