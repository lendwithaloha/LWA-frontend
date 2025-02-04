

import { randomUUID } from "crypto";
import { ReactNode } from "react";
import { TermLoanData } from "./model/term.model";
import { CiDollar } from 'react-icons/ci';
import { SlCalender } from 'react-icons/sl';
import { AiOutlinePercentage } from 'react-icons/ai';
import { TbCash } from 'react-icons/tb';
import { Team } from "./model/team.model";

type ApplicationDetail = {
  label: string;
  value: string;
};
interface ToDoItem {
  title: string;
  status: "Accepted" | "Being Reviewed";
  date: string;
}

interface Section {
  name: string;
  items: ToDoItem[];
}

  
 
  export type CallRequestDetail = {
    label: string;
    buttonText: string;
  };
  
  //
  export type AdditionalLoanDetail = {
    label: string;
    value: string;
  };
type ApplicationAction = {
  label: string;
  link: string;
  onClick?: () => void;
};

type LoanChecklistItem = {
  name: string;
  status: "In Progress" | "Not Started" | "Submitted" | "Completed",
  statusColor:number;
};

type SigningStatus = {
  estimatedSigningDate: {
    month: string;
    day: string;
    message: string;
    contact: string;
    phone: string;
  };
  estimatedFundingDate: {
    month: string;
    day: string;
    message: string;
  };

};

export type Application = {
  id: string;
  title: string;
  address: string;
  link: string;
  description: string;
  details: ApplicationDetail[];
  actions: ApplicationAction[];
  loanChecklist: LoanChecklistItem[];
  signingStatus: SigningStatus;
  documentData?: Section[];
  terms?:TermLoanData[]
  team:Team;
};

