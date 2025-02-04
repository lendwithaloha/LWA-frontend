"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import TwoOptionRadio from "../components/TwoOptionRadioProps";
import RefinanceForm from "../components/PurchaseOrFinance/Refinance";
import PurchaseForm from "../components/PurchaseOrFinance/Purchase";
import AddressField from "../components/common/AddressField";
import PropertyDetails from "../components/PropertyDetail";
import LoanRequested from "../components/LoanRequested";
import Liquidity from "../components/Liquidity";
import { LiquidityFormData } from "../types/LiquidityFormData";
import ThreeOptionsTabs from "../components/ThreeOptionTabs";


const Bridge: React.FC = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState("");

    const handleAddressSelect = (address: string) => {
        setSelectedAddress(address);
        console.log("Selected Address:", selectedAddress);
    };


    // State to hold form data for both Purchase and Refinance
    const [purchaseFormData, setPurchaseFormData] = useState({
        isUnderContract: "",
        purchasePrice: "",
        closeOfEscrow: "",
    });

    const [refinanceFormData, setRefinanceFormData] = useState({
        sowCompleted: "",
        sowRemaining: "",
        currentLoanBalance: "",
    });

    // Handlers to update form data
    const handlePurchaseChange = (field: string, value: any) => {
        setPurchaseFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleRefinanceChange = (field: string, value: any) => {
        setRefinanceFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
    };

    const handleSubmit = () => {
        console.log("Purchase Form Data:", purchaseFormData);
        console.log("Refinance Form Data:", refinanceFormData);
    };




    const [loanRequestedData, setLoanRequestedData] = useState({
        isMaxLeverage: false,
        specificLoanAmount: "",
        specificLTV: "",
        financeMortgage: "",
        creditScore: "",
        rentalsOwned: "",
        propertiesSold: "",
        lifetimeSales: "",
    });

    const handleLoanRequestedChange = <K extends keyof typeof loanRequestedData>(
        field: K,
        value: typeof loanRequestedData[K]
    ) => {
        setLoanRequestedData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const [liquidityFormData, setLiquidityFormData] = useState<LiquidityFormData>({
        accounts: [{ type: "Cash", amount: "" }],
        upcomingEvents: "no",
        concerns: "",
        document: null,
    });

    const handleLiquidityFormChange = <K extends keyof LiquidityFormData>(
        field: K,
        value: LiquidityFormData[K]
    ) => {
        setLiquidityFormData((prev: LiquidityFormData) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Box >
            <div className="flex gap-5">
                {/* Back Button */}
                <Box display="flex" alignItems="center" mb={3}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.back()}
                        sx={{ textTransform: "none" }}
                    >
                        Back
                    </Button>
                </Box>

                {/* Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        aria-label="Loan Request Tabs"
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab label="Requesting Loan Request" />
                        <Tab label="Schedule of Real Estate" />
                    </Tabs>
                </Box>
            </div>


            {/* Tab Panels */}
            <Box>
                {currentTab === 0 && (
                    <Box>
                        {/* Selected Investment Strategy */}
                        <Box
                            sx={{
                                p: 2,
                                mb: 3,
                                border: "1px solid",
                                borderColor: "grey.300",
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "60%"
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Bridge
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Selected Investment Strategy
                                </Typography>
                            </Box>
                            <Button variant="outlined" size="small">
                                Change
                            </Button>
                        </Box>

                        <div className="w-2/3 flex flex-col gap-5">

                            <ThreeOptionsTabs
                                optionOneLabel="Bridge to Sell"
                                optionTwoLabel="Bridge to Rental"
                                optionThreeLabel="Bridge to Construction"
                                optionOneComponent={<div />}
                                optionTwoComponent={<div />}
                                optionThreeComponent={<div />}
                            />








                            {/* <div>
                                <Typography variant="subtitle1" mb={2}>
                                    Are you purchasing or refinancing the property?
                                </Typography>
                                <TwoOptionRadio
                                    optionOneLabel="Purchase"
                                    optionTwoLabel="Refinance"
                                    optionOneComponent={
                                        <PurchaseForm
                                            formData={purchaseFormData}
                                            onChange={handlePurchaseChange}
                                        />
                                    }
                                    optionTwoComponent={
                                        <RefinanceForm
                                            formData={refinanceFormData}
                                            onChange={handleRefinanceChange}
                                        />
                                    }
                                />

                            </div> */}

                            <Box >
                                <Typography variant="subtitle1" mb={2}>
                                    Property Address
                                </Typography>
                                <AddressField
                                    label="Street Address/city/state/zip"
                                    placeholder="Enter address"
                                    onSelect={handleAddressSelect}
                                />

                            </Box>

                            <div>
                                <LoanRequested formData={loanRequestedData} onChange={handleLoanRequestedChange} />
                            </div>
                            <div>
                                <Liquidity formData={liquidityFormData} onChange={handleLiquidityFormChange} />
                            </div>
                            {/* Submit Button */}
                            <Box mt={4} textAlign="right">
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleSubmit}
                                >
                                    Next
                                </Button>
                            </Box>
                        </div>
                    </Box>
                )}

                {currentTab === 1 && (
                    <Typography variant="h6" textAlign="center">
                        Schedule of Real Estate Placeholder Content
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default Bridge;
