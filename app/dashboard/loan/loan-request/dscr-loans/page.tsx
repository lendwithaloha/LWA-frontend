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
import DSCRFinance from "../components/PurchaseOrFinance/DSCRFinance";
import TextAreaField from "../components/common/TextAreaField";
import LeaseForm from "../components/LeaseProperty";
import AmountInput from "../components/common/AmountInput";


const DSCRTabs: React.FC = () => {
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

    const [propertyData, setPropertyData] = useState([
        { label: "Property Type", currentValue: "Type 1" },
        { label: "Total Bedrooms", currentValue: 1 },
        { label: "Total Bathrooms", currentValue: 4 },
        { label: "Total Living Area (SF)", currentValue: 1 },
        { label: "Total Number of Units", currentValue: 2 },
        {
            label: "Total Number of ADUs",
            currentValue: 4,
            tooltip: "Accessory Dwelling Units",
        },
    ]);




    const handleDataChange = (
        field: string,
        value: string,
        type: "current" | "afterCompletion"
    ) => {
        setPropertyData((prev) =>
            prev.map((row) =>
                row.label === field
                    ? {
                        ...row,
                        [type === "current" ? "currentValue" : "afterCompletion"]: value,
                    }
                    : row
            )
        );
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


    const [monthlyEstimated, setMonthlyEstimated] = useState("");
    const [currentMarketRent, setCurrentMarketRent] = useState("");



    // Handler for text change
    const handleMonthlyEstimated = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMonthlyEstimated(event.target.value);
    };


    const handleCurrentMarketRent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMarketRent(event.target.value);
    };



    const [leaseAmount, setLeaseAmount] = useState("");
    const [leaseStartDate, setLeaseStartDate] = useState("");
    const [subsidized, setSubsidized] = useState("");
    const [taxBillingType, setTaxBillingType] = useState("monthly");
    const [taxAmount, setTaxAmount] = useState("");

    const [insuranceBillingType, setInsuranceBillingType] = useState("monthly");
    const [insuranceAmount, setInsuranceAmount] = useState("");

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
                                    DSCR Loans
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
                            <div>
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
                                        <DSCRFinance
                                            formData={refinanceFormData}
                                            onChange={handleRefinanceChange}
                                        />
                                    }
                                />

                            </div>







                            <div>
                                <Typography variant="subtitle1" mb={2}>
                                    Is the property a long term rental or short term rental ?
                                </Typography>
                                <TwoOptionRadio
                                    optionOneLabel="Long Term Rental"
                                    optionTwoLabel="Short Term Rental"
                                    optionOneComponent={
                                        <div
                                        />
                                    }
                                    optionTwoComponent={


                                        <TextAreaField
                                            label="What is the monthly estimated or annual rent?"
                                            placeholder="Type here..."
                                            height="50px"
                                            value={monthlyEstimated}
                                            onChange={handleMonthlyEstimated}
                                        />
                                    }
                                />

                            </div>






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
                                <Typography variant="subtitle1" mb={2}>
                                    Is the property currently occupied?
                                </Typography>
                                <TwoOptionRadio
                                    optionOneLabel="Leased"
                                    optionTwoLabel="Vacant"
                                    optionOneComponent={
                                        <LeaseForm
                                            leaseAmount={leaseAmount}
                                            leaseStartDate={leaseStartDate}
                                            subsidized={subsidized}
                                            onLeaseAmountChange={(e) => setLeaseAmount(e.target.value)}
                                            onLeaseStartDateChange={(e) => setLeaseStartDate(e.target.value)}
                                            onSubsidizedChange={(e) => setSubsidized(e.target.value)}
                                        />
                                    }
                                    optionTwoComponent={


                                        <TextAreaField
                                            label="What is the current market rent for the property?"
                                            placeholder="Type here..."
                                            height="50px"
                                            value={currentMarketRent}
                                            onChange={handleCurrentMarketRent}
                                        />
                                    }
                                />

                            </div>

                            {/* Tax Amount Input */}
                            <AmountInput
                                label="Tax Amount"
                                description="Enter the total monthly/annual property tax amount for the property."
                                billingType={taxBillingType}
                                amount={taxAmount}
                                onBillingChange={(_event, newBillingType) => newBillingType && setTaxBillingType(newBillingType)}
                                onAmountChange={(e) => setTaxAmount(e.target.value)}
                            />

                            {/* Insurance Amount Input */}
                            <AmountInput
                                label="Insurance Amount"
                                description="Enter the total monthly/annual insurance premium amount for the property."
                                billingType={insuranceBillingType}
                                amount={insuranceAmount}
                                onBillingChange={(_event, newBillingType) => newBillingType && setInsuranceBillingType(newBillingType)}
                                onAmountChange={(e) => setInsuranceAmount(e.target.value)}
                            />












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

export default DSCRTabs;
