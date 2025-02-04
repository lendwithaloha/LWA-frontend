import React from "react";
import { Modal, Box, Typography, Button, Grid } from "@mui/material";
import { ScheduleRow } from "./RealEstateTable";

interface ViewScheduleModalProps {
    open: boolean;
    onClose: () => void;
    row?: ScheduleRow
}

const ViewScheduleModal: React.FC<ViewScheduleModalProps> = ({ open, onClose, row }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: "80%", md: "50vw" },
                    height: { xs: "auto", md: "100vh" },
                    maxHeight: "90vh", 
                    bgcolor: "white",
                    boxShadow: 24,
                    p: { xs: 2, sm: 3 }, // Smaller padding on mobile
                    borderRadius: 2,
                    overflowY: "auto", 
                }}
            >

                {/* Header */}
                <Box
                    sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "white",
                        zIndex: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        pb: 1,
                        mb: 2,
                    }}
                >
                    <Typography variant="h6">Real Estate Detail</Typography>

                    <Button onClick={onClose} sx={{ color: "black", fontSize: "1.5rem" }}>
                        &times;
                    </Button>
                </Box>
                <Box width={{ xs: "100%", md: "100%" }} sx={{ p: 5 }}>
                    <Box >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="subtitle1">Property Information</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} container justifyContent="space-between">
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.propertyAddress ?? "Property Address"}</Typography>
                                    <Typography color="textSecondary">Address</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.city ?? "City"}</Typography>
                                    <Typography color="textSecondary">City</Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} container justifyContent="space-between">
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.state ?? 'State'}</Typography>
                                    <Typography color="textSecondary">State</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.zipCode ?? "Zip Code"}</Typography>
                                    <Typography color="textSecondary">Zip Code</Typography>
                                </Grid>

                            </Grid>
                            <Grid item xs={12} container justifyContent="space-between">
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.propertyType ?? 'Property Type'}</Typography>
                                    <Typography color="textSecondary">Property Type</Typography>
                                </Grid>


                            </Grid>
                        </Grid>
                        <div className="w-full h-0.5 bg-gray-200 my-10" />

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="subtitle1">Ownership & Strategy</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} container justifyContent="space-between">
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.vesting}</Typography>
                                    <Typography color="textSecondary">Entity/Vesting</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.percentageOwned ?? '% of Ownership'}</Typography>
                                    <Typography color="textSecondary">% of Ownership</Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} container justifyContent="space-between">
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.investmentStrategy ?? 'Investemtn Strategy'}</Typography>
                                    <Typography color="textSecondary">Investment Strategy</Typography>
                                </Grid>

                            </Grid>
                        </Grid>


                        <div className="w-full h-0.5 bg-gray-200 my-10" />
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="subtitle1">Acquisition Information</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} container justifyContent="space-between">
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.acquisitionDate ?? 'Acquisition Date'}</Typography>
                                    <Typography color="textSecondary">Acquisition Date</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.acquisitionPrice ?? 'Acquisition Price'}</Typography>
                                    <Typography color="textSecondary">Acquisition Price</Typography>
                                </Grid>
                            </Grid>


                        </Grid>

                        <div className="w-full h-0.5 bg-gray-200 my-10" />
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="subtitle1">Financial Status</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} container justifyContent="space-between">
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.budgetCompleted ?? 'Budget Completed'}</Typography>
                                    <Typography color="textSecondary">Budget Completed</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.currentMarketValue ?? 'Current Market Value'}</Typography>
                                    <Typography color="textSecondary">Current Market Value</Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} container justifyContent="space-between">
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.loanBalance ?? 'Loan Balance'}</Typography>
                                    <Typography color="textSecondary">Loan Balance</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.rentalIncome ?? 'Rental Income'}</Typography>
                                    <Typography color="textSecondary">Rental Income</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <div className="w-full h-0.5 bg-gray-200 my-10" />
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="subtitle1">Transaction Status</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} container justifyContent="space-between">
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.status ?? 'Status'}</Typography>
                                    <Typography color="textSecondary">Status</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.contractPrice ?? 'Contaract Price'}</Typography>
                                    <Typography color="textSecondary">Contract Price</Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} container justifyContent="space-between">
                                <Grid item>
                                    <Typography fontWeight="bold">{row?.coe ?? 'COE'}</Typography>
                                    <Typography color="textSecondary">COE (Close of Escrow)</Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ViewScheduleModal;
