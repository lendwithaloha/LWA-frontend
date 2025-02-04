import { ArrowBackIos, Download } from "@mui/icons-material";
import { Button, Modal, Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import QuoteBoard from "./quote-board";
import RevisionModal from "../request-revision-modal";
import { EyeIcon } from "@heroicons/react/20/solid";
import QuoteOpenHistory from "../tabs/quote-open-history";

interface DocumentQuoteOpenProps {
  quotes: {
    id: number;
    version: string;
    documents: number;
    status?: string;
  };
  onBack: () => void;
}
type CustomDocument = {
  label: string;
  requirements: string[];
  submittedDate: string;
  status: "Pending" | "Approved" | "Feedback Given";
};
const DocumentQuoteOpen: React.FC<DocumentQuoteOpenProps> = ({
  quotes,
  onBack,
}) => {
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [isRevision, setRevision] = useState(false);
  const [history, setHistory] = useState<boolean>(false);
  const [selectedDoc, setSelectedDocs] = useState<CustomDocument>();
  // const handleAcceptQuote = () => {
  //   setModalOpen(true); // Open modal when Accept Quote button is clicked
  // };

  const handleCloseModal = () => {
    setModalOpen(false); // Close modal
  };

  const handleClose = () => {
    setRevision(false); // Close modal
  };
  const handleHistory = (selectedDoc: CustomDocument) => {
    setSelectedDocs(selectedDoc);
    setHistory(true);
  };
  if (history && selectedDoc) {
    return (
      <QuoteOpenHistory
        data={quotes}
        document={selectedDoc}
        onBack={() => setHistory(false)}
      />
    );
  }
  return (
    <div className="p-5 flex flex-col gap-3">
      <div className="flex justify-between ">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4 cursor-pointer mb-2">
            <div
              style={{
                width: 50,
                height: 50,
              }}
              className="bg-gray-200 flex items-center justify-center rounded p-2"
              onClick={onBack}
            >
              <ArrowBackIos
                className="text-center w-5 h-5"
                onClick={() => setHistory(false)}
              />
            </div>
            <Image
              src="/images/loan-icon.png"
              alt="File Icon"
              width={50}
              height={50}
            />
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-medium">Quote {quotes.id}</h3>
                <span className="px-2 py-0.5 bg-primaryColor text-white text-xs rounded-full">
                  v{quotes.version}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Reviewed on Jan 24, 205
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-2 py-2 bg-primaryColor text-white rounded">
              undo acceptance
            </button>
            <div className="bg-gray-300 p-2 rounded">
              <EyeIcon className="size-6" />
            </div>
            <div className="bg-gray-300 p-2 rounded">
              <Download />
            </div>
          </div>
        </div>

        {/* <div className="flex items-center justify-center gap-3">
            <Button variant="contained" onClick={handleAcceptQuote}>
              Accept Quote
            </Button>
            <IoEye className="text-[30px]" />
            <Download className="text-[30px]" />
          </div> */}
      </div>

      {/* <Button
        variant="contained"
        className="mt-2 self-start"
        onClick={() => setRevision(true)}
      >
        Request Revision
      </Button> */}

      <QuoteBoard handleHistory={(doc: CustomDocument) => handleHistory(doc)} />

      {/* Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
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
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>

      <RevisionModal isModalOpen={isRevision} handleCloseModal={handleClose} />
    </div>
  );
};

export default DocumentQuoteOpen;
