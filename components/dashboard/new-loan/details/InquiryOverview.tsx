import { Typography } from "@mui/material";

interface InquiryOverviewProps {
  propertyAddress: string;
  loanPurpose: string;
  investmentStrategy: string;
  loanAmount: string;
  loanTerm: string;
  dateCreated: string;
}

const InquiryOverview = ({
  propertyAddress,
  loanPurpose,
  investmentStrategy,
  loanAmount,
  loanTerm,
  dateCreated,
}: InquiryOverviewProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-gray-200">
    <div>
      <Typography variant="subtitle1" className="font-semibold">
        Property Address
      </Typography>
      <Typography>{propertyAddress}</Typography>
    </div>

    <div>
      <Typography variant="subtitle1" className="font-semibold">
        Loan Amount
      </Typography>
      <Typography>{loanAmount}</Typography>
    </div>

    <div>
      <Typography variant="subtitle1" className="font-semibold">
        Loan Term
      </Typography>
      <Typography>{loanTerm}</Typography>
    </div>

    <div>
      <Typography variant="subtitle1" className="font-semibold">
        Loan Purpose
      </Typography>
      <Typography>{loanPurpose}</Typography>
    </div>

    <div>
      <Typography variant="subtitle1" className="font-semibold">
        Investment Strategy
      </Typography>
      <Typography>{investmentStrategy}</Typography>
    </div>

    <div>
      <Typography variant="subtitle1" className="font-semibold">
        Date Created
      </Typography>
      <Typography>{dateCreated}</Typography>
    </div>
  </div>
);

export default InquiryOverview;
