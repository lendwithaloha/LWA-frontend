import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FileUploader from "../common/file-uploader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type CustomDocument = {
  label: string;
  requirements: string[];
  submittedDate: string;
  status: "Pending" | "Approved" | "Feedback Given";
};

const PendingComponent = ({ data }: { data: CustomDocument[] }) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const handleChange = (accordionIndex: number | null) => {
    setActiveAccordion(
      activeAccordion === accordionIndex ? null : accordionIndex
    );
  };

  return (
    <div className="p-3 bg-gray-100 rounded">
      {data.map((item, index) => (
        <Accordion
          key={index}
          expanded={activeAccordion === index}
          onChange={() => handleChange(index)}
          className="mt-5 rounded bg-transparent shadow-none border-0"
          sx={{ "&:before": { display: "none" } }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="border-0"
          >
            <Typography className="text-sm font-medium">
              {item.label}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FileUploader
              onFileSubmit={(fileName) =>
                console.log(`File ${fileName} submitted for ${item.label}`)
              }
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default PendingComponent;
