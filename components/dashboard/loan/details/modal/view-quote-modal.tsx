import { Download } from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import RevisionModal from "../request-revision-modal";

interface ViewQuoteModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const ViewQuoteModal: React.FC<ViewQuoteModalProps> = ({
  isModalOpen,
  handleCloseModal,
}) => {
  const [open, setOpen] = useState(false);
  const [accept, setAccept] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAccept = () => {
    setAccept(false);
  };
  return (
    <div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
              width: "90%",
              maxWidth: "900px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="flex items-center gap-3">
                <div>
                  <Image
                    src="/images/loan-icon.png"
                    alt="File Icon"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <Typography variant="h6" fontWeight="bold">
                    Quote 1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Received on Jan 24, 2024
                  </Typography>
                </div>
              </div>
              <div
                className="bg-gray-200 rounded-full text-black w-10 h-10 flex items-center justify-center"
                onClick={handleCloseModal}
              >
                X
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
                pt: 2,
              }}
            >
              <div className="flex gap-2 items-center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpen(true)}
                  sx={{ fontWeight: "bold" }}
                >
                  Request Revision{" "}
                </Button>

                <Download />
              </div>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontWeight: "bold" }}
                onClick={() => setAccept(true)}
              >
                Accept Quote
              </Button>
            </Box>

            {/* Content Section */}
            <Box
              sx={{
                overflowY: "auto",
                maxHeight: "500px",
                mb: 3,
                px: 2,
              }}
            >
              <Image
                src="/images/doc.jpeg"
                alt="Document"
                style={{
                  width: "100%",
                  borderRadius: "4px",
                }}
              />
            </Box>
          </Box>

          <RevisionModal handleCloseModal={handleClose} isModalOpen={open} />
        </div>
      </Modal>
      <Modal open={accept} onClose={handleCloseAccept}>
        <Box className="bg-white rounded shadow-md p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] mt-10 ">
          <div className="flex justify-center items-center ">
            <Image src="/images/done.png" alt="Done" width={40} height={40} />
          </div>
          <Typography variant="h6" className="text-center my-2 ">
            Thanks For accepting for the Quote
          </Typography>
          <Typography
            variant="h6"
            className="font-normal mt-3 text-center mb-3 text-gray-500 text-sm"
          >
            Your Quote has been successfully accepted our team will procced in
            the next steps loan proccess
          </Typography>

          <div className="flex justify-center mt-5">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseAccept}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewQuoteModal;
