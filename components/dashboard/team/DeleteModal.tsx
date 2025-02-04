import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography
} from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onConfirm }) => {

    const handleSubmit = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '90%', sm: 320, md: "65%" }, // Responsive width
                    height: 'auto',
                    position: "absolute",
                    top: "45%",
                    left: {
                        xs: "30%",
                        sm: "40%",
                        md: "50%"
                    },
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 2,
                },
            }}
        >
            <div className="w-full flex justify-between items-center">
                <DialogTitle className="text-lg sm:text-xl font-bold">Confirm Deletion</DialogTitle>
                <Button
                    onClick={onClose}
                    aria-label="Close modal"
                    sx={{ minWidth: 36 }} // Reduce the minimum width for the icon button
                >
                    <CancelOutlinedIcon />
                </Button>
            </div>

            <DialogContent>
                <Typography
                    variant="body1"
                    sx={{ textAlign: "start", marginBottom: 2 }}
                >
                    This action is permanent. Are you sure you want to proceed?
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button
                    className="w-1/6 py-2 text-homeSecondary  rounded-md"
                    onClick={handleSubmit}
                >
                    Cancel
                </Button>

                <Button
                    className="w-1/6 py-2 text-white bg-primaryColor rounded-md"
                    onClick={onConfirm}

                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;
