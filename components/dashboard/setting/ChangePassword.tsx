import React, { useState } from "react";
import { Dialog, DialogContent, Button, TextField, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PasswordChangeDialogProps {
    open: boolean;
    onClose: () => void;
    onPasswordChange: (newPassword: string) => void;
}

const PasswordChangeDialog: React.FC<PasswordChangeDialogProps> = ({ open, onClose, onPasswordChange }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        onPasswordChange(newPassword);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">

            <Box sx={{ position: "relative", width: "450px", padding: "20px" }}> <Box >
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 8, right: 8, color: "grey.500" }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2" textAlign="start" sx={{ margin:"20px" }}>
                    Changing Password
                </Typography>
            </Box>



                <DialogContent >
                    <Box display="flex" flexDirection="column" gap={3} >
                        <TextField
                            label="Current Password"
                            variant="outlined"
                            fullWidth
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />

                        <div className="min-h-0.5 bg-[#CDCED8] my-6" />

                        <TextField
                            label="New Password"
                            variant="outlined"
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className=""
                        />
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Box>
                </DialogContent>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "8px", padding: "16px" }}>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handlePasswordChange}
                        sx={{ backgroundColor: "black", color: "white", padding: "8px 16px", textTransform: "none", fontWeight: "bold" }}
                    >
                        Change Password
                    </Button>
                </Box></Box>

        </Dialog>
    );
};

export default PasswordChangeDialog;
