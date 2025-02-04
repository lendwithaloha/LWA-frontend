export type LoanDetailsType = {
  filter(arg0: (loan: any) => boolean): unknown;
  id: number;
  title: string;
  loanAmount: number;
  interestRate: number;
  address: string;
  loanNumber: string;
  documentDate: string; // Consider using Date type if you will parse this date
  messages: number;
  label: string;
  status: "active" | "inactive" | "completed"; // Use union types for known status values
};
