import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import StaffDetailForm from './StaffDetailForm';

interface UpdatingStaffDetailProps {
    open: boolean,
    onClose: () => void
}

export default function UpdatingStaffDetail({ open, onClose }: UpdatingStaffDetailProps) {

    return (
        <Modal open={open} onClose={onClose} closeAfterTransition className='flex justify-center items-center'>

            <Box
                sx={{
                    position: "relative",
                    top: 1,
                    right: 1,
                    borderRadius: "4px",

                    border: "none",
                    width: "35%",
                    height: "55%",
                    bgcolor: "background.paper",
                    px: 2,
                    gap: 2,
                    display: "flex",
                    flexDirection: "column",
                }}
            >

                <div className="flex justify-between items-center">
                    <Typography variant="h6" component="h2">
                        Updating                            </Typography>
                    <Button onClick={onClose} sx={{ color: "black", fontSize: "1.5rem" }}>
                        &times;
                    </Button>
                </div>


                <StaffDetailForm />
                <Box sx={{ display: 'flex', gap: 2, mt: 5 }}>
                    <Button
                        variant="outlined"
                        sx={{ py: 1, width: '50%' }} 
                        color='error'
                    >
                        Discard
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ py: 1, width: '50%' }} // Set width to 50%
                    >
                        Done
                    </Button>
                </Box>


            </Box>
        </Modal>
    )
}
