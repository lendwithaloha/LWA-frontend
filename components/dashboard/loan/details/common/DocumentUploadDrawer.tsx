import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  UploadFile,
  Visibility,
  Replay,
  Check,
  Close,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";

type Document = {
  label: string;
  requirements: string[];
};

type FileDetails = {
  name: string;
  url: string;
  submitted: boolean;
};

type Props = {
  documents: Document[];
  drawerOpen: boolean;
  onClose: () => void;
};

const DocumentUploadDrawer: React.FC<Props> = ({
  documents,
  drawerOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [uploadedFilesByTab, setUploadedFilesByTab] = useState<
    Record<number, FileDetails[]>
  >({});
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    setUploadedFilesByTab((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] || [],
    }));
  }, [activeTab]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const newFile = {
        name: file.name,
        url: URL.createObjectURL(file),
        submitted: false,
      };
      setUploadedFilesByTab((prev) => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), newFile],
      }));
    }
  };

  const handleFileSubmit = (fileName: string) => {
    setUploadedFilesByTab((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab]?.map((file) =>
        file.name === fileName ? { ...file, submitted: true } : file
      ),
    }));
  };

  const handleResetUpload = () => {
    setUploadedFilesByTab((prev) => ({
      ...prev,
      [activeTab]: [],
    }));
  };

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={onClose}
      PaperProps={{ sx: { width: isMobile ? "90%" : "50%" } }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            position: "absolute",
            top: 10,
            right: 20,
            width: "calc(100% - 40px)",
            zIndex: 1000,
          }}
        >
          <Button variant="contained" color="primary">
            Submit All
          </Button>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 8 }}>
          <List
            sx={{
              width: isMobile ? "100%" : "30%",
              borderRight: "1px solid #ddd",
            }}
          >
            {documents.map((doc, index) => (
              <ListItemButton
                key={index}
                selected={activeTab === index}
                onClick={() => setActiveTab(index)}
              >
                <ListItemText primary={doc.label} />
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ width: isMobile ? "100%" : "70%", padding: 3 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {documents[activeTab].label} Requirements:
            </Typography>
            <ul className="list-disc pl-5">
              {documents[activeTab].requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
              {uploadedFilesByTab[activeTab]?.length === 0 ? (
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
                uploadedFilesByTab[activeTab]?.map((file) => (
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
                      <IconButton href={file.url} target="_blank">
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
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DocumentUploadDrawer;
