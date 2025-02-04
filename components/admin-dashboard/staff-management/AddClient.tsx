import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import AddClientEmail from './AddClientEmail';

interface AddClientProps {
    open: boolean;
    onClose: () => void;
}

export default function AddClient({ open, onClose }: AddClientProps) {
    return (
        <Modal open={open} onClose={onClose} className='flex justify-center items-center '>
            <Box
                sx={{
                    position: "relative",
                    top: 1,
                    right: 1,
                    borderRadius: "4px",
                    px: 2,

                    border: "none",
                    width: "25%",
                    height: "50%",
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div className="flex justify-between items-center ">
                    <Typography variant="h6" component="h2">
                        Adding Clients
                    </Typography>
                    <Button onClick={onClose} sx={{ color: "black", fontSize: "1.5rem" }}>
                        &times;
                    </Button>
                </div>
                <AddClientEmail />

                <Button
                    variant="contained"
                    color='primary'
                    sx={{ py: 1, mt: 5 }}
                >
                    Done
                </Button>


            </Box>
        </Modal>
    );
}
