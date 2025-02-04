'use client';

import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What are these files?",
    answer: "These are documents related to your loan application. Please ensure all required files are uploaded for verification."
  },
  {
    question: "Who has access to these?",
    answer: "Only the authorized personnel handling your loan application will have access to these files."
  },
  {
    question: "What are the different tabs?",
    answer: "The tabs represent different categories of documents required for your loan application, including loan documents, borrower documents, and guarantor documents."
  },
  {
    question: "Do I have to classify my files?",
    answer: "Yes, please upload your documents under the appropriate categories for efficient processing."
  },
  {
    question: "Are my files safe?",
    answer: "Yes, your files are stored securely with encryption and are only accessible by authorized personnel."
  },
];

const FAQs: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 900, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>

      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQs;
