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
import NewConstPurchase from "../components/PurchaseOrFinance/NewConstPurchase";
import NewConstructRefinanceForm from "../components/PurchaseOrFinance/NewConstRefinance";
import NewConstructPropertyTypes from "../components/NewConstructPropertyType";
import RadioSelect from "../components/common/RadioSelect";
import TextAreaField from "../components/common/TextAreaField";


const NewConstructionTab: React.FC = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedProperty, setSelectedProperty] = useState("");


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

    const propertyOptions = [
        { label: "Single-Family Home", value: "single_family" },
        { label: "Condo", value: "condo" },
        { label: "Townhouse", value: "townhouse" },
        { label: "Apartment", value: "apartment", tooltip: "Multi-unit rental property" },
    ];

    const handleDataChange = (
        field: string,
        value: string,
    ) => {
        setPropertyData((prev) =>
            prev.map((row) =>
                row.label === field
                    ? {
                        ...row,
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
                                    New Construction
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
                                        <NewConstPurchase

                                            formData={purchaseFormData}
                                            onChange={handlePurchaseChange}
                                        />
                                    }
                                    optionTwoComponent={
                                        <NewConstructRefinanceForm

                                            formData={refinanceFormData}
                                            onChange={handleRefinanceChange}
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
                            <div >
                                <NewConstructPropertyTypes data={propertyData} onChange={handleDataChange} />


                            </div>
                            <RadioSelect
                                question="What type of property is this?"
                                options={propertyOptions}
                                value={selectedProperty}
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSelectedProperty(e.target.value)}
                            />;


                            <div>
                                <Typography variant="subtitle1" mb={2}>
                                    Do you have permits/issued?
                                </Typography>
                                <TwoOptionRadio
                                    optionOneLabel="Yes"
                                    optionTwoLabel="No"
                                    optionOneComponent={
                                        <TextAreaField
                                            label="What kind of permit do you have"
                                            value=""
                                            onChange={() => console.log("Permis")}


                                        />
                                    }
                                    optionTwoComponent={
                                        <TextAreaField
                                            label="How long will it take to get the permits issues(months)"
                                            height="10px"
                                            value=""
                                            onChange={() => console.log("Permis")}


                                        />
                                    }
                                />

                            </div>

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

export default NewConstructionTab;
