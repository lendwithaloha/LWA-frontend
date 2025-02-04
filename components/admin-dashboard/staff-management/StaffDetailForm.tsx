import { Grid, TextField, MenuItem, Typography } from '@mui/material';
import React from 'react';

export default function StaffDetailForm() {
    const roles = ["Senior Account Executive", "Loan Processor"];

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                    First Name
                </Typography>
                <TextField fullWidth label="First Name" placeholder="Enter here" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                    Last Name
                </Typography>
                <TextField fullWidth label="Last Name" placeholder="Enter here" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                    Phone Number
                </Typography>
                <TextField fullWidth label="Phone Number" placeholder="Enter here" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                    Email
                </Typography>
                <TextField fullWidth label="Email" placeholder="Enter here" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                    Role
                </Typography>
                <TextField
                    select
                    fullWidth
                    label="Role"
                    variant="outlined"
                    defaultValue=""

                    SelectProps={{
                        displayEmpty: false,
                        renderValue: (value) => (value && typeof value === "string" ? value : "Choose"),
                    }}
                    sx={{
                        backgroundColor: "white",
                    }}
                >
                    {roles.map((role, index) => (
                        <MenuItem key={index} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
    );
}
