import React, { useState } from "react";
import { Modal, Box, Typography, Button, Grid, Avatar, Divider, IconButton } from "@mui/material";
import { Slide } from "@mui/material";
import { Add, EditTwoTone, Close } from "@mui/icons-material";
import StaffClient from "./StaffClient";
import AddClient from "./AddClient";
import UpdatingStaffDetail from "./UpdatingStaffProfile";

interface StaffDetailProps {
    open: boolean;
    onClose: () => void;
}

export const StaffDetail: React.FC<StaffDetailProps> = ({ open, onClose }) => {
    const [openAddClient, setAddClient] = useState(false);
    const [editMyAccount, setEditMyAccount] = useState(false);

    const handleOpenAddClient = () => setAddClient(true);
    const handleCloseAddClient = () => setAddClient(false);
    const handleOpenEditAccount = () => setEditMyAccount(true);
    const handleCloseEditAccount = () => setEditMyAccount(false);

    return (
        <Modal open={open} onClose={onClose} closeAfterTransition>
            <Slide direction="left" in={open} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        width: { xs: "100%", sm: "40%" },
                        height: "100vh",
                        bgcolor: "background.paper",
                      
                        display: "flex",
                        flexDirection: "column",
                        p: 3,
                    }}
                >
                    {/* Header */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" fontWeight="semi-bold">
                            Staff Detail
                        </Typography>
                        <IconButton onClick={onClose}>
                            <Close />
                        </IconButton>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Main Content */}
                    <Box display="flex" alignItems="flex-start" gap={3}>
                        {/* Avatar */}
                        <Avatar
                            src="path_to_avatar"
                            sx={{ width: 120, height: 120 }}
                        />
                        {/* Details */}
                        <Box flex={1} display="flex" flexDirection="column" gap={2}>
                            {/* Name and Role */}
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">
                                        Full Name
                                    </Typography>
                                    <Typography>John Doe</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary" align="right">
                                        Role
                                    </Typography>
                                    <Typography  align="right">
                                        Developer
                                    </Typography>
                                </Grid>
                            </Grid>

                            {/* Phone Number */}
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="textSecondary">
                                        Phone Number
                                    </Typography>
                                    <Typography >+123 456 7890</Typography>
                                </Grid>
                            </Grid>

                            {/* Email and Edit Button */}
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={9}>
                                    <Typography variant="body2" color="textSecondary">
                                        Email
                                    </Typography>
                                    <Typography >johndoe@example.com</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        startIcon={<EditTwoTone />}
                                        onClick={handleOpenEditAccount}
                                        fullWidth
                                    >
                                        Edit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Clients Section */}
                    <Box>
                        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    John Doe's Clients
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add />}
                                    onClick={handleOpenAddClient}
                                >
                                    Add Client
                                </Button>
                            </Grid>
                        </Grid>
                        <StaffClient />
                    </Box>

                    {/* Modals */}
                    <AddClient open={openAddClient} onClose={handleCloseAddClient} />
                    <UpdatingStaffDetail open={editMyAccount} onClose={handleCloseEditAccount} />
                </Box>
            </Slide>
        </Modal>
    );
};

export default StaffDetail;
