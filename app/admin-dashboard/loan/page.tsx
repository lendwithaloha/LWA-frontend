"use client";

import { useState } from "react";
import AdminLoanCard from "@/components/admin-dashboard/loan/admin-loan-card";
import StageSlider from "@/components/admin-dashboard/loan/stage-slider";

const stages = [
  { name: "Inquiry", count: 1, amount: 120000 },
  { name: "Quote Collection", count: 1, amount: 120000 },
  { name: "Quote Out", count: 1, amount: 120000 },
  { name: "LWA Processing", count: 1, amount: 120000 },
  { name: "Lender Processing", count: 1, amount: 120000 },
];

type Loan = {
  id: string;
  amount: number;
  borrower: string;
  eod: string;
  progress: number;
};

const initialLoans: Loan[] = [
  {
    id: "23-45",
    amount: 1021201,
    borrower: "John doe",
    eod: "12/02/2025",
    progress: 35,
  },
  {
    id: "23-46",
    amount: 200452,
    borrower: "Jane Smith",
    eod: "12/02/2025",
    progress: 35,
  },
  {
    id: "23-48",
    amount: 789450,
    borrower: "Richard Hendrick",
    eod: "12/02/2025",
    progress: 35,
  },
];

export default function Page() {
  const [isGridView, setIsGridView] = useState(true);
  const [loans, setLoans] = useState(initialLoans);

  const handleEdit = (id: string) => {
    console.log(`Editing loan with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  return (
    <div className="min-h-screen">
      <header className="border-b ">
        <div className="mx-auto flex justify-between items-center">
          <div className="flex gap-2">
            <button
              className={`p-2 rounded-md transition-colors ${
                !isGridView ? "bg-gray-300" : "hover:bg-gray-100"
              }`}
              onClick={() => setIsGridView(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button
              className={`p-2 rounded-md transition-colors ${
                isGridView ? "bg-gray-300" : "hover:bg-gray-100"
              }`}
              onClick={() => setIsGridView(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
          </div>
          <div>
            <button className="px-4 mb-2 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Filter
            </button>
          </div>
        </div>
      </header>

      <main className=" mx-auto">
        <div className="mb-8">
          <StageSlider stages={stages} />
        </div>

        <div
          className={`${
            isGridView
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }`}
        >
          {loans.map((loan, index) => (
            <AdminLoanCard
              key={loan.id}
              loanId={loan.id}
              amount={loan.amount}
              borrower={loan.borrower}
              eod={loan.eod}
              progress={loan.progress}
              isListView={!isGridView}
              onEdit={() => handleEdit(loan.id)}
              onDelete={() => handleDelete(loan.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
