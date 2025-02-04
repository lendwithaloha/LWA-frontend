import { Box, Typography, Button, Grid } from "@mui/material";

type SearchResultCardProps = {
  location: string;
  amount: number;
  term: string;
  loanPurpose: string;
  date: string;
};

export function SearchResultCard({
  location,
  amount,
  term,
  loanPurpose,
  date,
}: SearchResultCardProps) {
  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        border: "1px solid #ddd",
        borderRadius: "8px",
        // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {location}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Property Address
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            ${amount.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Loan Amount
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {term}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Loan Term
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {loanPurpose}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Loan Purpose
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {date}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Date Created
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#e0e0e0",
              color: "#000",
              "&:hover": { backgroundColor: "#d6d6d6" },
            }}
          >
            Quote Collection
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
