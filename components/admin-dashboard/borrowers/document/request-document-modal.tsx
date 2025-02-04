"use client";

import { SetStateAction, useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Typography,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  TrashIcon as Trash2,
} from "@heroicons/react/20/solid";

import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
interface Requirement {
  id: string;
  text: string;
}

interface RequestDocumentDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    category: string;
    requirements: string[];
  }) => void;
}

export function RequestDocumentModal({
  open,
  onClose,
  onSubmit,
}: RequestDocumentDrawerProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const [next, setNext] = useState<boolean>(false);
  const onTabChange = (e: any, value: SetStateAction<number>) => {
    setTabIndex(value);
  };
  const onNextClose = () => {
    setNext(false);
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "30%" } }}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold">Requesting Document</h2>
        <IconButton onClick={onClose} aria-label="close drawer">
          <CloseIcon />
        </IconButton>
      </div>
      {next ? (
        <DocumentRequest onBack={onNextClose} />
      ) : (
        <div className="p-3 flex justify-center">
          <Tabs value={tabIndex} onChange={onTabChange}>
            <Tab label="Enter From System" />
            <Tab label="Enter Manually" />
          </Tabs>
        </div>
      )}
      {!next && tabIndex === 0 && (
        <>
          <DocumentSelection />
        </>
      )}{" "}
      {!next && tabIndex === 1 && (
        <Box
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Write list of required documents
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Enter the title of each required document on a separate line.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={5}
            placeholder={
              "Proof of Income\nProperty Tax Returns\nBank Statement (last 3 months)\nProof of Insurance"
            }
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={() => setNext(true)}
          >
            Next
          </Button>
        </Box>
      )}
    </Drawer>
  );
}

const DocumentRequest = ({ onBack }: { onBack: () => void }) => {
  const [documents, setDocuments] = useState([
    {
      id: "1",
      name: "Proof of Income",
      requirements: [{ id: "1", text: "" }],
      isExpanded: false,
    },
    {
      id: "2",
      name: "Property Tax Returns",
      requirements: [{ id: "1", text: "" }],
      isExpanded: false,
    },
    {
      id: "3",
      name: "Bank Statement",
      requirements: [{ id: "1", text: "" }],
      isExpanded: false,
    },
    {
      id: "4",
      name: "Proof of Insurance",
      requirements: [{ id: "1", text: "" }],
      isExpanded: false,
    },
  ]);

  const [isAllExpanded, setIsAllExpanded] = useState(false);

  const handleAddRequirement = (documentId: string) => {
    setDocuments(
      documents.map((doc) => {
        if (doc.id === documentId) {
          return {
            ...doc,
            requirements: [
              ...doc.requirements,
              { id: crypto.randomUUID(), text: "" },
            ],
          };
        }
        return doc;
      })
    );
  };

  const toggleAllDocuments = () => {
    const newExpandedState = !isAllExpanded;
    setIsAllExpanded(newExpandedState);
    setDocuments(
      documents.map((doc) => ({
        ...doc,
        isExpanded: newExpandedState,
      }))
    );
  };

  const toggleDocument = (documentId: string) => {
    setDocuments(
      documents.map((doc) => {
        if (doc.id === documentId) {
          return { ...doc, isExpanded: !doc.isExpanded };
        }
        return doc;
      })
    );
  };

  return (
    <div className="w-full mx-auto p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <IconButton onClick={onBack}>
            <ChevronLeftIcon className="size-6" />
          </IconButton>

          <span className="text-sm">Requesting 4 documents</span>
        </div>
        <button
          className="text-sm flex items-center gap-1"
          onClick={toggleAllDocuments}
        >
          {isAllExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="space-y-6">
        {documents.map((doc) => (
          <div key={doc.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={doc.name}
                className="flex-1 p-2 rounded-lg border border-gray-200 text-gray-600"
                readOnly
              />
              <button className="text-gray-500">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleDocument(doc.id)}
              >
                <span className="text-sm text-gray-600">
                  Document Requirements (optional)
                </span>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform ${
                    doc.isExpanded ? "transform rotate-180" : ""
                  }`}
                />
              </div>

              {doc.isExpanded && (
                <div className="mt-2 space-y-2">
                  {doc.requirements.map((req) => (
                    <div key={req.id} className="flex items-center gap-2">
                      {/* <span className="text-sm text-gray-500">{req.id}</span> */}
                      <input
                        type="text"
                        className="flex-1 p-2 rounded-lg border border-gray-200"
                        placeholder=""
                      />
                      <button className="text-gray-500">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => handleAddRequirement(doc.id)}
                    className="w-full py-3 bg-gray-50 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    + Add requirements
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 bg-primaryColor text-white rounded-lg">
        Send Request
      </button>
    </div>
  );
};

const DocumentSelection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState([
    {
      id: "1",
      title: "2 Months most recent bank statement",
      isSelected: false,
    },
    {
      id: "2",
      title: "Active Property Profile",
      isSelected: false,
    },
    {
      id: "3",
      title: "Annual Report",
      isSelected: false,
    },
    {
      id: "4",
      title: "Appraisal",
      isSelected: false,
    },
    {
      id: "5",
      title: "Articles of Organization",
      isSelected: false,
    },
  ]);

  const toggleDocument = (id: string) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === id ? { ...doc, isSelected: !doc.isSelected } : doc
      )
    );
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box bgcolor="white" padding={2}>
      <div className="bg-gray-100 p-2 text-center mx-auto ">
        <Typography variant="subtitle1" fontWeight="medium">
          Document Title
        </Typography>
      </div>

      <Box mt={2} position="relative">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon color="action" style={{ marginRight: 8 }} />
            ),
          }}
        />

        <List sx={{ mt: 2 }}>
          {filteredDocuments.map((doc) => (
            <ListItem
              key={doc.id}
              component="li"
              onClick={() => toggleDocument(doc.id)}
              sx={{
                "&:hover": { backgroundColor: "gray.100" },
                borderRadius: 1,
              }}
            >
              <Checkbox
                checked={doc.isSelected}
                onChange={() => {}}
                sx={{ marginRight: 2 }}
              />
              <ListItemText primary={doc.title} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <ExpandMoreIcon color="action" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      <Button fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
        Next
      </Button>
    </Box>
  );
};

export default DocumentSelection;
