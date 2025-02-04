
"use client"
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useRouter,useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { SearchResultCard } from "./SearchCard";


type SearchResult = {
  id: string;
  location: string;
  amount: number;
  term: string;
  loanPurchase: string;
  date: string;
};
export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("query");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`/api/search?query=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
        })
        .catch((err) => console.error("Error fetching search results:", err))
        .finally(() => setLoading(false));
    } else {
      setResults([]); // Clear results if no query
    }
  }, [query]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => router.push("/dashboard")}
        sx={{
          mb: 2,
          textTransform: "none",
          color: "#000",
          borderColor: "#ccc",
          "&:hover": { borderColor: "#aaa" },
        }}
      >
        ← Back
      </Button>

      {/* Title */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Search Results for: {query}
      </Typography>

      {/* Loading State */}
      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : results.length > 0 ? (
        results.map((item) => (
          <SearchResultCard
            key={item.id}
            location={item.location}
            amount={item.amount}
            term={item.term}
            loanPurpose={item.loanPurchase}
            date={item.date}
          />
        ))
      ) : (
        <Typography sx={{ mt: 2 }}>No results found.</Typography>
      )}
    </Box>
  );
}