export const dummyData: Application[] = [
  {
    id: "one",
    title: "On Track one: 1 Loan Application",
    address: "2517 RED WOOD AVE, Richmond, VA 2003, USA",
    link: "/dashboard/loan/id",
    description: "Application 1 rental",
    team: {
        teamMember:[
            { name: "Michael Rico", role: "Account Manager", email: "michael.rico@lwa.com" },
            { name: "Sarah Patel", role: "Loan Officer", email: "sarah.patel@lwa.com" },
        ],
        message:[
            {
                sender: "Michael Rico",
                timestamp: "11/20/2024, 2:32:00 PM",
                content: "Please review the updated documentation.",
              },
              {
                sender: "Teresa Pasiak",
                timestamp: "11/19/2024, 10:15:00 AM",
                content: "The closing process is on track for the planned date.",
              },
              {
                sender: "Sarah Patel",
                timestamp: "11/18/2024, 9:05:00 AM",
                content: "We received the preliminary approval from the underwriter.",
              },
        ],
        thirdPartyContact:[
            { name: "Mike Rybinski", role: "Insurance", email: "mike.rybinski@insurance.com" },
            { name: "Teresa Pasiak", role: "Closing", email: "teresa.pasiak@closing.com" },
        ]
    }
    ,
    details: [
      { label: "Loan Number", value: "3264647" },
      { label: "Borrower", value: "2517 Red wood ave.LLC" },
      { label: "Target signing date", value: "12/16/2024" },
      { label: "Contact", value: "Mickael" },
      { label: "Phone", value: "415-251-6415" },
      { label: "Email", value: "mikael@gmail.com" },
    ],
    actions: [
      {
        label: "Download pre qualification letter",
        link: "/dashboard/loan/id/letter",
        onClick: () => console.log("Downloading letter..."),
      },
      {
        label: "View Terms",
        link: "/dashboard/loan/id/terms",
      },
      {
        label: "Contact my team",
        link: "/dashboard/loan/id/contact",
        onClick: () => console.log("Contacting team..."),
      },
    ],
    loanChecklist: [
      { name: "General Information", status: "Completed", statusColor: 1 },
      { name: "Property Information", status: "Completed", statusColor: 1 },
      { name: "Rehab Information", status: "Completed", statusColor: 1 },
      { name: "Third-Party Information", status: "Completed", statusColor: 1 },
      { name: "Borrower Information", status: "Completed", statusColor: 1 },
      { name: "Guarantor Information", status: "Completed", statusColor: 1 },
      { name: "Agreements", status: "Completed", statusColor: 1 },
      { name: "Draw One", status: "In Progress", statusColor: 2 },
      { name: "Draw Two", status: "In Progress", statusColor: 2 },
      { name: "Draw Three", status: "Completed", statusColor: 1 },
      { name: "Draw Four", status: "In Progress", statusColor: 2 },
      { name: "Draw Five", status: "In Progress", statusColor: 2 },
      { name: "Draw Six", status: "In Progress", statusColor: 2 },
      { name: "Draw Seven", status: "In Progress", statusColor: 2 },
      { name: "Draw Eight", status: "In Progress", statusColor: 2 },
      { name: "Draw Nine", status: "Not Started", statusColor: 3 },
    ],
    signingStatus: {
      estimatedSigningDate: {
        month: "Dec",
        day: "16",
        message:
          "Your Signing is estimated for December 16 contact your attorney or closing agent to schedule your signing appointment",
        contact: "Tresa Pisiak",
        phone: "251-345-3566",
      },
      estimatedFundingDate: {
        month: "Dec",
        day: "16",
        message:
          "You should fund within a day completing any outstanding tasks promptly will increase your ability to sign on this date",
      },
    },
    documentData: [
      {
        name: "Loan Related Documents",
        items: [
          {
            title: "ACH Consent Form",
            status: "Accepted",
            date: "October 7, 2024, 09:39 AM",
          },
          {
            title: "Appraisal Details",
            status: "Accepted",
            date: "October 15, 2024, 02:08 PM",
          },
          {
            title: "New Document Example",
            status: "Being Reviewed",
            date: "November 1, 2024, 11:00 AM",
          },
        ],
      },
      {
        name: "Additional Borrower Review",
        items: [
          {
            title: "Document 1",
            status: "Accepted",
            date: "November 7, 2024, 10:00 AM",
          },
        ],
      },
      {
        name: "Identification Documents",
        items: [
          {
            title: "Driver&apos;s License",
            status: "Accepted",
            date: "October 12, 2024, 12:00 PM",
          },
          {
            title: "Social Security Card",
            status: "Being Reviewed",
            date: "October 30, 2024, 10:15 AM",
          },
        ],
      },
      {
        name: "Legal Documents",
        items: [
          {
            title: "Loan Agreement",
            status: "Accepted",
            date: "October 14, 2024, 02:45 PM",
          },
          {
            title: "Power of Attorney",
            status: "Being Reviewed",
            date: "November 5, 2024, 11:20 AM",
          },
        ],
      },
    ],
    terms: [
      {
        
        loanOptions: [
          {
            loanToValue: 50,
            totalLoan: 145000,
            rate: 6.85,
            monthlyPayment: 915.65,
            term: 360,
            status:1
          },
          {
            loanToValue: 55,
            totalLoan: 160000,
            rate: 6.95,
            monthlyPayment: 1023.45,
            term: 180,
            status:1
          },
          {
            loanToValue: 60,
            totalLoan: 178000,
            rate: 7.05,
            monthlyPayment: 1210.5,
            term: 30,

status:0          },
          {
            loanToValue: 65,
            totalLoan: 185000,
            rate: 7.2,
            monthlyPayment: 1285.75,
            term: 15,

status: 0       },
          {
            loanToValue: 70,
            totalLoan: 200000,
            rate: 7.35,
            monthlyPayment: 1390.45,
            term: 365,
            status:1
          },
        ],
        
        loanDetails:[
            { icon: CiDollar, label: "Loan Amount", value: "$210,000:00" },
            { label: "Initial Loan Amount", value: "$210,000:00" },
            { label: "As-is-value", value: "$280,000:00" },
            { label: "Loan-to-value", value: "75%" },
            { label: "DSCR", value: "1.23" },
            { icon: SlCalender , label: "Monthly Principal and Interest", value: "$1432.57" },
            { icon: AiOutlinePercentage , label: "Interest rate", value: "7.250%" },
            { icon: TbCash , label: "Cash Required at Closing", value: "" },
            { label: "Origination fee", value: "$4200:00 (2%)" },
            { label: "Service fee", value: "$1999:00" },
            { label: "Pro Rated Interest", value: "$676.67:00" },
            { label: "Third party", value: "Contact Closing agent" },
          ],
          
        monthlyPaymentAndInterest: 1520.9,
        interestRate: 7.5,
        cashRequiredAtClosing: {
          originationFee: 4400.0,
          serviceFee: 2050.0,
          proRatedInterest: 710.45,
          thirdPartyFee: "Contact Closing Agent",
        },
        brokerCompensation: [  { icon:CiDollar , label: "Broker Compensation", value: "$4200.00" },
        { label: "Total comp", value: "$4400.00" },
        { label: "YSP Comp", value: "$500.00" },
        { label: "Broker Point", value: "$3500.00" },
        { label: "Broker Admin Fee", value: "$0.00" }],
        documents: [
          {
            name: "Pre Qualification Letter",
            downloadLink: "/path-to-pre-qualification-letter-1",
          },
          {
            name: "Loan Summary",
            downloadLink: "/path-to-loan-summary-1",
          },
          {
            name: "Amortization Schedule",
            downloadLink: "/path-to-amortization-schedule-1",
          },
        ],
        relationshipManager: {
          name: "Emily Grant",
          phone: "555-123-4567",
        },
        additionalDetail:[
            { label: "Borrower Name", value: "1234 Maple Leaf, LLC" },
            { label: "Property Address", value: "1234 Maple Leaf St, Denver, CO, 80202" },
            { label: "Loan Term", value: "25 Years" },
            { label: "Loan Type", value: "Adjustable-Rate" },
            { label: "Amortization Period", value: "300 Months" },
            { label: "Pre-Payment", value: "None after year 3; 3% first year; 2% second year; 1% third year" },
            { label: "Preferred Closing Date", value: "03/01/2025" },
            { label: "Purpose", value: "Purchase" },
            { label: "Lien", value: "2nd" },
            { label: "Property Type", value: "Condo" },
            { label: "Home Occupancy", value: "Owner Occupied" },
        ]
      },
      
    ],

  },
  {
    id: "two",
    title: "On Track two: Loan Application",
    address: "101 Ocean View, Miami, FL 33101, USA",
    link: "/dashboard/loan/id",
    description: "Application 2 rental",
    details: [
      { label: "Loan Number", value: "982341" },
      { label: "Borrower", value: "Ocean View Properties LLC" },
      { label: "Target signing date", value: "01/10/2025" },
      { label: "Contact", value: "John Doe" },
      { label: "Phone", value: "305-123-4567" },
      { label: "Email", value: "johndoe@gmail.com" },
    ],  team: {
        teamMember:[
            { name: "Emily Rogers", role: "Client Relations", email: "emily.rogers@lwa.com" },
        ],
        message:[
            {
                sender: "Emily Rogers",
                timestamp: "11/16/2024, 1:45:00 PM",
                content: "Please reach out to me if you have any questions about the loan process.",
              },
              {
                sender: "Chris Foster",
                timestamp: "11/15/2024, 11:00:00 AM",
                content: "We&apos;ve reviewed the risk analysis and everything seems in order.",
              },
        ],
        thirdPartyContact:[
            { name: "Olivia Davis", role: "Title Officer", email: "olivia.davis@title.com" },
        ]
    }
    ,
    actions: [
      {
        label: "Download pre qualification letter",
        link: "/dashboard/loan/id/letter",
        onClick: () => console.log("Downloading letter..."),
      },
      {
        label: "View Terms",
        link: "/dashboard/loan/id/terms",
      },
      {
        label: "Contact my team",
        link: "/dashboard/loan/id/contact",
        onClick: () => console.log("Contacting team..."),
      },
    ],
    loanChecklist: [
      { name: "General Information", status: "Completed", statusColor: 1 },
      { name: "Property Information", status: "Completed", statusColor: 1 },
      { name: "Rehab Information", status: "Completed", statusColor: 1 },
      { name: "Third-Party Information", status: "Completed", statusColor: 1 },
      { name: "Borrower Information", status: "Completed", statusColor: 1 },
      { name: "Guarantor Information", status: "Completed", statusColor: 1 },
      { name: "Agreements", status: "Completed", statusColor: 1 },
      { name: "Draw One", status: "In Progress", statusColor: 2 },
      { name: "Draw Two", status: "In Progress", statusColor: 2 },
      { name: "Draw Three", status: "Completed", statusColor: 1 },
      { name: "Draw Four", status: "In Progress", statusColor: 2 },
      { name: "Draw Five", status: "In Progress", statusColor: 2 },
      { name: "Draw Six", status: "In Progress", statusColor: 2 },
      { name: "Draw Seven", status: "In Progress", statusColor: 2 },
      { name: "Draw Eight", status: "In Progress", statusColor: 2 },
      { name: "Draw Nine", status: "Not Started", statusColor: 3 },
    ],
    signingStatus: {
      estimatedSigningDate: {
        month: "Jan",
        day: "10",
        message:
          "Your Signing is estimated for January 10 contact your attorney or closing agent to schedule your signing appointment",
        contact: "Tresa Pisiak",
        phone: "251-345-3566",
      },
      estimatedFundingDate: {
        month: "Jan",
        day: "10",
        message:
          "You should fund within a day completing any outstanding tasks promptly will increase your ability to sign on this date",
      },
    },
    documentData: [
      {
        name: "Property Documents",
        items: [
          {
            title: "Title Deed",
            status: "Accepted",
            date: "October 8, 2024, 11:15 AM",
          },
          {
            title: "Property Tax Statement",
            status: "Being Reviewed",
            date: "October 20, 2024, 03:45 PM",
          },
          {
            title: "Home Inspection Report",
            status: "Being Reviewed",
            date: "November 3, 2024, 09:30 AM",
          },
        ],
      },
      {
        name: "Financial Statements",
        items: [
          {
            title: "2023 Tax Return",
            status: "Accepted",
            date: "October 10, 2024, 01:00 PM",
          },
          {
            title: "Bank Statements",
            status: "Accepted",
            date: "October 22, 2024, 04:00 PM",
          },
        ],
      },
    ],
    terms: [
      {
        loanOptions: [
          {
            loanToValue: 52,
            totalLoan: 150000,
            rate: 6.8,
            monthlyPayment: 968.66,
            term: 240,
            status:0
          },
          {
            loanToValue: 58,
            totalLoan: 165000,
            rate: 7.0,
            monthlyPayment: 1076.25,
            term: 90,

status:1        },
          {
            loanToValue: 61,
            totalLoan: 180000,
            rate: 7.15,
            monthlyPayment: 1265.89,
            term: 45,

status:0          },
          {
            loanToValue: 66,
            totalLoan: 190000,
            rate: 7.25,
            monthlyPayment: 1345.34,
            term: 365,
            status:1
          },
          {
            loanToValue: 70,
            totalLoan: 200000,
            rate: 7.35,
            monthlyPayment: 1390.45,
            term: 180,
            status:0
          },
        ],
        loanDetails: [
            { icon: CiDollar,  label: "Loan Amount", value: "$250,000.00" },
            { label: "Initial Loan Amount", value: "$250,000.00" },
            { label: "As-is-value", value: "$310,000.00" },
            { label: "Loan-to-value", value: "81%" },
            { label: "DSCR", value: "1.28" },
            { icon: SlCalender,  label: "Monthly Principal and Interest", value: "$1800.00" },
            { icon: AiOutlinePercentage,  label: "Interest rate", value: "7.000%" },
            { icon: TbCash,  label: "Cash Required at Closing", value: "$8,000.00" },
            { label: "Origination fee", value: "$4500.00 (2.5%)" },
            { label: "Service fee", value: "$2200.00" },
            { label: "Pro Rated Interest", value: "$700.00" },
            { label: "Third party", value: "Contact Loan Processor" },
          ],
        monthlyPaymentAndInterest: 1410.45,
        interestRate: 7.4,
        cashRequiredAtClosing: {
          originationFee: 4200.0,
          serviceFee: 2100.0,
          proRatedInterest: 700.15,
          thirdPartyFee: "Contact Closing Agent",
        },
        brokerCompensation: [
            { icon: CiDollar , label: "Broker Compensation", value: "$5000.00" },
            { label: "Total comp", value: "$5200.00" },
            { label: "YSP Comp", value: "$700.00" },
            { label: "Broker Point", value: "$4500.00" },
            { label: "Broker Admin Fee", value: "$100.00" },
          ],
          
        documents: [
          {
            name: "Pre Qualification Letter",
            downloadLink: "/path-to-pre-qualification-letter-2",
          },
          {
            name: "Loan Summary",
            downloadLink: "/path-to-loan-summary-2",
          },
          {
            name: "Amortization Schedule",
            downloadLink: "/path-to-amortization-schedule-2",
          },
        ],
        relationshipManager: {
          name: "Michael Smith",
          phone: "555-234-5678",
        },
        additionalDetail:[
            { label: "Borrower Name", value: "7895 Pine Ridge, LLC" },
            { label: "Property Address", value: "7895 Pine Ridge Blvd, Dallas, TX, 75201" },
            { label: "Loan Term", value: "15 Years" },
            { label: "Loan Type", value: "Fixed" },
            { label: "Amortization Period", value: "180 Months" },
            { label: "Pre-Payment", value: "None after year 4; 5% first year; 4% second year; 3% third year" },
            { label: "Preferred Closing Date", value: "06/15/2025" },
            { label: "Purpose", value: "Refinance" },
            { label: "Lien", value: "1st" },
            { label: "Property Type", value: "Multi-Family" },
            { label: "Home Occupancy", value: "Non-Owner Occupied" },
        ]
      },
    ],
  },
  {
    id: "three",
    title: "On Track three: Loan Application",
    address: "45 Maple Lane, Springfield, IL 62704, USA",
    link: "/dashboard/loan/id",
    description: "Application 3 residential",
    details: [
      { label: "Loan Number", value: "454321" },
      { label: "Borrower", value: "Springfield Properties LLC" },
      { label: "Target signing date", value: "03/05/2025" },
      { label: "Contact", value: "Alice Johnson" },
      { label: "Phone", value: "217-555-1212" },
      { label: "Email", value: "alice.johnson@gmail.com" },
    ],
    documentData:[
        {
            name: "Personal Documents",
            items: [
              {
                title: "Passport",
                status: "Accepted",
                date: "October 25, 2024, 11:30 AM",
              },
              {
                title: "Utility Bill",
                status: "Being Reviewed",
                date: "November 2, 2024, 09:00 AM",
              },
            ],
          },
          {
            name: "Tax Documents",
            items: [
              {
                title: "W2 Form",
                status: "Accepted",
                date: "October 18, 2024, 03:15 PM",
              },
            ],
          },
          {
            name: "Credit Documents",
            items: [
              {
                title: "Credit Report",
                status: "Being Reviewed",
                date: "November 8, 2024, 05:00 PM",
              },
            ],
          },
    ],
    actions: [
      {
        label: "Download pre qualification letter",
        link: "/dashboard/loan/id/letter",
        onClick: () => console.log("Downloading letter..."),
      },
      {
        label: "View Terms",
        link: "/dashboard/loan/id/terms",
      },
      {
        label: "Contact my team",
        link: "/dashboard/loan/id/contact",
        onClick: () => console.log("Contacting team..."),
      },
    ],
    loanChecklist: [
      { name: "General Information", status: "Completed", statusColor: 1 },
      { name: "Property Information", status: "Completed", statusColor: 1 },
      { name: "Rehab Information", status: "Completed", statusColor: 1 },
      { name: "Third-Party Information", status: "Completed", statusColor: 1 },
      { name: "Borrower Information", status: "Completed", statusColor: 1 },
      { name: "Guarantor Information", status: "Completed", statusColor: 1 },
      { name: "Agreements", status: "Completed", statusColor: 1 },
      { name: "Draw One", status: "In Progress", statusColor: 2 },
      { name: "Draw Two", status: "In Progress", statusColor: 2 },
      { name: "Draw Three", status: "Completed", statusColor: 1 },
      { name: "Draw Four", status: "In Progress", statusColor: 2 },
      { name: "Draw Five", status: "In Progress", statusColor: 2 },
      { name: "Draw Six", status: "In Progress", statusColor: 2 },
      { name: "Draw Seven", status: "In Progress", statusColor: 2 },
      { name: "Draw Eight", status: "In Progress", statusColor: 2 },
      { name: "Draw Nine", status: "Not Started", statusColor: 3 },
    ],
    signingStatus: {
      estimatedSigningDate: {
        month: "Mar",
        day: "05",
        message:
          "Your Signing is estimated for March 5 contact your attorney or closing agent to schedule your signing appointment",
        contact: "Tresa Pisiak",
        phone: "251-345-3566",
      },
      estimatedFundingDate: {
        month: "Mar",
        day: "05",
        message:
          "You should fund within a day completing any outstanding tasks promptly will increase your ability to sign on this date",
      },
    },  team: {
        teamMember:[
            { name: "Sarah Patel", role: "Loan Officer", email: "sarah.patel@lwa.com" },
            { name: "John Walker", role: "Underwriter", email: "john.walker@lwa.com" },
        ],
        message:[
            {
                sender: "Sarah Patel",
                timestamp: "11/18/2024, 9:05:00 AM",
                content: "We received the preliminary approval from the underwriter.",
              },
              {
                sender: "John Walker",
                timestamp: "11/17/2024, 4:50:00 PM",
                content: "All documentation has been processed. We&apos;re ready for the next steps.",
              },
        ],
        thirdPartyContact:[
            { name: "Teresa Pasiak", role: "Closing", email: "teresa.pasiak@closing.com" },
            { name: "Daniel Schmidt", role: "Appraiser", email: "daniel.schmidt@appraisal.com" },
        ]
    }
    ,
    terms: [
      {
        loanOptions: [
          {
            loanToValue: 54,
            totalLoan: 155000,
            rate: 6.9,
            monthlyPayment: 1005.32,
            term: 15,

status:1          },
          {
            loanToValue: 59,
            totalLoan: 170000,
            rate: 7.05,
            monthlyPayment: 1100.75,
            term: 30,

status:0        },
          {
            loanToValue: 62,
            totalLoan: 185000,
            rate: 7.2,
            monthlyPayment: 1270.87,
            term: 90,

status:1          },
          {
            loanToValue: 67,
            totalLoan: 195000,
            rate: 7.25,
            monthlyPayment: 1345.89,
            term: 180,
            status:1
          },
          {
            loanToValue: 72,
            totalLoan: 200000,
            rate: 7.35,
            monthlyPayment: 1395.45,
            term: 365,
            status:0
          },
        ],
        loanDetails: [
            { icon:CiDollar , label: "Loan Amount", value: "$500,000.00" },
            { label: "Initial Loan Amount", value: "$500,000.00" },
            { label: "As-is-value", value: "$600,000.00" },
            { label: "Loan-to-value", value: "83%" },
            { label: "DSCR", value: "1.5" },
            { icon:SlCalender , label: "Monthly Principal and Interest", value: "$3500.00" },
            { icon:AiOutlinePercentage , label: "Interest rate", value: "5.750%" },
            { icon:TbCash , label: "Cash Required at Closing", value: "$12,000.00" },
            { label: "Origination fee", value: "$8000.00 (1.6%)" },
            { label: "Service fee", value: "$3000.00" },
            { label: "Pro Rated Interest", value: "$900.00" },
            { label: "Third party", value: "Contact Underwriter" },
          ],
        monthlyPaymentAndInterest: 1395.45,
        interestRate: 7.3,
        cashRequiredAtClosing: {
          originationFee: 4100.0,
          serviceFee: 2050.0,
          proRatedInterest: 690.45,
          thirdPartyFee: "Contact Closing Agent",
        },
        brokerCompensation: [{ icon: CiDollar , label: "Broker Compensation", value: "$3500.00" },
            { label: "Total comp", value: "$3800.00" },
            { label: "YSP Comp", value: "$300.00" },
            { label: "Broker Point", value: "$3000.00" },
            { label: "Broker Admin Fee", value: "$0.00" },] 
        ,
        documents: [
          {
            name: "Pre Qualification Letter",
            downloadLink: "/path-to-pre-qualification-letter-3",
          },
          {
            name: "Loan Summary",
            downloadLink: "/path-to-loan-summary-3",
          },
          {
            name: "Amortization Schedule",
            downloadLink: "/path-to-amortization-schedule-3",
          },
        ],
        relationshipManager: {
          name: "Sarah Johnson",
          phone: "555-345-6789",
        },
        additionalDetail:[
            { label: "Borrower Name", value: "2367 Oak Grove, LLC" },
            { label: "Property Address", value: "2367 Oak Grove Rd, Portland, OR, 97201" },
            { label: "Loan Term", value: "20 Years" },
            { label: "Loan Type", value: "Fixed" },
            { label: "Amortization Period", value: "240 Months" },
            { label: "Pre-Payment", value: "None after year 2; 6% first year; 5% second year" },
            { label: "Preferred Closing Date", value: "10/01/2024" },
            { label: "Purpose", value: "Cash-Out Refinance" },
            { label: "Lien", value: "1st" },
            { label: "Property Type", value: "Single Family" },
            { label: "Home Occupancy", value: "Non-Owner Occupied" },
        ]
      },
    ],
  },
  {
    id: "four",
    title: "On Track four: Loan Application",
    address: "89 Pine Street, Seattle, WA 98101, USA",
    link: "/dashboard/loan/id",
    description: "Application 4 commercial",
    details: [
      { label: "Loan Number", value: "678910" },
      { label: "Borrower", value: "Pine Street Investments LLC" },
      { label: "Target signing date", value: "11/30/2024" },
      { label: "Contact", value: "Robert Smith" },
      { label: "Phone", value: "206-987-6543" },
      { label: "Email", value: "robert.smith@gmail.com" },
    ],
    documentData:[
        {
            name: "Legal Documents",
            items: [
              {
                title: "Loan Agreement",
                status: "Accepted",
                date: "October 14, 2024, 02:45 PM",
              },
              {
                title: "Power of Attorney",
                status: "Being Reviewed",
                date: "November 5, 2024, 11:20 AM",
              },
            ],
          },
          {
            name: "Income Verification",
            items: [
              {
                title: "Pay Stub",
                status: "Accepted",
                date: "November 10, 2024, 09:00 AM",
              },
              {
                title: "Tax Returns",
                status: "Being Reviewed",
                date: "November 14, 2024, 03:20 PM",
              },
            ],
          },
          {
            name: "Property Documents",
            items: [
              {
                title: "Deed of Trust",
                status: "Accepted",
                date: "October 20, 2024, 08:30 AM",
              },
              {
                title: "Homeowner&apos;s Insurance",
                status: "Being Reviewed",
                date: "November 3, 2024, 12:45 PM",
              },
            ],
          },
    ],
    actions: [
      {
        label: "Download pre qualification letter",
        link: "/dashboard/loan/id/letter",
        onClick: () => console.log("Downloading letter..."),
      },
      {
        label: "View Terms",
        link: "/dashboard/loan/id/terms",
      },
      {
        label: "Contact my team",
        link: "/dashboard/loan/id/contact",
        onClick: () => console.log("Contacting team..."),
      },
    ],  team: {
        teamMember:[
            { name: "Sarah Patel", role: "Loan Officer", email: "sarah.patel@lwa.com" },
  { name: "John Walker", role: "Underwriter", email: "john.walker@lwa.com" },
  { name: "Lisa Brooks", role: "Operations Manager", email: "lisa.brooks@lwa.com" },
        ],
        message:[
            {
                sender: "John Walker",
                timestamp: "11/17/2024, 4:50:00 PM",
                content: "All documentation has been processed. We&apos;re ready for the next steps.",
              },
              {
                sender: "Emily Rogers",
                timestamp: "11/16/2024, 1:45:00 PM",
                content: "Please reach out to me if you have any questions about the loan process.",
              },
              {
                sender: "Chris Foster",
                timestamp: "11/15/2024, 11:00:00 AM",
                content: "We&apos;ve reviewed the risk analysis and everything seems in order.",
              },
        ],
        thirdPartyContact:[
            { name: "Teresa Pasiak", role: "Closing", email: "teresa.pasiak@closing.com" },
            { name: "Daniel Schmidt", role: "Appraiser", email: "daniel.schmidt@appraisal.com" },
          
        ]
    }
    ,
    loanChecklist: [
      { name: "General Information", status: "Completed", statusColor: 1 },
      { name: "Property Information", status: "Completed", statusColor: 1 },
      { name: "Rehab Information", status: "Completed", statusColor: 1 },
      { name: "Third-Party Information", status: "Completed", statusColor: 1 },
      { name: "Borrower Information", status: "Completed", statusColor: 1 },
      { name: "Guarantor Information", status: "Completed", statusColor: 1 },
      { name: "Agreements", status: "Completed", statusColor: 1 },
      { name: "Draw One", status: "In Progress", statusColor: 2 },
      { name: "Draw Two", status: "In Progress", statusColor: 2 },
      { name: "Draw Three", status: "Completed", statusColor: 1 },
      { name: "Draw Four", status: "In Progress", statusColor: 2 },
      { name: "Draw Five", status: "In Progress", statusColor: 2 },
      { name: "Draw Six", status: "In Progress", statusColor: 2 },
      { name: "Draw Seven", status: "In Progress", statusColor: 2 },
      { name: "Draw Eight", status: "In Progress", statusColor: 2 },
      { name: "Draw Nine", status: "Not Started", statusColor: 3 },
    ],
    signingStatus: {
      estimatedSigningDate: {
        month: "Nov",
        day: "30",
        message:
          "Your Signing is estimated for November 30 contact your attorney or closing agent to schedule your signing appointment",
        contact: "Tresa Pisiak",
        phone: "251-345-3566",
      },
      estimatedFundingDate: {
        month: "Nov",
        day: "30",
        message:
          "You should fund within a day completing any outstanding tasks promptly will increase your ability to sign on this date",
      },
    },
    terms: [
      {
        loanOptions: [
          {
            loanToValue: 56,
            totalLoan: 160000,
            rate: 6.85,
            monthlyPayment: 1025.1,
            term: 240,
            status:0
          },
          {
            loanToValue: 60,
            totalLoan: 175000,
            rate: 7.1,
            monthlyPayment: 1120.45,
            term: 90,

status:0          },
          {
            loanToValue: 64,
            totalLoan: 185000,
            rate: 7.15,
            monthlyPayment: 1265.5,
            term: 15,

status:1         },
          {
            loanToValue: 68,
            totalLoan: 195000,
            rate: 7.25,
            monthlyPayment: 1340.75,
            term: 365,
            status:0
          },
          {
            loanToValue: 70,
            totalLoan: 200000,
            rate: 7.35,
            monthlyPayment: 1395.45,
            term: 180,
            status:1
          },
        ],
        loanDetails: [
      { icon: CiDollar, label: "Loan Amount", value: "$450,000.00" },
      { label: "Initial Loan Amount", value: "$450,000.00" },
      { label: "As-is-value", value: "$550,000.00" },
      { label: "Loan-to-value", value: "82%" },
      { label: "DSCR", value: "1.4" },
      { icon: SlCalender, label: "Monthly Principal and Interest", value: "$2700.00" },
      { icon: AiOutlinePercentage, label: "Interest rate", value: "6.250%" },
      { icon: TbCash, label: "Cash Required at Closing", value: "$9,000.00" },
      { label: "Origination fee", value: "$6500.00 (2%)" },
      { label: "Service fee", value: "$2500.00" },
      { label: "Pro Rated Interest", value: "$800.00" },
      { label: "Third party", value: "Contact Closing Agent" },
    ],
        monthlyPaymentAndInterest: 1395.45,
        interestRate: 7.35,
        cashRequiredAtClosing: {
          originationFee: 4300.0,
          serviceFee: 2000.0,
          proRatedInterest: 720.0,
          thirdPartyFee: "Contact Closing Agent",
        },
        brokerCompensation:[ 
             { icon: CiDollar, label: "Broker Compensation", value: "" },
            { label: "Total comp", value: "$4777.50" },
            { label: "YSP Comp", value: "$577.50" },
            { label: "Broker Point", value: "$4200.00" },
            { label: "Broker Admin Fee", value: "$0.00" },],
        documents: [
          {
            name: "Pre Qualification Letter",
            downloadLink: "/path-to-pre-qualification-letter-4",
          },
          {
            name: "Loan Summary",
            downloadLink: "/path-to-loan-summary-4",
          },
          {
            name: "Amortization Schedule",
            downloadLink: "/path-to-amortization-schedule-4",
          },
        ],
        relationshipManager: {
          name: "David Lee",
          phone: "555-456-7890",
        },
        additionalDetail:[
            { label: "Borrower Name", value: "2367 Oak Grove, LLC" },
            { label: "Property Address", value: "2367 Oak Grove Rd, Portland, OR, 97201" },
            { label: "Loan Term", value: "20 Years" },
            { label: "Loan Type", value: "Fixed" },
            { label: "Amortization Period", value: "240 Months" },
            { label: "Pre-Payment", value: "None after year 2; 6% first year; 5% second year" },
            { label: "Preferred Closing Date", value: "10/01/2024" },
            { label: "Purpose", value: "Cash-Out Refinance" },
            { label: "Lien", value: "1st" },
            { label: "Property Type", value: "Single Family" },
            { label: "Home Occupancy", value: "Non-Owner Occupied" },
        ]
      },
    ],
  },
  {
    id: "Five",
    title: "On Track five: Loan Application",
    address: "11 Broadway, New York, NY 10004, USA",
    link: "/dashboard/loan/id",
    description: "Application 5 mixed-use",
    details: [
      { label: "Loan Number", value: "112233" },
      { label: "Borrower", value: "Broadway Holdings LLC" },
      { label: "Target signing date", value: "02/15/2025" },
      { label: "Contact", value: "Jessica Brown" },
      { label: "Phone", value: "212-555-7890" },
      { label: "Email", value: "jessica.brown@gmail.com" },
    ], 
    documentData:[
        {
            name: "Loan Related Documents",
            items: [
              {
                title: "ACH Consent Form",
                status: "Accepted",
                date: "October 7, 2024, 09:39 AM",
              },
              {
                title: "Appraisal Details",
                status: "Accepted",
                date: "October 15, 2024, 02:08 PM",
              },
              {
                title: "New Document Example",
                status: "Being Reviewed",
                date: "November 1, 2024, 11:00 AM",
              },
            ],
          },
          {
            name: "Additional Borrower Review",
            items: [
              {
                title: "Document 1",
                status: "Accepted",
                date: "November 7, 2024, 10:00 AM",
              },
            ],
          },
          {
            name: "Identification Documents",
            items: [
              {
                title: "Driver&apos;s License",
                status: "Accepted",
                date: "October 12, 2024, 12:00 PM",
              },
              {
                title: "Social Security Card",
                status: "Being Reviewed",
                date: "October 30, 2024, 10:15 AM",
              },
            ],
          },
    ],
    team: {
        teamMember:[
            { name: "Sarah Patel", role: "Loan Officer", email: "sarah.patel@lwa.com" },
            { name: "John Walker", role: "Underwriter", email: "john.walker@lwa.com" },
        ],
        message:[
            {
                sender: "Sarah Patel",
                timestamp: "11/18/2024, 9:05:00 AM",
                content: "We received the preliminary approval from the underwriter.",
              },
              {
                sender: "John Walker",
                timestamp: "11/17/2024, 4:50:00 PM",
                content: "All documentation has been processed. We&apos;re ready for the next steps.",
              },
              {
                sender: "Emily Rogers",
                timestamp: "11/16/2024, 1:45:00 PM",
                content: "Please reach out to me if you have any questions about the loan process.",
              },
        ],
        thirdPartyContact:[
            { name: "Daniel Schmidt", role: "Appraiser", email: "daniel.schmidt@appraisal.com" },
            { name: "Rachel Evans", role: "Surveyor", email: "rachel.evans@survey.com" },
        ]
    }
    ,
    actions: [
      {
        label: "Download pre qualification letter",
        link: "/dashboard/loan/id/letter",
        onClick: () => console.log("Downloading letter..."),
      },
      {
        label: "View Terms",
        link: "/dashboard/loan/id/terms",
      },
      {
        label: "Contact my team",
        link: "/dashboard/loan/id/contact",
        onClick: () => console.log("Contacting team..."),
      },
    ],
    loanChecklist: [
      { name: "General Information", status: "Completed", statusColor: 1 },
      { name: "Property Information", status: "Completed", statusColor: 1 },
      { name: "Rehab Information", status: "Completed", statusColor: 1 },
      { name: "Third-Party Information", status: "Completed", statusColor: 1 },
      { name: "Borrower Information", status: "Completed", statusColor: 1 },
      { name: "Guarantor Information", status: "Completed", statusColor: 1 },
      { name: "Agreements", status: "Completed", statusColor: 1 },
      { name: "Draw One", status: "In Progress", statusColor: 2 },
      { name: "Draw Two", status: "In Progress", statusColor: 2 },
      { name: "Draw Three", status: "Completed", statusColor: 1 },
      { name: "Draw Four", status: "In Progress", statusColor: 2 },
      { name: "Draw Five", status: "In Progress", statusColor: 2 },
      { name: "Draw Six", status: "In Progress", statusColor: 2 },
      { name: "Draw Seven", status: "In Progress", statusColor: 2 },
      { name: "Draw Eight", status: "In Progress", statusColor: 2 },
      { name: "Draw Nine", status: "Not Started", statusColor: 3 },
    ],
    signingStatus: {
      estimatedSigningDate: {
        month: "Feb",
        day: "15",
        message:
          "Your Signing is estimated for February 15 contact your attorney or closing agent to schedule your signing appointment",
        contact: "Tresa Pisiak",
        phone: "251-345-3566",
      },
      estimatedFundingDate: {
        month: "Feb",
        day: "15",
        message:
          "You should fund within a day completing any outstanding tasks promptly will increase your ability to sign on this date",
      },
    },
    terms: [
      {
        loanOptions: [
          {
            loanToValue: 56,
            totalLoan: 160000,
            rate: 6.85,
            monthlyPayment: 1025.1,
            term: 240,
            status:1
          },
          {
            loanToValue: 60,
            totalLoan: 175000,
            rate: 7.1,
            monthlyPayment: 1120.45,
            term: 90,

status:0        },
          {
            loanToValue: 64,
            totalLoan: 185000,
            rate: 7.15,
            monthlyPayment: 1265.5,
            term: 15,

status:0         },
          {
            loanToValue: 68,
            totalLoan: 195000,
            rate: 7.25,
            monthlyPayment: 1340.75,
            term: 365,
            status:0
          },
          {
            loanToValue: 70,
            totalLoan: 200000,
            rate: 7.35,
            monthlyPayment: 1395.45,
            term: 180,
            status:1
          },
        ],
        loanDetails: [
            { icon: CiDollar , label: "Loan Amount", value: "$100,000.00" },
            { label: "Initial Loan Amount", value: "$100,000.00" },
            { label: "As-is-value", value: "$150,000.00" },
            { label: "Loan-to-value", value: "66%" },
            { label: "DSCR", value: "1.05" },
            { icon: SlCalender , label: "Monthly Principal and Interest", value: "$800.00" },
            { icon: AiOutlinePercentage , label: "Interest rate", value: "5.000%" },
            { icon: TbCash , label: "Cash Required at Closing", value: "$3,000.00" },
            { label: "Origination fee", value: "$2000.00 (2%)" },
            { label: "Service fee", value: "$1000.00" },
            { label: "Pro Rated Interest", value: "$400.00" },
            { label: "Third party", value: "Contact Account Manager" },
          ],
        monthlyPaymentAndInterest: 1395.45,
        interestRate: 7.35,
        cashRequiredAtClosing: {
          originationFee: 4300.0,
          serviceFee: 2000.0,
          proRatedInterest: 720.0,
          thirdPartyFee: "Contact Closing Agent",
        },
        brokerCompensation: [  { icon: CiDollar , label: "Broker Compensation", value: "$6000.00" },
            { label: "Total comp", value: "$6200.00" },
            { label: "YSP Comp", value: "$800.00" },
            { label: "Broker Point", value: "$5000.00" },
            { label: "Broker Admin Fee", value: "$200.00" },],
        documents: [
          {
            name: "Pre Qualification Letter",
            downloadLink: "/path-to-pre-qualification-letter-4",
          },
          {
            name: "Loan Summary",
            downloadLink: "/path-to-loan-summary-4",
          },
          {
            name: "Amortization Schedule",
            downloadLink: "/path-to-amortization-schedule-4",
          },
        ],
        relationshipManager: {
          name: "David Lee",
          phone: "555-456-7890",
        },
        additionalDetail:[
            { label: "Borrower Name", value: "1987 Sunset Ave, LLC" },
            { label: "Property Address", value: "1987 Sunset Ave, Phoenix, AZ, 85004" },
            { label: "Loan Term", value: "30 Years" },
            { label: "Loan Type", value: "Fixed" },
            { label: "Amortization Period", value: "360 Months" },
            { label: "Pre-Payment", value: "None after year 6; 2% first year; 1% second year" },
            { label: "Preferred Closing Date", value: "12/30/2024" },
            { label: "Purpose", value: "Purchase" },
            { label: "Lien", value: "1st" },
            { label: "Property Type", value: "Single Family" },
            { label: "Home Occupancy", value: "Owner Occupied" },
        ]
      },
    ],
  },
  {
    id: "six",
    title: "On Track six: Loan Application",
    address: "77 Sunset Blvd, Los Angeles, CA 90028, USA",
    link: "/dashboard/loan/id",
    description: "Application 6 residential",
    details: [
      { label: "Loan Number", value: "445566" },
      { label: "Borrower", value: "Sunset Blvd Residences LLC" },
      { label: "Target signing date", value: "01/20/2025" },
      { label: "Contact", value: "Michael Lee" },
      { label: "Phone", value: "323-555-0123" },
      { label: "Email", value: "michael.lee@gmail.com" },
    ],  team: {
        teamMember:[
            { name: "Sarah Patel", role: "Loan Officer", email: "sarah.patel@lwa.com" },
        ],
        message:[
            {
                sender: "Michael Rico",
                timestamp: "11/20/2024, 2:32:00 PM",
                content: "Please review the updated documentation.",
              },
              {
                sender: "Teresa Pasiak",
                timestamp: "11/19/2024, 10:15:00 AM",
                content: "The closing process is on track for the planned date.",
              },
        ],
        thirdPartyContact:[
            { name: "Daniel Schmidt", role: "Appraiser", email: "daniel.schmidt@appraisal.com" },
            { name: "Rachel Evans", role: "Surveyor", email: "rachel.evans@survey.com" },
          
        ]
    }
    ,
    actions: [
      {
        label: "Download pre qualification letter",
        link: "/dashboard/loan/id/letter",
        onClick: () => console.log("Downloading letter..."),
      },
      {
        label: "View Terms",
        link: "/dashboard/loan/id/terms",
      },
      {
        label: "Contact my team",
        link: "/dashboard/loan/id/contact",
        onClick: () => console.log("Contacting team..."),
      },
    ],
    loanChecklist: [
      { name: "General Information", status: "Completed", statusColor: 1 },
      { name: "Property Information", status: "Completed", statusColor: 1 },
      { name: "Rehab Information", status: "Completed", statusColor: 1 },
      { name: "Third-Party Information", status: "Completed", statusColor: 1 },
      { name: "Borrower Information", status: "Completed", statusColor: 1 },
      { name: "Guarantor Information", status: "Completed", statusColor: 1 },
      { name: "Agreements", status: "Completed", statusColor: 1 },
      { name: "Draw One", status: "In Progress", statusColor: 2 },
      { name: "Draw Two", status: "In Progress", statusColor: 2 },
      { name: "Draw Three", status: "Completed", statusColor: 1 },
      { name: "Draw Four", status: "In Progress", statusColor: 2 },
      { name: "Draw Five", status: "In Progress", statusColor: 2 },
      { name: "Draw Six", status: "In Progress", statusColor: 2 },
      { name: "Draw Seven", status: "In Progress", statusColor: 2 },
      { name: "Draw Eight", status: "In Progress", statusColor: 2 },
      { name: "Draw Nine", status: "Not Started", statusColor: 3 },
    ],
    signingStatus: {
      estimatedSigningDate: {
        month: "Jan",
        day: "20",
        message:
          "Your Signing is estimated for January 20 contact your attorney or closing agent to schedule your signing appointment",
        contact: "Tresa Pisiak",
        phone: "251-345-3566",
      },
      estimatedFundingDate: {
        month: "Jan",
        day: "20",
        message:
          "You should fund within a day completing any outstanding tasks promptly will increase your ability to sign on this date",
      },
    },
    
  },
];
