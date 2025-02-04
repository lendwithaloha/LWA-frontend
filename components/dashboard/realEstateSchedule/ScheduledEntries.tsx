import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
} from "@mui/material";
import { ScheduleTable } from "./RealEstateTable";
import { RealEstateSuccess } from "./RealEstateSuccess";
import { PiCheckCircleLight } from "react-icons/pi";

interface ScheduledEntitiesModalProps {
    open: boolean;
    onClose: () => void;
}

export const ScheduledEntities: React.FC<ScheduledEntitiesModalProps> = ({ open, onClose }) => {
    const [openMessage, setOpenMessage] = useState(false)
    const handleCloseMessageDialog = () => setOpenMessage(false)
    const handleOpenMessageDialog = () => setOpenMessage(true)

    const scheduleRows = [
        {
            id: 1,
            propertyAddress: "123 Main St, NY",
            city: "New York", // New field
            state: "NY", // New field
            zipCode: "10001", // New field
            propertyType: "Condo", // New field
            vesting: "Joint Tenancy",
            percentageOwned: "50%",
            investmentStrategy: "Buy & Hold", // New field
            acquisitionDate: "2020-05-01",
            purchasePrice: "$500,000",
            acquisitionPrice: "$500,000", // Same as purchasePrice
            currentAsIsValue: "$550,000",
            budgetCompleted: "Yes", // New field
            currentMarketValue: "$600,000", // New field
            loanBalance: "$200,000", // New field
            marketRents: "$2,500/month",
            rentalIncome: "$2,500/month", // Same as marketRents
            status: "Active", // New field
            contractPrice: "$600,000", // New field
            coe: "2020-06-01", // New field
        },
        {
            id: 2,
            propertyAddress: "456 Elm St, CA",
            city: "Los Angeles", // New field
            state: "CA", // New field
            zipCode: "90001", // New field
            propertyType: "Single Family", // New field
            vesting: "Tenancy in Common",
            percentageOwned: "30%",
            investmentStrategy: "Fix & Flip", // New field
            acquisitionDate: "2019-08-15",
            purchasePrice: "$750,000",
            acquisitionPrice: "$750,000", // Same as purchasePrice
            currentAsIsValue: "$800,000",
            budgetCompleted: "No", // New field
            currentMarketValue: "$850,000", // New field
            loanBalance: "$300,000", // New field
            marketRents: "$3,000/month",
            rentalIncome: "$3,000/month", // Same as marketRents
            status: "Closed", // New field
            contractPrice: "$850,000", // New field
            coe: "2019-09-15", // New field
        }
    ];


    const handleMessageButton = () => {
        handleOpenMessageDialog();
        setTimeout(() => {
            onClose();

        }, 50000)

    }




    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "60%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: "80%", md: "75vw" },
                    height: 800,
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                    textAlign: "center",
                    overflow:"auto"
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
                    <Box sx={{ display: "flex", width: "40%", justifyContent: "space-between", alignItems: "center" }}>
                        <PiCheckCircleLight className="text-primaryColor size-20 " />
                        <Typography variant="body1" sx={{
                            display: { xs: "none", sm: "none", md: "block" }, // Responsive visibility
                        }}
                        >
                            Your schedule of real estate has been successfully imported. All entries are now saved and available for review.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: { md: "30%" }, // Corrected syntax for width
                        }}
                    >
                        <button className="bg-primaryColor text-white w-36 md:w-[80%] h-10 rounded-sm"
                            onClick={handleMessageButton}
                        >
                            Confirm
                        </button>
                        <Button onClick={onClose} sx={{ color: "black", fontSize: "20px" }}>
                            &times;
                        </Button>
                    </Box>
                </Box>



                <Box >
                    <ScheduleTable scheduleRows={scheduleRows} />
                </Box>




                <RealEstateSuccess open={openMessage} onClose={handleCloseMessageDialog} />




            </Box>
        </Modal >
    );
};
