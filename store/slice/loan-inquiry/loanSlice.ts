import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum LoanStatus {
  READY = "Ready",
  COLLECTION = "Collection",
}

export interface LoanInquiry {
  id: number;
  propertyAddress: string;
  loanAmount: string;
  ltv?: string;
  rate?: string;
  points?: string;
  lastUpdated: string;
  processingFee?: string;
  requestedCOE?: string;
  loanPurpose?: string;
  investmentStrategy?: string;
  dateCreated?: string;
  status: LoanStatus;
}

interface LoanState {
  inquiries: LoanInquiry[];
  filteredInquiries: LoanInquiry[];
  selectedInquiry: LoanInquiry | null;
}

let inquiries: LoanInquiry[] = [
  {
    id: 1,
    propertyAddress: "Los Angeles",
    loanAmount: "$30,000",
    ltv: "80%",
    rate: "5.5%",
    points: "2",
    lastUpdated: "Dec 10, 2024",
    processingFee: "$500",
    status: LoanStatus.READY,
  },
  {
    id: 2,
    propertyAddress: "San Francisco",
    loanAmount: "$500,000",
    requestedCOE: "Dec 20, 2024",
    loanPurpose: "Purchase",
    investmentStrategy: "Buy and Hold",
    dateCreated: "Nov 25, 2024",
    lastUpdated: "Dec 12, 2024",
    status: LoanStatus.COLLECTION,
  },
];

const initialState: LoanState = {
  inquiries: inquiries,
  filteredInquiries: inquiries,
  selectedInquiry: null,
};

export const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setInquiries: (state, action: PayloadAction<LoanInquiry[]>) => {
      state.inquiries = action.payload;
      state.filteredInquiries = action.payload;
    },
    selectInquiry: (state, action: PayloadAction<number>) => {
      state.selectedInquiry =
        state.inquiries.find((inquiry) => inquiry.id === action.payload) ||
        null;
    },
    filterInquiries: (
      state,
      action: PayloadAction<{
        propertyAddress?: string;
        loanAmount?: string;
        loanPurpose?: string;
        status?: LoanStatus;
        dateFilter?: "today" | "thisWeek" | "thisMonth";
      }>
    ) => {
      const { propertyAddress, loanAmount, loanPurpose, status, dateFilter } =
        action.payload;

      const today = new Date();
      const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      state.filteredInquiries = state.inquiries.filter((inquiry) => {
        const matchAddress =
          !propertyAddress ||
          inquiry.propertyAddress
            .toLowerCase()
            .includes(propertyAddress.toLowerCase());

        const inquiryLoanAmount = Number(
          inquiry.loanAmount.replace(/[^0-9.]/g, "")
        );
        const filterLoanAmount = loanAmount
          ? Number(loanAmount.replace(/[^0-9.]/g, ""))
          : null;

        const matchAmount =
          !filterLoanAmount || inquiryLoanAmount >= filterLoanAmount;

        const matchPurpose =
          !loanPurpose ||
          (inquiry.loanPurpose &&
            inquiry.loanPurpose
              .toLowerCase()
              .includes(loanPurpose.toLowerCase()));

        const matchStatus = !status || inquiry.status === status;

        const inquiryLastUpdated = new Date(inquiry.lastUpdated);
        const inquiryDateCreated = inquiry.dateCreated
          ? new Date(inquiry.dateCreated)
          : null;

        // Date filtering
        const matchDate =
          !dateFilter ||
          (dateFilter.toLowerCase() === "today" &&
            (inquiryLastUpdated >= startOfToday ||
              (inquiryDateCreated && inquiryDateCreated >= startOfToday))) ||
          (dateFilter.toLowerCase() === "thisweek" &&
            (inquiryLastUpdated >= startOfWeek ||
              (inquiryDateCreated && inquiryDateCreated >= startOfWeek))) ||
          (dateFilter.toLowerCase() === "thismonth" &&
            (inquiryLastUpdated >= startOfMonth ||
              (inquiryDateCreated && inquiryDateCreated >= startOfMonth)));

        return (
          matchAddress &&
          matchAmount &&
          matchPurpose &&
          matchStatus &&
          matchDate
        );
      });
    },
    resetFilters: (state) => {
      state.filteredInquiries = [...state.inquiries];
    },
  },
});

export const { setInquiries, selectInquiry, filterInquiries, resetFilters } =
  loanSlice.actions;
export default loanSlice.reducer;
