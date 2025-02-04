import { Upload } from '@mui/icons-material'
import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

export default function AddClientEmail() {
    return (
        <Box sx={{
            p: 2
        }}>

            <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold" }}>
                Enter list of client email addresses
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                Make sure you enter each email address in a separate line.
            </Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="example@gmail.com"
                variant="outlined"
                helperText="If valid email addresses are provided, invitations to the Borrower Portal will be sent to all new clients/borrowers."
            />
            <Button
                variant="outlined"
                sx={{ mt: 2 }}
                startIcon={<Upload />}
                onClick={() => console.log("Import from file")}
            >
                Import from a File
            </Button>
        </Box>
    )
}
