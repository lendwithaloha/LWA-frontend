import { NextResponse } from "next/server";

// Mock Data
const properties = [
  { id: 1, location: "Los Angeles", amount: "$200,000", term: "20 years", loanPurchase:"purchase",date: "Dec 10, 2024" },
  { id: 2, location: "San Francisco", amount: "$300,000", term: "15 years",loanPurchase:"purchase", date: "Nov 20, 2024" },
  { id: 3, location: "Los Angeles Downtown", amount: "$250,000", term: "30 years",loanPurchase:"purchase", date: "Jan 5, 2025" },
];

// API Route: Handle GET Requests for Search
export async function GET(req: Request) {
  console.log("API route triggered");

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.toLowerCase();
  console.log("Search query:", query);

  properties.forEach((property) => {
    console.log("Property:", property.location.toLowerCase());
  });

  if (!query || query.length === 0) {
    return NextResponse.json({ error: "Query parameter is required and cannot be empty" }, { status: 400 });
  }

  const results = properties.filter((property) =>
    property.location.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    return NextResponse.json([], { status: 200 });
  }

  return NextResponse.json(results, { status: 200 });
}

