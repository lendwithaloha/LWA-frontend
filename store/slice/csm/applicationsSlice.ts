import { createSlice } from "@reduxjs/toolkit";


const initialApplications = [
  {
    id: 1,
    title: "Prime Capital Loans",
    loanAmount: 200000,
    interestRate: 5,
    address: "123 Main Street",
    loanNumber: "LN-234",
    documentDate: "13, Dec 2024",
    messages: 12,
    label: "Documents Pending",
    status: "active",
    city: "Springfield",
    state: "USA",
    zip: "12345",
    propertyType: "Residential",
    entity: "Prime Holdings LLC",
    percentageOwnership: 100,
    investmentStrategy: "Hold",
    acquisitionDate: "2024-12-01",
    acquisitionPrice: 200000,
    isBudgetCompleted: true,
    budgetReason: "",
    isRented: false,
    rentalIncome: 0,
    isTiedToLoan: true,
    loanBalance: 180000,
    contractPrice: 210000,
    currentMarketValue: 220000,
  },
  {
    id: 2,
    title: "Capital Investments",
    loanAmount: 300000,
    interestRate: 4.5,
    address: "456 Elm Street",
    loanNumber: "LN-567",
    documentDate: "20, Jan 2025",
    status: "closed",
    city: "Metropolis",
    state: "USA",
    zip: "45678",
    propertyType: "Commercial",
    entity: "Capital Ventures Corp",
    percentageOwnership: 50,
    investmentStrategy: "Flip",
    acquisitionDate: "2023-05-15",
    acquisitionPrice: 280000,
    isBudgetCompleted: false,
    budgetReason: "Pending contractor bids",
    isRented: true,
    rentalIncome: 2000,
    isTiedToLoan: true,
    loanBalance: 250000,
    contractPrice: 310000,
    currentMarketValue: 330000,
  },
  {
    id: 3,
    title: "Secure Home Loans",
    loanAmount: 150000,
    interestRate: 6.5,
    address: "789 Oak Avenue",
    loanNumber: "LN-890",
    documentDate: "25, Dec 2024",
    label: "Pending",
    status: "active",
    city: "Smalltown",
    state: "USA",
    zip: "78912",
    propertyType: "Residential",
    entity: "Home Safe Investments",
    percentageOwnership: 100,
    investmentStrategy: "Rent",
    acquisitionDate: "2022-08-10",
    acquisitionPrice: 140000,
    isBudgetCompleted: true,
    budgetReason: "",
    isRented: true,
    rentalIncome: 1200,
    isTiedToLoan: false,
    loanBalance: 0,
    contractPrice: 160000,
    currentMarketValue: 170000,
  },
];


// Slice creation
export const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    list: initialApplications,
  },
  reducers: {
    addApplication: (state, action) => {
      state.list.push(action.payload);
    },
    updateApplication: (state, action) => {
      const index = state.list.findIndex((app) => app.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
  },
});

// Export actions
export const { addApplication,updateApplication } = applicationsSlice.actions;

// Export reducer
export default applicationsSlice.reducer;
