"use client"
import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Radio, Link } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const LoanRequestPage: React.FC = () => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<string>("");

    const strategies = [
        {
            id: "fix-and-flip",
            title: "Fix and Flip",
            description: "Buy, renovate, sell for a profit....",
            learnMore: "/fix-and-flip",
        },
        {
            id: "new-construction",
            title: "New Construction",
            description: "Build properties from scratch for sale or to add to your rental portfolio....",
            learnMore: "/new-construction",
        },
        {
            id: "brrrr",
            title: "BRRRR",
            description: "Buy, rehab, rent, refinance, repeat for portfolio growth.....",
            learnMore: "/brrrr",
        },
        {
            id: "dscr-loans",
            title: "DSCR loans",
            description: "Long-term financing for rental portfolio.....",
            learnMore: "/dscr-loans",
        },
        {
            id: "bridge",
            title: "Bridge",
            description: "Bridge loans unlock cash, stabilize rentals, or fund pre-construction gaps.....",
            learnMore: "/bridge",
        },
    ];

    const handleNext = () => {
        if (selectedOption) {
            router.push(`/dashboard/loan/loan-request/${selectedOption}`);
        } else {
            alert("Please select an investment strategy to proceed.");
        }
    };

    return (
        <Box>
            {/* Header */}
            <Box display="flex" alignItems="center" mb={3}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.back()}
                    sx={{ textTransform: "none" }}
                >
                    Back
                </Button>
                <Typography variant="h6" ml={2}>
                    Requesting Loan Request
                </Typography>
            </Box>

            {/* Title */}
            <Typography variant="subtitle1"  mb={3}>
                Select one Investment Strategy to proceed
            </Typography>

            {/* Investment Strategies */}
            <Grid container spacing={2}>
                {strategies.map((strategy) => (
                    <Grid item xs={12} sm={6} key={strategy.id}>
                        <Card
                            variant="outlined"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                px: 2,
                                py: 1,
                                cursor: "pointer",
                                borderColor:
                                    selectedOption === strategy.id ? "primary.main" : "grey.300",
                                boxShadow:
                                    selectedOption === strategy.id ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none",
                                transition: "box-shadow 0.3s ease",
                            }}
                            onClick={() => setSelectedOption(strategy.id)}
                        >
                            {/* Placeholder for Image */}
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    bgcolor: "grey.200",
                                    borderRadius: 2,
                                    flexShrink: 0,
                                    mr: 2,
                                }}
                            ></Box>

                            {/* Text Content */}
                            <CardContent sx={{ flex: 1, p: 0 }}>
                                <Typography variant="subtitle1" >
                                    {strategy.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {strategy.description}
                                </Typography>
                                <Link href={strategy.learnMore} underline="hover" fontSize="small">
                                    Learn More
                                </Link>
                            </CardContent>

                            {/* Radio Button */}
                            <Radio
                                checked={selectedOption === strategy.id}
                                value={strategy.id}
                                onChange={() => setSelectedOption(strategy.id)}
                                color="primary"
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Next Button */}
            <Box mt={4} textAlign="right">
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleNext}
                    disabled={!selectedOption}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default LoanRequestPage;
