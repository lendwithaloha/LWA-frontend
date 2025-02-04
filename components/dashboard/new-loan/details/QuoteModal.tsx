import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { IoCloseCircleOutline } from "react-icons/io5";

interface QuoteDetailsModalProps {
  open: boolean;
  onClose: () => void;
  quote: Quote | null;
}

interface Quote {
  id: number;
  title: string;
  interestRate: string;
  monthlyPayment: string;
  loanTerm: string;
  quoteDate: string;
  isSaved: boolean;
}

// const modalStyle = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   display: "flex",
//   gap: 4,
//   justifyContent: "center",
//   alignItems: "center",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 7,
//   width: "max-content",
//   borderRadius: 2,
// };

const QuoteDetailsModal: React.FC<QuoteDetailsModalProps> = ({
  open,
  onClose,
  quote,
}) => {
  if (!quote) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          maxWidth: 600,
          width: "100%",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold">
            Quote Details
          </Typography>
          <IconButton onClick={onClose} aria-label="Close">
            <IoCloseCircleOutline />
          </IconButton>
        </Box>

        {/* Content */}
        <Box display="flex" flexDirection="row" mb={3}>
          <Box
            sx={{
              width: 120,
              height: 120,
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginRight: 2,
            }}
          >
            {/* Placeholder for image */}
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {quote.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Interest Rate: <b>{quote.interestRate}</b>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Monthly Payment Estimate: <b>{quote.monthlyPayment}</b>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Loan Term: <b>{quote.loanTerm}</b>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Quote Date: <b>{quote.quoteDate}</b>
            </Typography>
          </Box>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)" }}
          gap={2}
          mb={3}
        >
          {/* Items here */}
          
            <Box>
              <Typography variant="body2" fontWeight="bold">
                $1,200
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Origination Fees
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight="bold">
                $500
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Other Fees
              </Typography>
            </Box>

            <Box>
                <Typography variant="body2" fontWeight="bold">
                  $1,200
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Down Payment
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  720+
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Credit Score Required
                </Typography>
              </Box>
      </Box>

        

            {/* Actions */}
            <Box display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={onClose}>
                Save for Later
              </Button>
              <Button variant="contained" color="primary">
                Apply Now
              </Button>
            </Box>
          </Box>
        </Modal>
        );
};

        export default QuoteDetailsModal;
