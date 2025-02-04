import React, { useState } from "react";
import { Modal, Box, Typography, Button, Grid, Tabs, Tab } from "@mui/material";
import { Slide } from '@mui/material';

import { Upload } from '@mui/icons-material';
import AddClientEmail from "./AddClientEmail";
import StaffDetailForm from "./StaffDetailForm";

interface AddStaffMemberProps {
    open: boolean;
    onClose: () => void;
}

export const AddStaffMember: React.FC<AddStaffMemberProps> = ({ open, onClose }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Modal open={open} onClose={onClose} closeAfterTransition>
            <Slide direction="left" in={open} mountOnEnter unmountOnExit>

                <Box
                    sx={{
                        position: "fixed",
                        top: 1,
                        right: 1,
                        border: "none",
                        width: "35%",
                        height: "100vh",
                        bgcolor: "background.paper",
                        display: "flex",
                        px:2,
                        pb:4,
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <Box >
                        <div className="flex justify-between items-center ">
                            <Typography variant="h6" component="h2">
                                Adding Staff Member
                            </Typography>
                            <Button onClick={onClose} sx={{ color: "black", fontSize: "1.5rem" }}>
                                &times;
                            </Button>
                        </div>

                        <Tabs value={value} onChange={handleChange} className="px-4">
                            <Tab label="Personal Detail" />
                            <Tab label="Add Clients" />
                        </Tabs>

                        {value === 0 && (
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "40px",
                                px:2

                            }}>
                                <StaffDetailForm />
                                <Grid item xs={12} sx={{ my: 4 }}>
                                    <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors gap-2 cursor-pointer">
                                        <Upload className="h-4 w-4" />
                                        Upload File
                                        <input type="file" className="hidden" />
                                    </label>
                                </Grid>

                            </Box>
                        )}

                        {value === 1 && (
                            <AddClientEmail />
                        )}

                    </Box>


                    <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                        <Button variant="outlined" onClick={onClose}>Cancel</Button>
                        <Button variant="contained" onClick={() => { console.log("Save") }}>Done</Button>
                    </Box>
                </Box>
            </Slide>
        </Modal>

    );
};

export default AddStaffMember;
