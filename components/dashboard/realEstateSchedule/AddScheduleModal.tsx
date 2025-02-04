import React from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
} from "@mui/material";

interface AddScheduleModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddScheduleModal: React.FC<AddScheduleModalProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 700,
                    height: 700,
                    bgcolor: "white",
                    boxShadow: 24,
                    pb: 4,
                    px:4,
                    borderRadius: 2,
                    overflowY: "auto",
                    scrollBehavior: "smooth",
                    /* Hide scrollbar */
                    "&::-webkit-scrollbar": {
                        display: "none", // For Chrome, Safari, and Edge
                    },
                    msOverflowStyle: "none", // For IE and Edge
                    scrollbarWidth: "none", // For Firefox

                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        position: "sticky",  // Makes the header sticky
                        top: 0,              // Sticks to the top
                        backgroundColor: "white", // Ensures background color to cover content
                        zIndex: 10,          // Keeps it above the scrolling content
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #ddd", // Optional: Adds a subtle bottom border
                        pb: 1, // Padding bottom for spacing
                        mb: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        Add Schedule of Real Estate
                    </Typography>
                    <Button onClick={onClose} sx={{ color: "black", fontSize: "1.5rem" }}>
                        &times;
                    </Button>
                </Box>


                {/* Form Fields */}
                <Typography variant="body1" fontWeight="bold" mb={1}>
                    Property Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Street Address" placeholder="Enter here" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="City" placeholder="Enter here" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="State" placeholder="Enter here" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Zip" placeholder="Enter here" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Property Type" placeholder="Choose" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Entity/Vesting" placeholder="Enter here" />
                    </Grid>
                </Grid>

                <Typography variant="body1" fontWeight="bold" mt={3} mb={1}>
                    Ownership and Strategy
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Percentage of Ownership" placeholder="Enter here" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Investment Strategy" placeholder="Enter here" />
                    </Grid>
                </Grid>

                <Typography variant="body1" fontWeight="bold" mt={3} mb={1}>
                    Acquisition Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Acquisition Date" placeholder="Enter here" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Acquisition Price" placeholder="Enter here" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Contract Price" placeholder="Enter here" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="COE (Close of Escrow)" placeholder="Enter here" />
                    </Grid>
                </Grid>

                <Typography variant="body1" fontWeight="bold" mt={3} mb={1}>
                    Financial Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6} className="flex justify-between items-center w-full">
                        <Typography>Budget Completed</Typography>
                        <RadioGroup row defaultValue="no">
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Enter here" placeholder="Enter here" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Current Market Value" placeholder="Enter here" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Loan Balance" placeholder="Enter here" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Rental Income" placeholder="Enter here" />
                    </Grid>
                </Grid>

                {/* Submit Button */}
                <Box mt={3} textAlign="end">
                    <Button variant="contained" className="bg-primaryColor text-white">
                        Done
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
